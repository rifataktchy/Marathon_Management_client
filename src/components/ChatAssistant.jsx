import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

export default function ChatAssistant({ userEmail }) {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! I am from Merathon Management System team. How can i assist you?' }]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('https://merathon-server.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages([...newMessages, { sender: 'bot', text: data.error || 'AI unavailable' }]);
      } else {
        setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, AI is unavailable due to network/server error.' }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:scale-110 transition-transform"
        >
          <FontAwesomeIcon icon={faComments} className="text-red-500 text-2xl" />
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white shadow-lg rounded-2xl flex flex-col border transition-all duration-300">
          {/* Header */}
          <div className="bg-orange-800 text-white rounded-t-2xl px-3 py-2 flex justify-between items-center">
            <span className="font-bold">Marathon Assistant</span>
            <button className="font-bold" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 max-h-96">

            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-orange-800/50 text-white'
                      : 'bg-gray-400 text-white text-sm'
                  }`}
                >
                  {/* Markdown rendering for AI messages */}
                  {msg.sender === 'bot' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </span>
              </div>
            ))}
            {isSending && <div className="text-left text-gray-500 text-sm">Merathon team is typing...</div>}
          </div>

          {/* Input Section */}
          <div className="flex gap-2 p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Ask me about marathons..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isSending}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-800 text-white rounded px-3 disabled:opacity-50"
              disabled={isSending}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
