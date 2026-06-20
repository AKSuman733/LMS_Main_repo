import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send, Bot, Sparkles, BookOpen, UserPlus, Award, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import '../../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: "Hello! I'm your Uptoskills Assistant. I specialize in helping you navigate our learning platform. How can I assist you today?" }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { text: "About courses", icon: <BookOpen size={14} /> },
    { text: "How to register?", icon: <UserPlus size={14} /> },
    { text: "Get a certificate", icon: <Award size={14} /> },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, showSuggestions]);

  const handleSend = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    setShowSuggestions(false); // Hide suggestions after first message
    setInput('');
    
    // Add user message to UI
    const updatedMessages = [
      ...messages,
      { role: 'user', parts: [{ text: messageText }] }
    ];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send history to backend for context-aware "real" AI
      const res = await axios.post('http://localhost:5001/api/chat', {
        message: messageText,
        history: updatedMessages.slice(1).slice(-10) // last 10 messages
      });

      setMessages([
        ...updatedMessages,
        { role: 'model', parts: [{ text: res.data.reply }] }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      toast.error('Failed to get a response.');
      
      setMessages([
        ...updatedMessages,
        { role: 'model', parts: [{ text: "Sorry, I'm offline right now. Please check your internet connection or backend setup." }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="chatbot-overlay">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-fab"
        title="Chat with Uptoskills"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : 'closed'}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-icon">
            <Bot size={24} color="white" />
          </div>
          <div className="chatbot-header-info">
            <div className="chatbot-header-title-wrapper">
              <h3 className="chatbot-header-title">Uptoskills Assistant</h3>
              <Sparkles size={16} className="text-white/80" />
            </div>
            <div className="chatbot-status">
              <div className="chatbot-status-dot"></div>
              <p className="chatbot-status-text">Optimized for your learning</p>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="chatbot-body custom-scrollbar">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            
            return (
              <div key={index} className={`chatbot-message-row ${isUser ? 'user' : 'bot'}`}>
                <div className="chatbot-message-container">
                  
                  {/* Bot Avatar Icon (Only for bot) */}
                  {!isUser && (
                    <div className="chatbot-bot-avatar">
                      <Bot size={18} />
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`chatbot-bubble ${isUser ? 'user' : 'bot'}`}>
                    {isUser ? (
                      msg.parts[0].text
                    ) : (
                      <div className="prose prose-sm max-w-none chatbot-markdown-wrapper" style={{ color: 'inherit' }}>
                        <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isLoading && (
            <div className="chatbot-message-row bot">
              <div className="chatbot-message-container">
                <div className="chatbot-bot-avatar">
                  <Bot size={18} />
                </div>
                <div className="chatbot-bubble bot" style={{ display: 'flex', alignItems: 'center', minHeight: '42px' }}>
                  <div className="chatbot-loading-dots">
                    <div className="chatbot-loading-dot"></div>
                    <div className="chatbot-loading-dot"></div>
                    <div className="chatbot-loading-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Area: Suggestions + Input */}
        <div className="chatbot-footer">
          
          {/* Horizontal Suggestion Chips */}
          {showSuggestions && !isLoading && (
            <div className="chatbot-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(suggestion.text)}
                  className="chatbot-suggestion-btn"
                >
                  <span className="chatbot-suggestion-icon">{suggestion.icon}</span>
                  {suggestion.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={onSubmit} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, support..."
              className="chatbot-input"
              disabled={isLoading}
            />
            <div className="chatbot-help-icon">
              <HelpCircle size={18} />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="chatbot-send-btn"
            >
              <Send size={18} className="transform translate-x-[-1px] translate-y-[1px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
