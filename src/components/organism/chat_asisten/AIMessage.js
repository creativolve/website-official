import { MessageFormatter } from './MessageFormatter';
import { motion } from 'framer-motion';

const AIMessage = ({ content, timestamp }) => {
  if (!content) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <span className="text-xs ml-2">Sedang mengetik...</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-gray-200 max-w-full"
    >
      <div className="prose prose-invert prose-sm lg:prose-base max-w-none">
        {MessageFormatter.renderMessageContent(content)}
      </div>
      
      {/* Custom styling for AI message content */}
      <style jsx>{`
        .prose :where(code):not(:where([class~="not-prose"] *)) {
          background-color: rgba(55, 65, 81, 0.8);
          color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        
        .prose :where(pre):not(:where([class~="not-prose"] *)) {
          background-color: rgba(17, 24, 39, 0.9);
          color: #f3f4f6;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .prose :where(a):not(:where([class~="not-prose"] *)) {
          color: #60a5fa;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .prose :where(a):hover:not(:where([class~="not-prose"] *)) {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .prose :where(strong):not(:where([class~="not-prose"] *)) {
          color: #ffffff;
          font-weight: 600;
        }
        
        .prose :where(h1, h2, h3, h4, h5, h6):not(:where([class~="not-prose"] *)) {
          color: #ffffff;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose :where(ul, ol):not(:where([class~="not-prose"] *)) {
          padding-left: 1.5rem;
        }
        
        .prose :where(li):not(:where([class~="not-prose"] *)) {
          margin: 0.25rem 0;
        }
        
        .prose :where(blockquote):not(:where([class~="not-prose"] *)) {
          border-left: 4px solid rgba(96, 165, 250, 0.5);
          background-color: rgba(55, 65, 81, 0.3);
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 0.25rem;
        }
        
        .prose :where(hr):not(:where([class~="not-prose"] *)) {
          border-color: rgba(255, 255, 255, 0.2);
          margin: 2rem 0;
        }
        
        .prose :where(table):not(:where([class~="not-prose"] *)) {
          border-collapse: collapse;
          width: 100%;
          margin: 1rem 0;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem;
          overflow: hidden;
        }
        
        .prose :where(th, td):not(:where([class~="not-prose"] *)) {
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          text-align: left;
        }
        
        .prose :where(th):not(:where([class~="not-prose"] *)) {
          background-color: rgba(55, 65, 81, 0.5);
          font-weight: 600;
          color: #ffffff;
        }
        
        .prose :where(td):not(:where([class~="not-prose"] *)) {
          background-color: rgba(55, 65, 81, 0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default AIMessage;