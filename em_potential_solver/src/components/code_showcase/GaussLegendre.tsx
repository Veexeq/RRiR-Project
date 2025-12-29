import { useState } from "react";
import { InlineMath } from "react-katex";
import CodeBlock from "../ui/CodeBlock";
import styles from './showcasepage.module.css';
import gaussLegendreSC from './../../algo/FemIntegration?raw';

const LANGUAGE = 'typescript';

function GaussLegendre() {
  
  const [codeVisible, setCodeVisible] = useState(false);
  
    const toggle = () => {
      setCodeVisible(prev => !prev);
    };

    return (
      <>
        <br />
        <h2>Całkowanie numeryczne</h2>
        <h3>kwadraturami Gaussa-Legendre'a</h3>
        <br />
        <p>
          Algorytm realizujący całkowanie numeryczne kwadraturami Gaussa-Legendre'a
          dla <InlineMath math="N=2"/>.
        </p>
        <br />
        <p>Implementacja: <b>TypeScript</b></p>
        <p>Złożoność obliczeniowa: <InlineMath math="???"/></p>
        <p>Złożoność pamięciowa: <InlineMath math="???"/></p>
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
            code={gaussLegendreSC}
            language={LANGUAGE}
          />
          )
        }
      </>
    );
}

export default GaussLegendre;
