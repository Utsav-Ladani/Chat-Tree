import { memo } from 'react';
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'


function Chat({ message }) {
    return (
        <Markdown
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                        <SyntaxHighlighter
                            className="code--syntax-highlighted"
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            showLineNumbers
                            {...props}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="code--no-syntax-highlighted" {...props}>
                            {children}
                        </code>
                    );
                }
            }}
        >
            {message}
        </Markdown>
    );
}

export default memo(Chat);