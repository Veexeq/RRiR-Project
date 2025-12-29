import { InlineMath } from "react-katex";
import CodeBlock from "../ui/CodeBlock";
import gaussEliminationSC from './../../algo/GaussElimination?raw';
import styles from './showcasepage.module.css';
import { useState } from "react";

const LANGUAGE = 'typescript';

function GaussElimination() {

  const [codeVisible, setCodeVisible] = useState(false);

  const toggle = () => {
    setCodeVisible(prev => !prev);
  };

  return (
    <>
      <br />
      <h2>Algorytm eliminacji Gaussa</h2>
      <br />
      <p>
        Prosty algorytm rozwiązywania równania macierzowego <InlineMath math="
        \mathbf{A} \mathbf{x} = \mathbf{b}"/>.
      </p>
      <br />
      <p>Implementacja: <b>TypeScript</b></p>
      <p>Złożoność obliczeniowa: <InlineMath math="O(n^3)"/></p>
      <p>Złożoność pamięciowa: <InlineMath math="O(n^2)"/></p>
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
          code={gaussEliminationSC}
          language={LANGUAGE}
        />
        )
      }
    </>
  );
}

export default GaussElimination;
