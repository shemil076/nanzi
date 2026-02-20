export default function MessageBubble({
  message,
}: {
  message: { role: string; content: string };
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
