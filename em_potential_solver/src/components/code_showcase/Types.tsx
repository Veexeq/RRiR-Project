import { useState } from "react";
import CodeBlock from "../ui/CodeBlock";
import styles from './showcasepage.module.css';
import typesSC from './../../algo/types?raw';

const LANGUAGE = 'typescript';

function Types() {

  const [codeVisible, setCodeVisible] = useState(false);
  
    const toggle = () => {
      setCodeVisible(prev => !prev);
    };

    return (
      <>
        <br />
        <h2>Dodatek: typy</h2>
        <br />
        <p>
          W powyższych algorytmach użyte zostały niestandardowe, manualnie 
          zdefiniowane typy (np. Matrix), których celem jest poprawa czytelności kodu. 
          W poniższym pliku znajduje się ich definicja.
        </p>
        <br />
        <button 
          className={styles.button}
          type='button'
          onClick={toggle}
        >{codeVisible ? 'Ukryj kod' : 'Pokaż kod'}
        </button>
        <br />
        {
          codeVisible && (
          <CodeBlock 
            code={typesSC}
            language={LANGUAGE}
          />
          )
        }
      </>
    );
}

export default Types;
