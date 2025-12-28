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
      
    </>
  );
}

export default memo(GaussLegendre);
