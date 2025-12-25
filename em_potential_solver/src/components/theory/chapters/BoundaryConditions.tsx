import { BlockMath, InlineMath } from "react-katex";

function BoundaryConditions() {
 return (
  <>
    <h3 id="boundary-conditions">Opracowanie warunków brzegowych</h3>
    <br />
    <p>
      W powyższym problemie występują dwa warunki brzegowe, które musimy rozważyć. Pierwszy z nich to tzw. <b>warunek Robina</b>. 
      Obsługujemy go poprzez wyliczenie wartości funkcji <InlineMath math="\phi'(0)"/>, gdyż pojawi się ona w sformułowaniu słabym równania:
    </p>
    <BlockMath math="\phi'(0)+\phi(0) = 5 \ \Rightarrow \ \phi'(0) = 5 - \phi(0)" />
    <p>
      Drugim warunkiem jest tzw. <b>warunek Dirichleta</b>. W naszym przypadku występuje on w postaci niezerowej 
      (po prawej stronie równania nie ma zera), co jest problematyczne, ponieważ zbiór funkcji, których wartości na brzegu 
      dziedziny są równe zeru nie generują podprzestrzeni liniowej. My natomiast potrzebujemy uzyskać liniowość ze względu 
      na późniejsze obliczenia na macierzach.
    </p>
    <br />
    <p>
      Aby to umożliwić, dokonamy <b>przesunięcia</b> (shift'u) tego warunku, w efekcie czego będziemy szukać nowego rozwiązania, 
      które posiada zerowy warunek Dirichleta. Pod koniec odzyskamy nasze faktyczne rozwiązanie odwracając podstawienie. 
      Przesuwamy więc funkcję:
    </p>
    <BlockMath math="
      \begin{gather*}
        \phi(3) = 2 \\
        \phi(3) = w(3) + \widehat{\phi}(3)
      \end{gather*}
    "/> 
    <p>
      Funkcja <InlineMath math="w"/> jest naszą nową funkcją, której będziemy poszukiwali. Zeruje się ona na 
      brzegach <InlineMath math="\Omega" />. Aby do tego doprowadzić, musimy zdefiniować odpowiednio naszą 
      funkcję <InlineMath math="\widehat{\phi}(x)"/>, co możemy zrobić w następujący sposób:
    </p>
    <BlockMath math="
      \widehat{\phi}(0)=0 \land \widehat{\phi}(3)=2 \ \Rightarrow \ \widehat{\phi}(x)=\frac{2}{3}x" />
    <p>W rezultacie daje nam to następujące podstawienie:</p>
    <BlockMath math="
      \begin{cases}
        \phi(x) = w(x)+\frac{2}{3}x \\ 
        \phi'(x) = w'(x)+\frac{2}{3} \\ 
        \phi''(x) = w''(x) 
      \end{cases}, 
      \quad w(0)=w(3)=0
    "/>
    <br />
  </>
 );
}

export default BoundaryConditions;
