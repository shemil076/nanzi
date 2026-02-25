import ReactMarkdown from 'react-markdown';
import { Message, MessageRole, MessageType } from '../../types/message';
import remarkGfm from 'remark-gfm';
import { Spinner } from '../ui/spinner';

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === MessageRole.USER;

  if (message.metadata == undefined) {
    return <Spinner />;
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs p-3 rounded-xl ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {message.type == MessageType.TEXT &&
          'content' in message.metadata.payload && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.metadata.payload.content}
            </ReactMarkdown>
          )}
      </div>
    </div>
  );
}
