import ReactMarkdown from 'react-markdown';
import { Message, MessageRole, MessageType } from '../../types/message';
import remarkGfm from 'remark-gfm';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === MessageRole.USER;

  if (message.metadata == undefined) {
    return <Spinner />;
  }

  console.log(message.id);
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

        {message.type == MessageType.CHIP_RESPONSE &&
          'chips' in message.metadata.payload && (
            <div className="flex flex-row gap-5">
              {message.metadata.payload.chips.map((item, index) => (
                <Button key={index}>{item}</Button>
              ))}
            </div>
            // <ReactMarkdown remarkPlugins={[remarkGfm]}>

            // </ReactMarkdown>
          )}
      </div>
    </div>
  );
}
