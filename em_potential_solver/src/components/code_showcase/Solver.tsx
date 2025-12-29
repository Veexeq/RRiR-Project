import { useState } from "react";
import { InlineMath } from "react-katex";
import CodeBlock from "../ui/CodeBlock";
import styles from './showcasepage.module.css';
import solverSC from './../../algo/Solver?raw';
import { Link } from "react-router-dom";

const LANGUAGE = 'typescript';

function Solver() {
  
  const [codeVisible, setCodeVisible] = useState(false);
  
    const toggle = () => {
      setCodeVisible(prev => !prev);
    };

    return (
      <>
        <br />
        <h2>Główny solver</h2>
        <br />
        <p>Główny algorytm, który korzysta z klas napisanych powyżej.</p>
        <p>
          Rozwiązuje równanie różniczkowe <InlineMath math="\frac{d^2\phi}{dx^2} = -\frac{\rho}{\epsilon_r}"/>{' '}
          zdefiniowane dokładniej we <Link to="/theory">wstępie teoretycznym</Link>.
        </p>
        <p>Zwraca tablicę punktów <InlineMath math="(x,y)"/>, która posłuży do generowania wykresu funkcji <InlineMath math="y = \phi(x)"/>.</p>
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
            code={solverSC}
            language={LANGUAGE}
          />
          )
        }
      </>
    );
}

export default Solver;
