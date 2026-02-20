'use client';

import { useState } from 'react';

export default function ChatInput({
  handleSend,
  isStreaming,
  disconnect,
}: {
  handleSend: (input: string) => void;
  isStreaming: boolean;
  disconnect: () => void;
}) {
  const [input, setInput] = useState('');

  const onSendClick = () => {
    if (!input.trim()) return;
    handleSend(input);
    setInput('');
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 border rounded p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSendClick();
        }}
        placeholder="Type a message..."
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={isStreaming ? disconnect : onSendClick}
      >
        {isStreaming ? 'Stop' : 'Send'}
      </button>
    </div>
  );
}
