import { memo } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { Link } from "react-router-dom";

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
      <p>
        W naszym sformułowaniu wariacyjnym pojawiają się pochodne funkcji bazowych <InlineMath math="e_i"/>, czyli <InlineMath math="\frac{de_i}{dx}"/>.
        Je również musimy przekształcić na funkcje uzależnione od dziedziny <InlineMath math="\xi"/>:
      </p>
      <BlockMath math="
        \frac{de_i}{dx} = \frac{de_i}{d\xi} \frac{d\xi}{dx} = \frac{2}{h} \frac{de_i}{d\xi}
      "/>
      <p>Na przedziale <InlineMath math="[-1, 1]"/> nasze daszkowe funkcje bazowe mają następującą postać:</p>
      <BlockMath math="
        \begin{dcases}
          e_1(\xi) = \frac{1-\xi}{2} \\[2ex]
          e_2(\xi) = \frac{1 + \xi}{2}
        \end{dcases}
      "/>
      <br />
      <h4>Transformacja elementów macierzy sztywności i wektora sił</h4>
      <br />
      <p>Możemy teraz dokonać przekształcenia <InlineMath math="i"/>-tego elementu skończonego, danego wzorem:</p>
      <BlockMath math="
        {\Large \forall}_{i \, \in \, \{1, \, ...,  \, n\}} \ \mathbf{K^i} = 
        \begin{bmatrix}
          \mathbf{B_{(i-1)(i-1)}} & \mathbf{B_{(i-1)i}} \\
          \mathbf{B_{i(i-1)}} & \mathbf{B_{ii}}
        \end{bmatrix} 
        \ , \quad gdzie \quad
        \mathbf{B_{pq}} = \int_{x_{i-1}}^{x_i} \frac{de_p}{dx} \frac{de_q}{dx} \, dx
      "/>
      <p>Na poniższy:</p>
      <BlockMath math="
        \mathbf{B_{ij}} = 
        \int_{-1}^{1} \left( \frac{2}{h} \frac{de_1}{d\xi} \right) \left( \frac{2}{h} \frac{de_2}{d\xi} \right) \frac{h}{2} \, d\xi =
        \sum_{i=1}^{2} \left( \frac{2}{h} w_i \frac{de_1(\xi_i)}{d\xi} \frac{de_2(\xi_i)}{d\xi} \right) =
        \frac{2}{h} \sum_{i=1}^{2} \left( \frac{de_1(\xi_i)}{d\xi} \frac{de_2(\xi_i)}{d\xi} \right)
      "/>
      <p>Analogicznie czynimy przekształcając lokalny wektor sił, który wygląda w następujący sposób:</p>
      <BlockMath math="
        {\Large \forall}_{i \, \in \, \{1, \, ...,  \, n\}} \ \mathbf{F^i} = 
        \begin{bmatrix}
          \mathbf{L_{i-1}} \\
          \mathbf{L_{i}}
        \end{bmatrix} 
        \ , \quad gdzie \quad
        \mathbf{L_p} = \int_{x_{i-1}}^{x_{i}} \frac{\rho(x)}{\epsilon_r(x)} e_p(x) \, dx
      "/>
      <p>Na poniższy wektor sił, w nowym układzie odniesienia:</p>
      <BlockMath math="
      \begin{dcases}
        p \ mod \ 2 = 0 \ \Rightarrow \ \mathbf{L_p} = 
          \int_{-1}^{1} \left[ \frac{\rho(x(\xi))}{\epsilon_r(x(\xi))} e_1(\xi) \right] \frac{h}{2} \, d\xi =
          \frac{h}{2} \sum_{i=1}^{2} \frac{\rho(x(\xi))}{\epsilon_r(x(\xi))}e_1(\xi) \\[2ex]
        p \ mod \ 2 = 1 \ \Rightarrow \ \mathbf{L_p} = 
          \int_{-1}^{1} \left[ \frac{\rho(x(\xi))}{\epsilon_r(x(\xi))} e_2(\xi) \right] \frac{h}{2} \, d\xi =
          \frac{h}{2} \sum_{i=1}^{2} \frac{\rho(x(\xi))}{\epsilon_r(x(\xi))}e_2(\xi)
      \end{dcases}
      "/>
      <p>
        Udało nam się przygotować do całkowania numerycznego dla każdego elementu skończonego, a więc wyprowadzić wzory
        na <InlineMath math="\mathbf{B_{pq}}"/> oraz <InlineMath math="\mathbf{L_{p}}"/>. Teraz wystarczy to złożyć w globalną
        macierz i wektor sił, a następnie zalgorytmizować. Kod realizujący całkowanie numeryczne znajduje się w zakładce{' '}
        <Link to="/code">algorytmy</Link>.
      </p>
    </>
  );
}

export default memo(GaussLegendre);
