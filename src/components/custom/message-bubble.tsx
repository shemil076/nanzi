import { Message } from '../../types/message';

export default function MessageBubble({
  messages,
}: {
  //   message: { role: string; content: string };
  messages: Message[];
}) {
  //   const isUser = message.role === 'user';

  return (
    <div
      className={`flex 
    justify-start
    `}
    >
      <div
        className={`max-w-xs p-3 rounded-xl ${
          //   isUser ? 'bg-blue-500 text-white' :
          'bg-gray-200 text-black'
        }`}
      >
        {messages.map((msg) => msg.content)}
      </div>
    </div>
  );
}

// ${isUser ? 'justify-end' : 'justify-start'}
