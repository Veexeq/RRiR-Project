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
        <li>Metoda eliminacji Gaussa</li>
        <li>Kwadratury Gauss-Legendre</li>
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
      <br />
      <h4>Budowanie macierzy sztywności</h4>
      <br />
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
      <BlockMath math="\mathbf{K_G} = \mathbf{K_G^{1}} + \mathbf{K_G^{2}} + \mathbf{K_G^{3}} = \begin{bmatrix}
      K^{1}_{00} &K^{1}_{01} &0 &0 \\
      K^{1}_{10} &(K^{1}_{11} + K^{2}_{11}) &0 \\
      0 &K^{2}_{21} &(K^{2}_{22} + K^{3}_{22}) &0 \\
      0 &0 &K^{3}_{32} &K^{3}_{33}
      \end{bmatrix}
      "/>
      <p>Globalny wzór na ogólną (nieuwzględniającą warunków brzegowych Robina) macierz sztywności zbudowaną przy użyciu funkcji daszkowych oraz trzech elementów skończonych o długości <InlineMath math="h"/> to:</p>
      <BlockMath math="\mathbf{K_G} = \frac{1}{h}
      \begin{bmatrix}
      1 &-1 &0 &0 \\
      -1 &2 &-1 &0 \\
      0 &-1 &2 &-1 \\
      0 &0 &-1 &1 
      \end{bmatrix} = 
      \begin{bmatrix}
      1 &-1 &0 &0 \\
      -1 &2 &-1 &0 \\
      0 &-1 &2 &-1 \\
      0 &0 &-1 &1 
      \end{bmatrix}
      "/>
      <p>Podział na większą liczbę elementów skończonych zwiększy wymiar, lecz forma tej macierzy pozostanie taka sama. Łatwo można ją zapamiętać dzięki liniowym funkcjom bazowym degenerującym się do stałych przy różniczkowaniu.</p>
      <br />
      <h4>Budowanie wektora sił</h4>
      <br />
      <p>Spróbujmy analogicznie do macierzy szytywności zbudować tzw. wektor sił, który stanowi budulec prawej strony równania. Ponownie, zacznijmy od jednego elementu skończonego, rozważmy prawą stronę sformułowania wariacyjnego:</p>
      <BlockMath math="\int_{0}^{1} \frac{\rho}{\epsilon_r} v \, dx"/>
      <p>Ponownie użyjemy <b>metody Garkina</b>, więc testować ten człon będziemy przy użyciu funkcji bazowych, które znamy już z poprzednich części artykułu. Przypomnijmy, dla pierwszego elementu wynoszą one:</p>
      <BlockMath math="\begin{dcases} 
      e_1(x) = x \\
      e_2(x) = 1-x
      \end{dcases}"/>
      <p>Podstawiając je za funkcję testującą otrzymujemy dwa równania. Pamiętajmy również o tym, że treść zadania zdefiniowała nam funkcje <InlineMath math="\rho(x) = 1"/> oraz <InlineMath math="\epsilon_r(x) = 10"/>. Łącząc to wszystko dostajemy:</p>
      <BlockMath math="\begin{dcases}
        v(x) = e_1(x) = x \Rightarrow \int_{0}^{1} \frac{\rho}{\epsilon_r} v \, dx = \frac{1}{10}\int_{0}^{1} x \, dx \\[2ex]
        v(x) = e_2(x) = 1 - x \Rightarrow \int_{0}^{1} \frac{\rho}{\epsilon_r} v \, dx = \frac{1}{10}\int_{0}^{1} (1-x) \, dx
      \end{dcases}"/>
      <p>Możemy zauważyć, że dla dowolnego elementu skończonego całka z funkcji bazowej, będącej funkcją testującą, zawsze wynosi <InlineMath math="\frac{h}{2}"/>, gdzie <InlineMath math="h"/> jest długością elementu. Dzieje się tak, ponieważ funkcje daszkowe tworzą trójąty prostokątne dla danego elementu, a licząc całkę oznaczoną liczymy pole powierzchni tych trójkątów.</p>
      <br />
      <p>Zanim przejdziemy do konstrukcji wektora sił, zbierzmy powyższe obserwacje w jeden, ogólny wzór. Dla danego, <InlineMath math="i"/>-tego elementu skończonego, lokalny wektor sił, który generuje ten element, opisywany jest wzorem:</p>
      <BlockMath math="\mathbf{F^1} = \frac{\rho}{\epsilon_r} \cdot \frac{h}{2} \cdot 
      \begin{bmatrix}
      1 \\
      1
      \end{bmatrix}"/>
      <p>Teraz, analogicznie, możemy rozszerzyć go do globalnego wymiaru wektora sił:</p>
      <BlockMath math="\mathbf{F^1_G} = \frac{h}{2} \cdot 
      \begin{bmatrix}
      \mathbf{F^1_0} \\
      \mathbf{F^1_1} \\
      0 \\
      0
      \end{bmatrix}, \qquad \mathbf{F^1_i} = \frac{\rho(i)}{\epsilon_r(i)} \in \left\{\frac{1}{10}, \frac{1}{5}, 1\right\}
      "/>
      <p>Teraz pozostaje nam już tylko zsumować wszystkie elementy skończone i uzyskać globalny (nieuwzględniający warunku Robina) wektor sił:</p>
      <BlockMath math="\mathbf{F_G} = \frac{h}{2}
      \begin{bmatrix}
      \mathbf{F^1_0} \\
      \mathbf{F^1_1} + \mathbf{F^2_1} \\
      \mathbf{F^2_2} + \mathbf{F^3_2} \\
      \mathbf{F^3_2}
      \end{bmatrix} = \frac{1}{2}
      \begin{bmatrix} 
      0.1 \\
      0.1 + 0.2 \\
      0.2 + 1 \\
      1
      \end{bmatrix} = 
      \begin{bmatrix} 
      0.05 \\
      0.15 \\
      0.60 \\
      0.50
      \end{bmatrix}
      "/>
      <br />
      <h4>Uwzględnienie warunków brzegowych</h4>
      <br />
      <p>Na ten moment udało nam się przejść z sformułowania wariacyjnego do układu równań liniowych w postaci równania macierzowego, lecz nie uwzględniliśmy przy tym warunków brzegowych.</p>
      <br />
      <p>Na ten moment wykonaliśmy takie przekształcenie:</p>
      <BlockMath math="
        \int_{0}^{3} w'v' \, dx = \int_{0}^{3} \frac{\rho} {\epsilon_r} v\, dx \quad \Rightarrow \quad
        \begin{bmatrix}
        1 &-1 &0 &0 \\
        -1 &2 &-1 &0 \\
        0 &-1 &2 &-1 \\
        0 &0 &-1 &1 
        \end{bmatrix}
        \begin{bmatrix}
        w_1 \\
        w_2 \\
        w_3 \\
        w_4
        \end{bmatrix} = 
        \begin{bmatrix} 
        0.05 \\
        0.15 \\
        0.60 \\
        0.50
        \end{bmatrix}
      " />
    <p>Nasze sformułowanie wariacyjne wyglądało jednak w taki sposób:</p>
    <BlockMath math="\int_{0}^{3} w'v' \, dx - v(0)w(0) = \int_{0}^{3} \frac{\rho} {\epsilon_r} v \, dx - \frac{13}{3} v(0)"/>
    <p>Aby uwzględnić warunek brzegowy Robina zawarty w powyższym sformułowaniu wariacyjnym, zauważmy, że jest on uzależniony od wartości funkcji testującej <InlineMath math="v"/> w punkcie <InlineMath math="x=0"/>. Każda z naszych funkcji bazowych, oprócz <InlineMath math="e_1(x)"/>, która ma w pierwszym węźle wartość <InlineMath math="1"/>, zeruje się w tym punkcie. Oznacza to, że ten warunek będzie miał wpływ wyłącznie na pierwsze równanie, a więc pierwszy wiersz macierzy. Ponadto, wiemy, że <InlineMath math="w(0)=w_1"/>, gdyż jest to po prostu wartość w pierwszym węźle.</p>
    <br />
    <p>Podsumowując, aby uwzględnić warunek brzegowy Robina, należy zmodyfikować nasze równanie macierzowe w następujący sposób:</p>
    <BlockMath math="
      \begin{bmatrix}
      1 &-1 &0 &0 \\
      -1 &2 &-1 &0 \\
      0 &-1 &2 &-1 \\
      0 &0 &-1 &1 
      \end{bmatrix}
      \begin{bmatrix}
      w_1 \\
      w_2 \\
      w_3 \\
      w_4
      \end{bmatrix} + 
      \begin{bmatrix}
        -1 &0 &0 &0 \\
        0 &0 &0 &0 \\
        0 &0 &0 &0 \\
        0 &0 &0 &0
      \end{bmatrix}
      \begin{bmatrix}
        w_1 \\
        w_2 \\
        w_3 \\
        w_4 \\
      \end{bmatrix} = 
      \begin{bmatrix} 
      0.05 \\
      0.15 \\
      0.60 \\
      0.50
      \end{bmatrix} - 
      \begin{bmatrix} 
      4.33 \\
      0.00 \\
      0.00 \\
      0.00
      \end{bmatrix}
    "/>
    <p>Ponadto, możemy uwzględnić warunek brzegowy Dirichleta, który wyeliminuje nam cały ostatni rząd z układu równań, gdyż mówi on bezpośrednio o wartości funkcji <InlineMath math="w"/> w punkcie <InlineMath math="x = 3"/>. Łącząc wszystko, otrzymujemy poniższe równanie macierzowe:</p>
    <BlockMath math="
      \begin{bmatrix}
      0 &-1 &0 &0 \\
      -1 &2 &-1 &0 \\
      0 &-1 &2 &-1 \\
      0 &0 &0 &1 
      \end{bmatrix}
      \begin{bmatrix}
      w_1 \\
      w_2 \\
      w_3 \\
      w_4
      \end{bmatrix} = \begin{bmatrix} 
      -4.28 \\
      0.15 \\
      0.60 \\
      0
      \end{bmatrix}
    "/>
    <br />
    <p>Uogólnienie tego równania na dowolną liczbę elementów skończonych jest bardzo proste dzięki wyprowadzonym ogólnym wzorom na <InlineMath math="\mathbf{K_G}"/> oraz <InlineMath math="\mathbf{F_G}"/>.</p>
    <br/>
    <h3>Metoda eliminacji Gaussa</h3>
    <br />
    <p>Ta sekcja poświęcona jest omówieniu implementacji metody eliminacji Gaussa, której użyjemy, aby rozwiązać nasze wyprowadzone wyżej równanie macierzowe <InlineMath math="\mathbf{K_G} \cdot \mathbf{w} = \mathbf{F_G}"/></p>
    <br />
    <p>Algorytm składa się z dwóch etapów. Pierwszym z nich jest doprowadzenie macierzy sztywności do macierzy trójkątnej górnej. Spójrzmy na nasz aktualny układ równań:</p>
    <BlockMath math="\left[ \begin{array}{cccc|c}
      0 &-1 &0 &0 &-4.28 \\
      -1 &2 &-1 &0 &0.15 \\
      0 &-1 &2 &-1 &0.60 \\
      0 &0 &0 &1 &0
    \end{array} \right]"/>
    <p>Zajmować się będziemy kolejno kolumnami. Dla każdej kolumny musimy znaleźć tzw. pivot, który posiada największą wartość bezwględną w danej kolumnie. W kolumnie <InlineMath math="0"/> będzie to <InlineMath math="-1"/>. Mając pivot, zamieniamy wiersze w taki sposób, aby wylądował on na przekątnej głównej macierzy sztywności, a następnie zerujemy tym pivotem wszystkie poniższe elementy w aktualnej kolumnie:</p>
    <BlockMath math="\left[ \begin{array}{cccc|c}
      0 &-1 &0 &0 &-4.28 \\
      \textcolor{red}{-1} &2 &-1 &0 &0.15 \\
      0 &-1 &2 &-1 &0.60 \\
      0 &0 &0 &1 &0
    \end{array} \right]
    \longrightarrow
    \left[ \begin{array}{cccc|c}
      \textcolor{red}{-1} &2 &-1 &0 &0.15 \\
      0 &-1 &0 &0 &-4.28 \\
      0 &-1 &2 &-1 &0.60 \\
      0 &0 &0 &1 &0
    \end{array} \right]
    "/>
    <p>Teraz przechodzimy do kolumny <InlineMath math="1"/>. Ponownie, znajdujemy pivot (który jest w tym przypadku już wybrany) a następnie zerujemy poniższe kolumny przy jego użyciu:</p>
    <BlockMath math="
      \left[ \begin{array}{cccc|c}
      -1 &2 &-1 &0 &0.15 \\
      0 &\textcolor{red}{-1} &0 &0 &-4.28 \\
      0 &-1 &2 &-1 &0.60 \\
      0 &0 &0 &1 &0
      \end{array} \right]
      \longrightarrow
      \left[ \begin{array}{cccc|c}
      -1 &2 &-1 &0 &0.15 \\
      0 &\textcolor{red}{-1} &0 &0 &-4.28 \\
      0 &0 &2 &-1 &4.88 \\
      0 &0 &0 &1 &0
      \end{array} \right]
    "/>
    <p>Powtarzając algorytm dla kolumn <InlineMath math="2"/> oraz <InlineMath math="3"/> tak w zasadzie nie modyfikujemy powyższej postaci, co oznacza, że jest ona macierzą trójkątną górną, oraz stanowi ona efekt wykonania etapu pierwszego.</p>
    </div>
  );
}

export default Theory;
