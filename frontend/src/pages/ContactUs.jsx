import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { validateEmail, validatePhone } from '../utils/validation';
import { User, Mail, Phone, MessageSquare, Paperclip, Send, Tag, AlertCircle } from 'lucide-react';
import '../styles/ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    queryType: '',
    subject: '',
    message: ''
  });
  const [attachment, setAttachment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DUMMY_DOMAINS = ['test.com', 'example.com', 'abc.com', 'dummy.com', 'fake.com'];

  const validateForm = () => {
    // Full Name: Only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.fullName)) {
      toast.error('Full Name should contain only letters and spaces.');
      return false;
    }

    // Email validation: proper format, not a dummy domain
    const emailVal = validateEmail(formData.email);
    if (!emailVal.isValid) {
      toast.error(emailVal.message);
      return false;
    }

    const domain = formData.email.split('@')[1];
    if (DUMMY_DOMAINS.includes(domain.toLowerCase())) {
      toast.error(
        <div className="flex items-start gap-2">
          <AlertCircle size={20} color="#dc2626" style={{flexShrink:0, marginTop:'2px'}}/>
          <div>
            <strong>Dummy Email Detected!</strong>
            <p style={{fontSize:'0.85rem', marginTop:'4px'}}>Please use a real email address so we can reach you.</p>
          </div>
        </div>,
        { duration: 5000 }
      );
      return false;
    }

    const phoneVal = validatePhone(formData.phoneNumber);
    if (!phoneVal.isValid) {
      toast.error(
        <div className="flex items-start gap-2">
          <AlertCircle size={20} color="#dc2626" style={{flexShrink:0, marginTop:'2px'}}/>
          <div>
            <strong>Invalid Phone Number!</strong>
            <p style={{fontSize:'0.85rem', marginTop:'4px'}}>{phoneVal.message}</p>
          </div>
        </div>,
        { duration: 5000 }
      );
      return false;
    }

    if (!formData.queryType) {
      toast.error('Please select a Query Type.');
      return false;
    }

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error('Subject and Message are required.');
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('queryType', formData.queryType);
    data.append('subject', formData.subject);
    data.append('message', formData.message);
    if (attachment) {
      data.append('attachment', attachment);
    }

    try {
      await axios.post('http://localhost:5001/api/contact/submit', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Your query has been submitted successfully! We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        queryType: '',
        subject: '',
        message: ''
      });
      setAttachment(null);
      // Reset file input
      document.getElementById('attachment').value = '';
    } catch (error) {
      toast.error('Failed to submit query. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page container animate-fade-in">
      <div className="contact-header">
        <h1>Contact Admin</h1>
        <p>Have a question or need support? Fill out the form below and our team will assist you.</p>
      </div>

      <div className="contact-container">
        <form className="contact-form card" onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group-premium">
              <label htmlFor="fullName">Full Name <span className="required-asterisk">*</span></label>
              <div className="input-premium-wrapper">
                <User size={18} />
                <input 
                  id="fullName"
                  name="fullName"
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.fullName}
                  onChange={(e) => {
                    const val = e.target.value;
                    const filtered = val.replace(/[^a-zA-Z\s]/g, '');
                    if (val !== filtered) {
                      toast.error('Full Name can only contain letters and spaces');
                    }
                    setFormData({...formData, fullName: filtered});
                  }}
                  required 
                />
              </div>
            </div>

            <div className="form-group-premium">
              <label htmlFor="email">Email Address <span className="required-asterisk">*</span></label>
              <div className="input-premium-wrapper">
                <Mail size={18} />
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  placeholder="john@company.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group-premium">
              <label htmlFor="phoneNumber">Phone Number <span className="required-asterisk">*</span></label>
              <div className="input-premium-wrapper">
                <Phone size={18} />
                <input 
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel" 
                  placeholder="9876543210" 
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    const val = e.target.value;
                    const filtered = val.replace(/[^\d\s\-+]/g, '');
                    if (val !== filtered) {
                      toast.error('Phone number can only contain digits, spaces, +, and -');
                    }
                    setFormData({...formData, phoneNumber: filtered});
                  }}
                  maxLength="15"
                  required 
                />
              </div>
            </div>

            <div className="form-group-premium">
              <label htmlFor="queryType">Query Type <span className="required-asterisk">*</span></label>
              <div className="input-premium-wrapper">
                <Tag size={18} />
                <select 
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  required
                  className="select-premium"
                >
                  <option value="" disabled>Select a query type...</option>
                  <option value="Course Feedback">Course Feedback</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing Issue">Billing Issue</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group-premium">
            <label htmlFor="subject">Subject <span className="required-asterisk">*</span></label>
            <div className="input-premium-wrapper">
              <MessageSquare size={18} />
              <input 
                id="subject"
                name="subject"
                type="text" 
                placeholder="Brief summary of your query" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="form-group-premium">
            <label htmlFor="message">Message/Description <span className="required-asterisk">*</span></label>
            <div className="textarea-premium-wrapper">
              <textarea 
                id="message"
                name="message"
                rows="5"
                placeholder="Please describe your query in detail..." 
                value={formData.message}
                onChange={handleChange}
                required 
              ></textarea>
            </div>
          </div>

          <div className="form-group-premium file-upload-group">
            <label htmlFor="attachment">Add Attachment <span className="optional-text">(Optional)</span></label>
            <div className="file-upload-wrapper">
              <input 
                id="attachment"
                name="attachment"
                type="file" 
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
                className="file-input-hidden"
              />
              <label htmlFor="attachment" className="file-upload-btn">
                <Paperclip size={18} /> {attachment ? attachment.name : 'Upload File or Screenshot'}
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary submit-btn w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : <><Send size={18} /> Submit Query</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
