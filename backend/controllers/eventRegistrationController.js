import EventRegistration from "../models/EventRegistration.js";
import Event from "../models/Event.js";
import Certificate from "../models/Certificate.js";

const getTodayDate = () => {
  return new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const generateCertificateNumber = () => {
  return `UPTO-EVENT-CERT-${Date.now()}`;
};

export const getEventRegistrations = async (req, res) => {
  try {
    const registrations = await EventRegistration.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

export const createEventRegistration = async (req, res) => {
  try {
    const { eventId, studentName, email, phone } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (Number(event.registeredCount) >= Number(event.maxSeats)) {
      return res.status(400).json({
        success: false,
        message: "Event seats are full",
      });
    }

    const alreadyRegistered = await EventRegistration.findOne({
      eventId,
      email,
    });

    if (alreadyRegistered) {
      return res.status(400).json({
        success: false,
        message: "This email is already registered for this event",
      });
    }

    const registration = await EventRegistration.create({
      eventId,
      eventTitle: event.title,
      studentName,
      email,
      phone,
      attendance: "Pending",
      certificateEligible: false,
      certificateNumber: "",
      status: "Registered",
    });

    event.registeredCount = Number(event.registeredCount || 0) + 1;
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event registration successful",
      data: registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to register for event",
      error: error.message,
    });
  }
};

export const updateEventRegistration = async (req, res) => {
  try {
    const existingRegistration = await EventRegistration.findById(req.params.id);

    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    const payload = { ...req.body };

    if (payload.attendance === "Present") {
      payload.certificateEligible = true;

      let certificateNumber =
        existingRegistration.certificateNumber || payload.certificateNumber;

      if (!certificateNumber) {
        certificateNumber = generateCertificateNumber();
      }

      payload.certificateNumber = certificateNumber;

      const existingCertificate = await Certificate.findOne({
        certificateNumber,
      });

      if (!existingCertificate) {
        await Certificate.create({
          certificateNumber,
          studentName: existingRegistration.studentName,
          email: existingRegistration.email,
          certificateType: "Event",
          title: existingRegistration.eventTitle,
          issuedDate: getTodayDate(),
          validTill: "Lifetime",
          status: "Valid",
          score: "Participation",
          description:
            "This certificate is awarded for successfully attending and completing the event organized by UptoSkills.",
        });
      } else {
        await Certificate.findByIdAndUpdate(
          existingCertificate._id,
          {
            status: "Valid",
            studentName: existingRegistration.studentName,
            email: existingRegistration.email,
            certificateType: "Event",
            title: existingRegistration.eventTitle,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    }

    if (payload.attendance === "Absent") {
      payload.certificateEligible = false;

      if (existingRegistration.certificateNumber) {
        await Certificate.findOneAndUpdate(
          {
            certificateNumber: existingRegistration.certificateNumber,
          },
          {
            status: "Revoked",
          },
          {
            new: true,
          }
        );
      }

      payload.certificateNumber = existingRegistration.certificateNumber || "";
    }

    if (payload.attendance === "Pending") {
      payload.certificateEligible = false;
    }

    const registration = await EventRegistration.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Registration updated successfully",
      data: registration,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update registration",
      error: error.message,
    });
  }
};

export const deleteEventRegistration = async (req, res) => {
  try {
    const registration = await EventRegistration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    if (registration.certificateNumber) {
      await Certificate.findOneAndUpdate(
        {
          certificateNumber: registration.certificateNumber,
        },
        {
          status: "Revoked",
        },
        {
          new: true,
        }
      );
    }

    const event = await Event.findById(registration.eventId);

    if (event && event.registeredCount > 0) {
      event.registeredCount = Number(event.registeredCount) - 1;
      await event.save();
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete registration",
      error: error.message,
    });
  }
};