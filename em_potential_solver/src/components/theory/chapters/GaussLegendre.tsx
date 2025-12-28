import { memo } from "react";
import { BlockMath, InlineMath } from "react-katex";

function GaussLegendre() {

  return (
    <>
      <h3 id="gauss-legendre">Kwadratury Gaussa-Legendre'a</h3>
      <br />
      <p>
        W rozpatrywanym problemie obliczeniowym, aby skonstruować macierz sztywności oraz wektor sił zachodzi
        konieczność policzenia całek, które je definiują. Aby je obliczyć posłużymy się całkowaniem numerycznym przy użyciu
        kwadratur Gaussa-Legendre'a. Jest to rozwiązanie lepsze niż analityczne wyznaczanie całek, ponieważ mamy tutaj do 
        czynienia z funkcją <InlineMath math="\epsilon_r(x)"/>, która jest nieciągła.
      </p>
      <br />
      <p>
        Ideą tej metody jest zamiana całki na sumę ważoną wartości funkcji podcałkowej w specjalnie dobranych punktach, tzw.
        węzłach kwadratury. Wzór prezentuje się następująco:
      </p>
      <BlockMath math="
        \int_{-1}^{1} f(\xi) \, d\xi \approx \sum_{k = 1}^{N} w_k \cdot f(\xi_k)
      "/>
      <p>
        Jak widać, całka jest tutaj liczona po przedziale <InlineMath math="[-1, 1]"/>, więc będziemy musieli dokonać pewnego 
        przekształcenia dziedziny każdego elementu skończonego właśnie na ten przedział. <InlineMath math="N"/> oznacza natomiast
        liczbę punktów kwadratury (nie elementów skończonych), co ma bezpośredni wpływ na dokładność. Treść realizowanego zadania
        informuje, że wystarczy nam <InlineMath math="N = 2"/>, więc to zastosujemy. <InlineMath math="\xi_k"/> to współrzędne
        punktów charakterystycznych dla konkretnego rodzaju kwadratury oraz liczby punktów kwadratury, które, wraz 
        z <InlineMath math="w_k"/>, odczytujemy z tablic. Dla nas będą one wyglądać w następujący sposób:
      </p>
      <BlockMath math="
        w_1 = w_2 = 1, \quad
        \begin{dcases}
          \xi_1 = -\frac{1}{\sqrt{3}} \\[2ex]
          \xi_2 = \frac{1}{\sqrt{3}}
        \end{dcases}
      "/>
      <p>Mając ten ogólny wstęp za sobą, możemy przejść krok po kroku po całkowaniu.</p>
      <br />
      <h4>Transformacja zmiennych dla elementu wzorcowego</h4>
      <br />
      <p>Przypomnijmy nasz podział dziedziny na elementy skończone:</p>
      <BlockMath math="
        \Omega = \bigcup_{i=1}^{n} \, [x_i, \, x_{i+1}] 
        \quad gdzie \quad [x_i, \, x_{i+1}] = \left[ \tfrac{i-1}{n}, \, \tfrac{i}{n} \right]
      "/>
      <p>
        Nasz element skończony jest więc zdefiniowany jako przedział <InlineMath math="[x_i, x_{i+1}]"/> o
        długości <InlineMath math="h"/>. Aby obliczyć całkę na takim elemencie, musimy wpierw dokonać trasformacji
        współrzędnych do układu odniesienia <InlineMath math="\xi"/>. Zrobimy to za pomocą następującego odwzorowania liniowego:
      </p>
      <BlockMath math="
        x(\xi) = \frac{x_{i+1} + x_i}{2} + \frac{x_{i+1} - x_i}{2} \cdot \xi
      "/>
      <p>Sprawdźmy, czy jest ono poprawne:</p>
      <BlockMath math="
        x(-1) = \frac{x_{i+1} + x_i}{2} - \frac{x_{i+1} - x_i}{2} = x_i \\[2ex]
        x(1) = \frac{x_{i+1} + x_i}{2} + \frac{x_{i+1} - x_i}{2} = x_{i+1}
      "/>
      <p>Wszystko się zgadza. Możemy to jeszcze nieco uprościć wyznaczając dwie równoważne formy:</p>
      <BlockMath math="
      \begin{array}{c|c}
        \begin{align*}
          x(\xi) &= \frac{x_{i+1} + x_i}{2} + \frac{x_{i+1} - x_i}{2} \cdot \xi \\[2ex]
          &= x_{mid} + \frac{h}{2} \, \xi \\[2ex]
        \end{align*}
        \qquad & \qquad
        \begin{align*}
          x(\xi) &= \frac{x_{i+1} - x_i + 2x_i}{2} + \frac{x_{i+1} - x_i}{2} \cdot \xi \\[2ex]
          &= x_i + \frac{x_{i+1} - x_i}{2} \cdot (1 + \xi) \\[2ex]
          &= x_i + \frac{h}{2} \cdot (1 + \xi) 
        \end{align*}
      \end{array}
      "/>
      <p>
        Udało nam się sensownie przekształcić dziedzinę elementu skończonego na dziedzinę całki. Wzór <InlineMath math="x=x(\xi)"/>{' '}
        pozwala nam przy użyciu punktu kwadratury <InlineMath math="\xi_k"/> odnaleźć się w dziedzinie <InlineMath math="\Omega"/>, co
        z kolei pozwoli nam m.in. na odzyskanie wartości funkcji <InlineMath math="\epsilon_r(x)"/>.
      </p>
      <br />
      <p>
        Należy pamiętać o tym, że zmiana granic całkowania pociąga za sobą również konieczność przeskalowania różniczki. Obliczmy Jakobian
        przekształcenia: 
      </p>
      <BlockMath math="
        J = \frac{dx}{d\xi} = \frac{d}{d\xi} (x_{mid} + \frac{h}{2} \, \xi) = \frac{h}{2} \\[2ex]
        dx = \frac{h}{2} \, d\xi
      "/>
    </>
  );
}

export default memo(GaussLegendre);
