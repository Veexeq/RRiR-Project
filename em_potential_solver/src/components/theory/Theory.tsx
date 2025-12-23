import { BlockMath, InlineMath } from 'react-katex';
import styles from './theory.module.css'
import HatFunctionsChart from '../ui/HatFunctionsChart';

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
      <p>W tej sekcji znajduje się kompletny wstęp związany z teorią, który potrzebny jest do rozpoczęcia pracy nad znajdowaniem numerycznego rozwiązania problemu przy użyciu <b>Metody Elementów Skończonych</b> (MES). Można go podzielić na następujące części:</p>
      <ul>
        <li><a href="#" onClick={scrollToSection("intro")}>Treść problemu</a></li>
        <li><a href="#" onClick={scrollToSection("boundary-conditions")}>Opracowanie warunków brzegowych</a></li>
        <li><a href="#" onClick={scrollToSection("weak-form")}>Wyprowadzenie sformułowania wariacyjnego</a></li>
        <li><a href="#" onClick={scrollToSection("discrete")}>Dyskretyzacja</a></li>
        <li>Wyprowadzenie układu równań</li>
      </ul>
      <br />

      <h3 id="intro">Treść problemu</h3>
      <br />
      <p>Zagadnienie, które mamy rozwiązać przy użyciu MES to równanie opisujące potencjał elektromagnetyczny:</p>
      <BlockMath math="\frac{d^2\phi}{dx^2}=-\frac{\rho}{\epsilon_r(x)}"/>
      <p>Do tego równania mamy podane warunki brzegowe:</p>
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
      <p>W powyższym problemie występują dwa warunki brzegowe, które musimy rozważyć. Pierwszy z nich to tzw. <b>warunek Robina</b>. Obsługujemy go poprzez wyliczenie wartości funkcji <InlineMath math="\phi'(0)"/>, gdyż pojawi się ona w sformułowaniu słabym równania:</p>
      <BlockMath math="\phi'(0)+\phi(0) = 5 \ \Rightarrow \ \phi'(0) = 5 - \phi(0)" />
      <p>Drugim warunkiem jest tzw. <b>warunek Dirichleta</b>. W naszym przypadku występuje on w postaci niezerowej (po prawej stronie równania nie ma zera), co jest problematyczne, ponieważ zbiór funkcji, których wartości na brzegu dziedziny są równe zeru nie generują podprzestrzeni liniowej. My natomiast potrzebujemy uzyskać liniowość ze względu na późniejsze obliczenia na macierzach.</p>
      <br />
      <p>Aby to umożliwić, dokonamy <b>przesunięcia</b> (shift'u) tego warunku, w efekcie czego będziemy szukać nowego rozwiązania, które posiada zerowy warunek Dirichleta. Pod koniec odzyskamy nasze faktyczne rozwiązanie odwracając podstawienie. Przesuwamy więc funkcję:</p>
      <BlockMath math="\begin{gather*}
        \phi(3) = 2 \\
        \phi(3) = w(3) + \widehat{\phi}(3)
      \end{gather*}"/> 
      <p>Funkcja <InlineMath math="w"/> jest naszą nową funkcją, której będziemy poszukiwali. Zeruje się ona na brzegach <InlineMath math="\Omega" />. Aby do tego doprowadzić, musimy zdefiniować odpowiednio naszą funkcję <InlineMath math="\widehat{\phi}(x)"/>, co możemy zrobić w następujący sposób:</p>
      <BlockMath math="\widehat{\phi}(0)=0 \land \widehat{\phi}(3)=2 \ \Rightarrow \ \widehat{\phi}(x)=\frac{2}{3}x" />
      <p>W rezultacie daje nam to następujące podstawienie:</p>
      <BlockMath math="\begin{cases}
        \phi(x) = w(x)+\frac{2}{3}x \\ 
        \phi'(x) = w'(x)+\frac{2}{3} \\ 
        \phi''(x) = w''(x) 
      \end{cases}, \quad w(0)=w(3)=0"/>
      <br />
      <h3 id="weak-form">Wyprowadzenie sformułowania wariacyjnego</h3>
      <br />
      <p>Sformułowanie wariacyjne (słabe) służy temu, aby zawęzić dziedzinę naszego problemu. Zamiast poszukiwać dowolnej funkcji <InlineMath math="\phi"/> spełniającej nasze równanie w każdym punkcie dziedziny, szukać będziemy takich funkcji, które spełniają równanie "średnio" w całej dziedzinie.</p>
      <br />
      <p>Aby to osiągnąć, potrzebujemy wprowadzić pewną funkcję testową <InlineMath math="v" />, która jest pewnym odnośnikiem względem którego bada się jak dobrze dane równanie jest spełnione. Choć szczegóły funkcji testowych są dosyć zawiłe i skomplikowane, jej użycie jest proste, opiera się na jednym, prostym założeniu:</p>
      <br />
      <div className={styles.highlight}>
        <p>Wartość funkcji testowej <InlineMath math="v"/> w punktach, gdzie znamy wartość naszej poszukiwanej funkcji, jest równa zero.</p>
      </div>
      <br />
      <p>Dzieje się tak, ponieważ nie testujemy funkcji w miejscach, gdzie znamy jej zachowanie. W takich miejscach błąd jest zawsze zerowy.</p>
      <br />
      <p>Uzbrojeni w wiedzę o funkcjach testowych, możemy zacząć wyprowadzać sformułowanie wariacyjne. Przypomnijmy sobie nasze równanie, przemnóżmy je obustronnie przez <InlineMath math="-1"/>:</p>
      <BlockMath math="\begin{gather*}
        \phi''(x) = -\frac{\rho}{\epsilon_r(x)} \\
        -\phi''(x) = \frac{\rho}{\epsilon_r(x)}
      \end{gather*}" />
      <p>Teraz pomnóżmy obustronnie to równanie poprzez <InlineMath math="v"/> a następnie scałkujmy po całej dziedzinie <InlineMath math="\Omega=[1,3]"/>:</p>
      <BlockMath math="\int_{0}^{3} -\phi''v\, dx = \int_{0}^{3} \frac{\rho}{\epsilon_r} v \, dx"/>
      <p>Zajmijmy się na razie lewą stroną, przeprowadźmy całkowanie przez części:</p>
      <BlockMath math="
        \int_{0}^{3} -\phi''v\, dx =  
        \left| \begin{array}{l l} 
          f = v & f' = v' \\ 
          g' = -\phi'' & g = -\phi' 
        \end{array} \right| =
        \int_{0}^{3} \phi'v'\, dx - \left[ \phi' v \right]_0^3
      "/>
      <p>Rozwińmy teraz człon brzegowy:</p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx - \left[ \phi' v \right]_0^3 = \int_{0}^{3} \phi'v'\, dx - [\phi'(3) v(3) - \phi'(0) v(0)]
      "/>
      <p>Teraz skorzystamy z wyżej wyszczególnionej własności funkcji testowych oraz warunku brzegowego Robina:</p>
      <BlockMath math="\begin{cases}
        \phi(3) = 2 \Rightarrow v(3) = 0 \\
        \phi'(0) + \phi(0) = 5 \Rightarrow \phi'(0) = 5 - \phi(0)
      \end{cases}"/>
      <p>Dzięki temu nasza lewa strona równania upraszcza się do następującej postaci:</p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx + 5v(0) - v(0)\phi(0)
      "/>
      <p>Teraz wstawiamy ją do naszego pierwotnego równania, porządkujemy składniki przenosząc człon zależny wyłącznie od <InlineMath math="v" /> na prawą stronę:</p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx - v(0)\phi(0) = \int_{0}^{3} \frac{\rho}{\epsilon_r} v \, dx - 5v(0)
      "/>
      <p>Kolejnym krokiem jest wprowadzenie podstawienia, o którym mówiliśmy analizując niezerowy warunek brzegowy Dirichleta. Zmodyfikuje on wyłącznie lewą stroną, będącą formą dwuliniową zależną od <InlineMath math="\phi"/> oraz <InlineMath math="v"/>:</p>
      <BlockMath math="\begin{gather*}
        \phi(x) = w(x)+\frac{2}{3}x, \ \phi'(x) = w'(x) + \frac{2}{3} \\
        \int_{0}^{3} (w' + \frac{2}{3})v' \, dx - v(0)[w(0) + \frac{2}{3} \cdot 0] = \int_{0}^{3} w'v' \, dx - v(0)w(0) + \frac{2}{3} \int_{0}^{3} v' \, dx
      \end{gather*}"/>
      <p>Obliczmy ostatnią całkę pamiętając o uwadze dotyczącej funkcji testujących:</p>
      <BlockMath math="
        \int_{0}^{3} v' \, dx = \left[ v \right]_{0}^{3} = v(3) - v(0) = -v(0)
      " />
      <p>Wstawiamy wszystko do głównego równania, co kończy wyprowadzenie sformułowania wariacyjnego.</p>
      <p>Oto podsumowanie:</p>
      <br />
      <div className={styles.highlight}>
        <BlockMath math="\begin{gather}
          \int_{0}^{3} w'v' \, dx - v(0)w(0) = \int_{0}^{3} \frac{\rho} {\epsilon_r} v \, dx - \frac{13}{3} v(0) \\
          w(3) = 0
        \end{gather}"/>
        <p>
          (1) sformułowanie wariacyjne, poszukujemy funkcji <InlineMath math="w"/><br />
          (2) nowy, zerowy warunek brzegowy Dirichleta
        </p>
      </div><br />
      <p><b>Uwaga</b>: warunek brzegowy Robina "wbudowany" jest w sformułowanie wariacyjne, nie wymuszamy go w osobnym równaniu.</p>

      <br />
      <h3 id="discrete">Dyskretyzacja</h3>
      <br />
      <p>Dyskretyzacją nazywamy proces zmiany całkowania, będącego ciągłą operacją, na sumę skończenie wielu elementów. W sformułowaniu wariacyjnym mamy do czynienia z całką z nieznanej funkcji <InlineMath math="w"/>, którą będziemy teraz przybliżać.</p>
      <br />
      <p>Podzielmy naszą dziedzinę na <InlineMath math="n"/> skończonych elemetów. W efekcie tego dostajemy <InlineMath math="n"/> przedziałów, które ustalają <InlineMath math="n+1"/> węzłów:</p>
      <BlockMath math="\Omega = \bigcup_{i=1}^{n} \, [x_i, \, x_{i+1}] \quad gdzie \quad [x_i, \, x_{i+1}] = \left[ \tfrac{i-1}{n}, \, \tfrac{i}{n} \right]"/>
      <p>Ważną obserwacją jest to, że brzegi tych przedziałów na siebie nachodzą. Będzie to miało istotną konsekwencję w macierzy, którą będziemy teraz budować.</p>
      <br />
      <p>Teraz, wprowadziwszy podział dziedziny, możemy wprowadzić aproksymację naszej poszukiwanej funkcji <InlineMath math="w"/>. Będzie ona miała następującą postać:</p>
      <BlockMath math="w(x) = \sum_{i = 1}^{n + 1} w_i \cdot e_i(x)"/>
      <p>Użyte wyżej funkcje <InlineMath math="e_i(x)"/> to tak zwane funkcje bazowe, natomiast liczba <InlineMath math="w_i"/> to wartość poszukiwanej funkcji <InlineMath math="w(x)"/> w <InlineMath math="i"/>-tym węźle. Liczby te nazywamy również wagami, gdyż określają wagę danej funkcji bazowej w danej kombinacji liniowej.</p>
      <br />
      <p>Funkcje bazowe nie są tutaj dowolne, mają szczególną postać. W przypadku jednowymiarowym, jako funkcje bazowe stosujemy tzw. <b>funkcje daszkowe</b>. Funkcja daszkowa <InlineMath math="e_i(x)"/> w <InlineMath math="i"/>-tym węźle przyjmuje wartość <InlineMath math="1"/>, spada do <InlineMath math="0"/> w sąsiednich węzłach, a następnie jest funkcją stałą równą <InlineMath math="0"/>.</p>
      <br />
      <p>Rozważając przypadek gdzie <InlineMath math="n = 3"/>, funkcje daszkowe będą wyglądać w następujący sposób:</p>
      <HatFunctionsChart />
      <p>Teraz możemy połączyć przygotowane wcześniej sformułowanie wariacyjne wraz z aproksymacją funkcji <InlineMath math="w"/> w jedną całość. Zrobimy to korzystając z tzw. <b>metody Galerkina</b>, która w uproszczeniu mówi, że będziemy testować nasze rozwiązanie tym samym, czym je budujemy. Oznacza to, że nasza funkcja testująca <InlineMath math="v(x)"/> ze sformułowania wariacyjnego przyjmie postać <InlineMath math="e_i"/>, co wygeneruje nam <InlineMath math="n+1"/> równań liniowych, które ubierzemy w macierz.</p>
      <br />
      <p>Spróbujmy stworzyć macierz, wpierw kontynuując prosty przykład, który rozpoczęliśmy powyżej, ponieważ uogólnienie na większą liczbę <InlineMath math="n"/> będzie bardzo proste.</p>
      <br />
      <p>Rozważmy fragment sformułowania wariacyjnego, który będzie odpowiedzialny za macierz, a dokładniej rozważmy go tylko na pierwszym elemencie naszej dziedziny:</p>
      <BlockMath math="\int_{0}^{1} w'v' \, dx"/>
      <p>Aproksymujmy na tym elemencie naszą funkcję <InlineMath math="w(x)"/>. Będzie ona miała postać:</p>
      <BlockMath math="w(x) = w_1 e_1(x) + w_2 e_2(x)"/>
      <p>Dzieje się tak, ponieważ w każdym przedziale <InlineMath math="[x_i, x_{i+1}]"/> na wygląd funkcji <InlineMath math="w(x)"/> wpływ mają wyłącznie funkcje bazowe <InlineMath math="e_i"/> oraz <InlineMath math="e_{i+1}"/>. Dzięki temu możemy przekształcić ten fragment w następujący sposób:</p>
      <BlockMath math="\int_{0}^{1} w'v' \, dx = \int_{0}^{1} [w_1 e_1(x) + w_2 e_2(x)]' \cdot v' \, dx = w_1 \int_{0}^{1} e_1'v' \, dx + w_2 \int_{0}^{1} e_2'v' \, dx"/>
      <p>Z racji, że testujemy nasze rozwiązanie według metody Galerkina, dostajemy z tego elementu dwa równania:</p>
      <BlockMath math="\begin{dcases}
        v'(x) = e_1'(x) \Rightarrow \int_{0}^{1} w'v' \, dx = w_1 \int_{0}^{1} (e_1')^2 \, dx + w_2 \int_{0}^{1} e_1'e_2' \, dx \\[2ex]
        v'(x) = e_2'(x) \Rightarrow \int_{0}^{1} w'v' \, dx = w_1 \int_{0}^{1} e_1'e_2' \, dx + w_2 \int_{0}^{1} (e_2')^2 \, dx
      \end{dcases}"/>
      <p>Teraz, możemy połączyć to z faktem, że pochodne funkcji liniowych <InlineMath math="e_i"/> to nachylenia prostych, a więc:</p>
      <BlockMath math="\begin{dcases}
        e_1'(x) = 1 \\[2ex]
        e_2'(x) = -1
      \end{dcases} \quad \Rightarrow \quad \begin{dcases}
        w_1 \int_{0}^{1} (e_1')^2 \, dx + w_2 \int_{0}^{1} e_1'e_2' \, dx = w_1 - w_2 \\[2ex]
        w_1 \int_{0}^{1} e_1'e_2' \, dx + w_2 \int_{0}^{1} (e_2')^2 \, dx = -w_1 + w_2
      \end{dcases}"/>
      <p>Dzięki temu możemy skonstruować lokalną macierz sztywności, która jest budulcem globalnej macierzy sztywności, czyli macierzy, którą poszukujemy. Wygląda ona tak:</p>
      <BlockMath math="\mathbf{K^{1}} = 
      \begin{bmatrix}
      e_1'e_1' &e_1'e_2' \\
      e_2'e_1' &e_2'e_2'
      \end{bmatrix} = 
      \begin{bmatrix}
      1 &-1 \\
      -1 &1
      \end{bmatrix}"/>
      <p>Jedynka w indeksie górnym oznacza, że jest to macierz dla pierwszego elementu skończonego. Jest to macierz lokalna, którą możemy rozszerzyć do globalnego wymiaru uzupełniając ją zerami. Dzięki temu otrzymamy jeden ze składników finalnej macierzy (<InlineMath math="G"/> w indeksie dolnym jest od słowa "global"):</p>
      <BlockMath math="\mathbf{K_G^{1}} = 
      \begin{bmatrix}
      K^{1}_{00} &K^{1}_{01} &0 &0 \\
      K^{1}_{10} &K^{1}_{11} &0 &0 \\
      0 &0 &0 &0 \\
      0 &0 &0 &0
      \end{bmatrix}"/>
      <p>Analogicznie wyprowadzamy składniki odpowiedzialne za element drugi oraz trzeci w naszym podziale dziedziny:</p>
      <BlockMath math="\mathbf{K_G^{2}} = 
      \begin{bmatrix}
      0 &0 &0 &0 \\
      0 &K^{2}_{11} &K^{2}_{12} &0 \\
      0 &K^{2}_{21} &K^{2}_{22} &0 \\
      0 &0 &0 &0
      \end{bmatrix} \ , \quad \mathbf{K_G^{3}} =
      \begin{bmatrix}
      0 &0 &0 &0 \\
      0 &0 &0 &0 \\
      0 &0 &K^{3}_{22} &K^{3}_{23} \\
      0 &0 &K^{3}_{32} &K^{3}_{33}
      \end{bmatrix}
      "/>
      <p>Jeśli zsumujemy te macierze, otrzymujemy globalną macierz sztywności, która definiuje lewą stronę układu równań:</p>
      <BlockMath math="\mathbf{K_G^{1}} + \mathbf{K_G^{2}} + \mathbf{K_G^{3}} = \begin{bmatrix}
      K^{1}_{00} &K^{1}_{01} &0 &0 \\
      K^{1}_{10} &(K^{1}_{11} + K^{2}_{11}) &0 \\
      0 &K^{2}_{21} &(K^{2}_{22} + K^{3}_{22}) &0 \\
      0 &0 &K^{3}_{32} &K^{3}_{33}
      \end{bmatrix}
      "/>
    </div>
  );
}

export default Theory;
