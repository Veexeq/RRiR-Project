import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from './codeblock.module.css';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string,
  language?: string
};

// Default option, if language is not specified
function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter
        language={language}
        style={ghcolors}
        showLineNumbers={true}
        customStyle={{ margin: 0, padding: '20px' }}
      > 
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
