import { BlockMath, InlineMath } from 'react-katex';
import styles from './theory.module.css'

function Theory() {

  const scrollToSection = (section: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const element = document.getElementById(section);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }

  return (
    <div className={styles.wrapper}>
      <br/>
      <h2>Wstęp teoretyczny</h2>
      <br />
      <p>W tej sekcji znajduje się kompletny wstęp związany z teorią, który potrzebny jest do rozpoczęcia pracy nad znajdowaniem numerycznego rozwiązania problemu. Można go podzielić na następujące części:</p>
      <ul>
        <li><a href="#" onClick={scrollToSection("intro")}>Treść problemu</a></li>
        <li><a href="#" onClick={scrollToSection("boundary-conditions")}>Opracowanie warunków brzegowych</a></li>
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

      <h3 id="boundary-conditions">Opracowanie warunków brzegowych</h3>
      <br />
      <p>W powyższym problemie występują dwa warunki brzegowe, które musimy wziąć pod uwagę. Pierwszy z nich to tzw. <b>warunek Robina</b>. Obsługujemy go poprzez wyliczenie wartości funkcji <InlineMath math="\phi'(0)"/>, gdyż pojawi się ona w sformułowaniu słabym równania:</p>
      <BlockMath math="\phi'(0)+\phi(0) = 5 \quad \Rightarrow \quad \phi'(0) = 5 - \phi(0)" />
      <p>Drugim warunkiem jest tzw. <b>warunek Dirichleta</b>. W naszym przypadku występuje on w postaci niezerowej (po prawej stronie równania nie ma zera), co jest problematyczne, ponieważ zbiór funkcji, których wartości na brzegu dziedziny są równe zeru nie generują podprzestrzeni liniowej. My natomiast potrzebujemy uzyskać liniowość ze względu na późniejsze obliczenia na macierzach.</p>
      <br />
      <p>Aby to umożliwić, dokonamy <b>przesunięcia</b> (shift'u) tego warunku, w efekcie czego będziemy szukać nowego rozwiązania, które posiada zerowy warunek Dirichleta. Pod koniec odzyskamy nasze faktyczne rozwiązanie odwracając podstawienie.</p>
      <BlockMath math=""/>
    </div>
  );
}

export default Theory;
