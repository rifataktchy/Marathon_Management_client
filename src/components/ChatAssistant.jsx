import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

export default function ChatAssistant({ userEmail }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Chat initially closed

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('https://your-backend-url.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, userEmail }),
      });
      const data = await res.json();
      setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: 'bot', text: 'Sorry, AI is unavailable.' }]);
    }
  };

  return (
    <>
      {/* Chat Icon Button - fixed to viewport corner */}
      {!isOpen && (
        <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-white w-14 h-14 rounded-full flex justify-center items-center shadow-lg hover:scale-110 transition-transform"
      >
        <FontAwesomeIcon icon={faComments} className="text-red-500 text-2xl" />
      </button>
      )}

      {/* Chat Window - also fixed */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 bg-white shadow-lg rounded-2xl flex flex-col border transition-all duration-300">
          {/* Header */}
          <div className="bg-orange-800 text-white rounded-t-2xl px-3 py-2 flex justify-between items-center cursor-pointer">
            
            <button className="font-bold" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 max-h-96">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-orange-800 text-white'
                      : 'bg-black text-white'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-2 py-1"
              placeholder="Ask me about marathons..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-800 text-white rounded px-3"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
