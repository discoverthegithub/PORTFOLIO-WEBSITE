import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import tayyabKnowledge from '../../knowledge-base/tayyab-knowledge.json';

// Initialize the Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Parse the knowledge base into a system instruction string
const knowledgeString = JSON.stringify(tayyabKnowledge, null, 2);
const systemInstruction = `You are an AI assistant representing Muhammad Tayyab on his personal portfolio website. Your job is to answer questions about him based STRICTLY on the JSON database below.

Rules:
1. ONLY use information from the JSON database. Do NOT invent, assume, or fabricate any detail.
2. If someone asks anything that is NOT in the JSON data, respond EXACTLY with: "I don't have knowledge about this."
3. Be professional, concise, and friendly. Use third person ("Tayyab" / "He") when talking about him.
4. For greetings, respond warmly and invite them to ask about Tayyab's skills, projects, or experience.
5. Keep responses well-formatted but concise (2-4 sentences unless a detailed answer is needed).

JSON Knowledge Base:
${knowledgeString}`;

let model = null;
if (genAI) {
    model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemInstruction,
    });
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: "Hey there! 👋 I'm Tayyab's AI assistant. Ask me anything about his skills, projects, experience, or anything else!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState(null);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Initialize chat session
    useEffect(() => {
        if (model) {
            try {
                const chat = model.startChat({ history: [] });
                setChatSession(chat);
            } catch (e) {
                console.error('Failed to start chat session:', e);
            }
        }
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !chatSession || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const result = await chatSession.sendMessage(userMessage);
            const botResponse = result.response.text();
            setMessages((prev) => [...prev, { role: 'model', content: botResponse }]);
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages((prev) => [
                ...prev,
                { role: 'model', content: "Oops! I'm having trouble connecting right now. Please try again in a moment." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="chatbot-fab"
                        aria-label="Open chat"
                    >
                        <FiMessageSquare size={24} />
                        <span className="chatbot-fab-pulse"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="chatbot-window"
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <div className="chatbot-avatar">
                                    <span>🤖</span>
                                    <div className="chatbot-status-dot"></div>
                                </div>
                                <div>
                                    <h3 className="chatbot-header-title">Tayyab's AI</h3>
                                    <p className="chatbot-header-subtitle">Online • Ask me anything</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="chatbot-close-btn" aria-label="Close chat">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`chatbot-msg ${msg.role === 'user' ? 'chatbot-msg-user' : 'chatbot-msg-bot'}`}>
                                    <div className={`chatbot-bubble ${msg.role === 'user' ? 'chatbot-bubble-user' : 'chatbot-bubble-bot'}`}>
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chatbot-msg chatbot-msg-bot">
                                    <div className="chatbot-bubble chatbot-bubble-bot">
                                        <div className="chatbot-typing">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                            <div className="chatbot-input-wrapper">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={apiKey ? 'Type a message...' : 'API key missing...'}
                                    disabled={isLoading || !apiKey}
                                    className="chatbot-input"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim() || !apiKey}
                                    className="chatbot-send-btn"
                                    aria-label="Send message"
                                >
                                    <FiSend size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
