exports.chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const lowerMsg = message.toLowerCase();
    let reply = "";

    // Rule-based keyword matching
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      reply = "Hello there! 👋 I am the Uptoskills Chatbot. How can I help you today?";
    } else if (lowerMsg.includes('course') || lowerMsg.includes('learn') || lowerMsg.includes('study')) {
      reply = "We offer a wide variety of expert-led courses! You can check out our **Courses** page to browse topics like Web Development, Data Science, and more. Once registered, you can track your progress in the **My Learning** dashboard.";
    } else if (lowerMsg.includes('register') || lowerMsg.includes('sign up') || lowerMsg.includes('join')) {
      reply = "Joining Uptoskills is easy! Just click the **Register** button at the top right of the screen. After filling out your details, an Admin will approve your account and send an OTP to your email so you can log in.";
    } else if (lowerMsg.includes('password') || lowerMsg.includes('forgot') || lowerMsg.includes('login')) {
      reply = "Having trouble logging in? You can use the **Forgot Password** link on the login page. We'll send an OTP to your registered email to help you securely reset your password.";
    } else if (lowerMsg.includes('certificate') || lowerMsg.includes('complete')) {
      reply = "Yes! 🎓 Upon successfully completing a course, you will be awarded an official Uptoskills Certificate. You can view, download, and share your certificates directly from the **Certificates** section in your dashboard.";
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('help') || lowerMsg.includes('support')) {
      reply = "If you need human assistance, please visit our **Contact Us** page to submit a support query. Our admins will review your request and reply to you as soon as possible!";
    } else {
      reply = "I'm a simple bot right now, so I only know about certain topics! Try asking me about **courses**, **registration**, **certificates**, or **support**.";
    }

    // Simulate typing delay for realism
    setTimeout(() => {
      res.status(200).json({ reply });
    }, 1000);

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Failed to process chat message" });
  }
};
