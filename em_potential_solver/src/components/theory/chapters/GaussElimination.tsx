import { memo } from "react";
import { BlockMath, InlineMath } from "react-katex";

function GaussElimination() {
  return (
    <>
      <h3>Metoda eliminacji Gaussa</h3>
      <br />
      <p>
        Ta sekcja poświęcona jest omówieniu implementacji metody eliminacji Gaussa, 
        której użyjemy, aby rozwiązać nasze wyprowadzone wyżej równanie 
        macierzowe: <InlineMath math="\mathbf{K_G} \cdot \mathbf{w} = \mathbf{F_G}"/>
      </p>
      <br />
      <p>
        Algorytm składa się z dwóch etapów. Pierwszym z nich jest doprowadzenie macierzy 
        sztywności do macierzy trójkątnej górnej. Spójrzmy na nasz aktualny układ równań:
      </p>
      <BlockMath math="
        \left[ \begin{array}{cccc|c}
          0 &-1 &0 &0 &-4.28 \\
          -1 &2 &-1 &0 &0.15 \\
          0 &-1 &2 &-1 &0.60 \\
          0 &0 &0 &1 &0
        \end{array} \right]
      "/>
      <p>
        Zajmować się będziemy kolejno kolumnami. Dla każdej kolumny musimy znaleźć tzw. pivot, 
        który posiada największą wartość bezwględną w danej kolumnie. W 
        kolumnie <InlineMath math="0"/> będzie to <InlineMath math="-1"/>. Mając pivot, zamieniamy wiersze 
        w taki sposób, aby wylądował on na przekątnej głównej macierzy sztywności, a następnie 
        zerujemy tym pivotem wszystkie poniższe elementy w aktualnej kolumnie:
      </p>
      <BlockMath math="
        \left[ \begin{array}{cccc|c}
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
      <p>
        Teraz przechodzimy do kolumny <InlineMath math="1"/>. Ponownie, znajdujemy pivot 
        (który jest w tym przypadku już wybrany) a następnie zerujemy poniższe kolumny przy jego użyciu:
      </p>
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
      <p>
        Powtarzając algorytm dla kolumn <InlineMath math="2"/> oraz <InlineMath math="3"/> tak w zasadzie nie 
        modyfikujemy powyższej postaci, co oznacza, że jest ona macierzą trójkątną górną, oraz stanowi ona efekt 
        wykonania etapu pierwszego.
      </p>
      <br />
      <p>
        Etap drugi polega na obliczeniu wartości <InlineMath math="w_i"/> poprzez rozwiązywanie równań
        zaczynając od ostatniego. Idea algorytmu polega na tym, aby zapisywać w wektorze wartości, które
        już znamy, co wystarczy do obliczenia kolejnej wartości. Najłatwiej zrobić to na przykładzie, lecz żeby
        nie rozpisywać się przesadnie, zobaczmy tylko ostatni krok, czyli wyliczanie <InlineMath math="w_1"/>: 
      </p>
      <BlockMath math="
        w = 
        \begin{bmatrix}
          0 &4.28 &2.88 &0
        \end{bmatrix}, \quad
        \left[ \begin{array}{cccc|c}
          -1 &2 &-1 &0 &0.15 \\
          0 &-1 &0 &0 &-4.28 \\
          0 &0 &2 &-1 &4.88 \\
          0 &0 &0 &1 &0
        \end{array} \right]
      "/>
      <p>
        Zauważmy, że wektor trzymający rozwiązania układu równań aktualnie trzyma jeszcze <InlineMath math="0"/> w
        miejscu <InlineMath math="w_1"/>, a wszystkie jego inne elementy są już wyliczone. Aby obliczyć wartość
        pierwszego elementu wektora możemy wpierw odjąć obustronnie wszystko, co jej towarzyszy po lewej stronie równania.
        Wartość tego obliczymy mnożąc odpowiednio już wyliczone wartości przez współczynniki im odpowiadające. Następnie
        podzielimy obustronnie przez współczynnik stojący przy pierwszym elemencie:
      </p>
      <BlockMath math="
        w_1 = (0.15 - (2w_2 + (-1)w_3 + 0w_0)) \ \div (-1)
      "/>
      <p>
        To omówienie stanowi intuicję jak zalgorytmizować rozwiązywanie układów równań w podstawowy sposób, teraz wystarczy
        już tylko przenieść to na konkretny kod:
      </p>
    </>
  );
}

export default memo(GaussElimination);
