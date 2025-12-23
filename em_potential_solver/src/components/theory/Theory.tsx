import { BlockMath, InlineMath } from 'react-katex';
import styles from './theory.module.css'

function Theory() {
  return (
    <div className={styles.wrapper}>
      <br/>
      <h2>Wstęp teoretyczny</h2>
      <br />
      <p>W tej sekcji znajduje się kompletny wstęp związany z teorią, który potrzebny jest do rozpoczęcia pracy nad znajdowaniem numerycznego rozwiązania problemu. Można go podzielić na następujące części:</p>
      <ul>
        <li><a href="#intro">Treść problemu</a></li>
        <li>Opracowanie warunków brzegowych</li>
        <li>Wyprowadzenie sformułowania wariacyjnego</li>
        <li>Dyskretyzacja</li>
        <li>Wyprowadzenie układu równań</li>
      </ul>
      <br />

      <h3 id="intro">Treść problemu</h3>
      <br />
      <p>Zagadnienie, które mamy rozwiązać przy użyciu MES to równanie opisujące potencjał elektromagnetyczny:</p>
      <BlockMath math="\frac{d^2\phi}{dx^2}=-\frac{\rho}{\epsilon_r(x)}"/>
      <p>Do tego równania mamy również podane warunki brzegowe:</p>
      <BlockMath math="\begin{cases} \phi'(0)+\phi(0) = 5 \\ \phi(3) = 2 \end{cases}" />
      <p>A także zdefiniowaną stałą funkcję gęstości wraz z funkcją przenikalności elektrycznej, która jest stała przedziałami:</p>
      <BlockMath math="\rho=1,\qquad \epsilon_r(x)=\begin{cases} 
        10, & x \in [0,1] \\ 
        5, & x \in (1, 2] \\ 
        1, & x \in (2, 3] \end{cases}" />
      <p>Fakt, że funkcja <InlineMath math="\epsilon_r(x)" /> posiada nieciągłości jest istotny z perspektywy MES, należy wziąć go pod uwagę dobierając liczbę elementów (<InlineMath math="n" />) na które będziemy dzielili naszą dziedzinę, która tutaj wynosi <InlineMath math="\Omega=[0,3]" />.</p>
      <br /><br />

      <h3>Opracowanie warunków brzegowych</h3>
      <br />
    </div>
  );
}

export default Theory;
