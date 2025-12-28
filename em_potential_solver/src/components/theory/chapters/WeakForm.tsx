import { BlockMath, InlineMath } from "react-katex";
import styles from './../theory.module.css'
import { memo } from "react";

function WeakForm() {
  return (
    <>
      <h3 id="weak-form">Wyprowadzenie sformułowania wariacyjnego</h3>
      <br />
      <p>
        Sformułowanie wariacyjne (słabe) służy temu, aby zawęzić dziedzinę naszego problemu. Zamiast poszukiwać 
        dowolnej funkcji <InlineMath math="\phi"/> spełniającej nasze równanie w każdym punkcie dziedziny, szukać 
        będziemy takich funkcji, które spełniają równanie "średnio" w całej dziedzinie.
      </p>
      <br />
      <p>
        Aby to osiągnąć, potrzebujemy wprowadzić pewną funkcję testową <InlineMath math="v" />, 
        która jest pewnym odnośnikiem względem którego bada się jak dobrze dane równanie jest spełnione. 
        Choć szczegóły funkcji testowych są dosyć zawiłe i skomplikowane, jej użycie jest proste, 
        opiera się na jednym, prostym założeniu:
      </p>
      <br />
      <div className={styles.highlight}>
        <p>
          Wartość funkcji testowej <InlineMath math="v"/> w punktach, gdzie znamy wartość naszej 
          poszukiwanej funkcji, jest równa zero.
        </p>
      </div>
      <br />
      <p>
        Dzieje się tak, ponieważ nie testujemy funkcji w miejscach, gdzie znamy jej zachowanie. 
        W takich miejscach błąd jest zawsze zerowy.
      </p>
      <br />
      <p>
        Uzbrojeni w wiedzę o funkcjach testowych, możemy zacząć wyprowadzać sformułowanie wariacyjne. 
        Przypomnijmy sobie nasze równanie, przemnóżmy je obustronnie przez <InlineMath math="-1"/>:
      </p>
      <BlockMath math="
        \begin{gather*}
          \phi''(x) = -\frac{\rho}{\epsilon_r(x)} \\
          -\phi''(x) = \frac{\rho}{\epsilon_r(x)}
        \end{gather*}
      "/>
      <p>
        Teraz pomnóżmy obustronnie to równanie poprzez <InlineMath math="v"/> a następnie scałkujmy 
        po całej dziedzinie <InlineMath math="\Omega=[1,3]"/>:
      </p>
      <BlockMath math="
        \int_{0}^{3} -\phi''v\, dx = \int_{0}^{3} \frac{\rho}{\epsilon_r} v \, dx
      "/>
      <p>Zajmijmy się na razie lewą stroną, przeprowadźmy całkowanie przez części:</p>
      <BlockMath math="
        \int_{0}^{3} -\phi''v\, dx =  
        \left| \begin{array}{l l} 
          f = v & f' = v' \\ 
          g' = -\phi'' & g = -\phi' 
        \end{array} \right| 
        = \int_{0}^{3} \phi'v'\, dx - \left[ \phi' v \right]_0^3
      "/>
      <p>Rozwińmy teraz człon brzegowy:</p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx - \left[ \phi' v \right]_0^3 = 
        \int_{0}^{3} \phi'v'\, dx - [\phi'(3) v(3) - \phi'(0) v(0)]
      "/>
      <p>
        Teraz skorzystamy z wyżej wyszczególnionej własności funkcji testowych oraz 
        warunku brzegowego Robina:
      </p>
      <BlockMath math="
        \begin{cases}
          \phi(3) = 2 \Rightarrow v(3) = 0 \\
          \phi'(0) + \phi(0) = 5 \Rightarrow \phi'(0) = 5 - \phi(0)
        \end{cases}
      "/>
      <p>Dzięki temu nasza lewa strona równania upraszcza się do następującej postaci:</p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx + 5v(0) - v(0)\phi(0)
      "/>
      <p>
        Teraz wstawiamy ją do naszego pierwotnego równania, porządkujemy składniki przenosząc człon 
        zależny wyłącznie od <InlineMath math="v" /> na prawą stronę:
      </p>
      <BlockMath math="
        \int_{0}^{3} \phi'v'\, dx - v(0)\phi(0) = 
        \int_{0}^{3} \frac{\rho}{\epsilon_r} v \, dx - 5v(0)
      "/>
      <p id="shift">
        Kolejnym krokiem jest wprowadzenie podstawienia, o którym mówiliśmy analizując niezerowy 
        warunek brzegowy Dirichleta. Zmodyfikuje on wyłącznie lewą stroną, będącą formą dwuliniową 
        zależną od <InlineMath math="\phi"/> oraz <InlineMath math="v"/>:
      </p>
      <BlockMath math="
        \begin{gather*}
          \phi(x) = w(x)+\frac{2}{3}x, \ \phi'(x) = w'(x) + \frac{2}{3} \\
          \int_{0}^{3} (w' + \frac{2}{3})v' \, dx - v(0)[w(0) + \frac{2}{3} \cdot 0] = 
          \int_{0}^{3} w'v' \, dx - v(0)w(0) + \frac{2}{3} \int_{0}^{3} v' \, dx
        \end{gather*}
      "/>
      <p>Obliczmy ostatnią całkę pamiętając o uwadze dotyczącej funkcji testujących:</p>
      <BlockMath math="
        \int_{0}^{3} v' \, dx = \left[ v \right]_{0}^{3} = v(3) - v(0) = -v(0)
      "/>
      <p>Wstawiamy wszystko do głównego równania, co kończy wyprowadzenie sformułowania wariacyjnego.</p>
      <p>Oto podsumowanie:</p>
      <br />
      <div className={styles.highlight}>
        <BlockMath math="
          \begin{gather}
            \int_{0}^{3} w'v' \, dx - v(0)w(0) = 
            \int_{0}^{3} \frac{\rho} {\epsilon_r} v \, dx - \frac{13}{3} v(0) \\
            w(3) = 0
          \end{gather}
        "/>
        <p>
          (1) sformułowanie wariacyjne, poszukujemy funkcji <InlineMath math="w"/><br />
          (2) nowy, zerowy warunek brzegowy Dirichleta
        </p>
      </div>
      <br />
      <p>
        <b>Uwaga</b>: warunek brzegowy Robina "wbudowany" jest w sformułowanie 
        wariacyjne, nie wymuszamy go w osobnym równaniu.
      </p>
      <br />
    </>
  );
}

export default memo(WeakForm);
