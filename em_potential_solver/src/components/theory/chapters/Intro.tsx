import { BlockMath, InlineMath } from "react-katex";

function Intro() {
  return (
    <>
      <h3 id="intro">Treść problemu</h3>
      <br />
      <p>Zagadnienie, które mamy rozwiązać przy użyciu MES to równanie opisujące potencjał elektromagnetyczny:</p>
      <BlockMath math="\frac{d^2\phi}{dx^2}=-\frac{\rho}{\epsilon_r(x)}"/>
      <p>Do tego równania mamy podane warunki brzegowe:</p>
      <BlockMath math="\begin{cases} \phi'(0)+\phi(0) = 5 \\ \phi(3) = 2 \end{cases}" />
      <p>A także zdefiniowaną stałą funkcję gęstości wraz z funkcją przenikalności elektrycznej, która jest stała przedziałami:</p>
      <BlockMath math="\rho=1,\qquad \epsilon_r(x) = 
        \begin{cases} 
          10, & x \in [0,1] \\ 
          5, & x \in (1, 2] \\ 
          1, & x \in (2, 3] 
        \end{cases}
      "/>
      <p>
        Fakt, że funkcja <InlineMath math="\epsilon_r(x)" /> posiada nieciągłości jest istotny z perspektywy MES, należy 
        wziąć go pod uwagę dobierając liczbę elementów (<InlineMath math="n" />) na które będziemy dzielili naszą dziedzinę, 
        która tutaj wynosi <InlineMath math="\Omega=[0,3]" />.
      </p>
      <br /><br />
    </>
  );
}

export default Intro;
