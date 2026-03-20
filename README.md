# MES Solver - Potencjał Elektromagnetyczny ⚡

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73C9D?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status: Deployed](https://img.shields.io/badge/Status-Deployed-success?style=for-the-badge)](https://twoja-nazwa-uzytkownika.github.io/nazwa-repozytorium/)

Interaktywny system obliczeniowy wykorzystujący **Metodę Elementów Skończonych (MES)** do rozwiązywania równań różniczkowych drugiego rzędu. Projekt został zrealizowany w ramach przedmiotu *Równania Różniczkowe i Różnicowe* na Wydziale Informatyki **AGH**.

## 🎯 Cel projektu

Głównym celem aplikacji jest wyznaczenie rozkładu potencjału elektromagnetycznego w zadanym obszarze przy użyciu sformułowania wariacyjnego (słabego). Zgodnie z wymaganiami projektowymi, **cała logika obliczeniowa została zaimplementowana bez użycia zewnętrznych bibliotek matematycznych** (takich jak NumPy czy SciPy), co wymagało ręcznego stworzenia solwerów macierzowych i algorytmów całkowania.

### Realizowany wariant: Nr 5
Zgodnie z algorytmem wyboru (litera nazwiska), projekt rozwiązuje zagadnienie **potencjału elektromagnetycznego**:
- **Równanie:** $\frac{d^{2}\phi}{dx^{2}} = -\frac{\rho}{\epsilon_{r}}$
- **Warunki brzegowe:** 
  - $\phi'(0) + \phi(0) = 5$ (Warunek Robina)
  - $\phi(3) = 2$ (Warunek Dirichleta)
- **Parametry:** $\rho = 1$, a $\epsilon_r$ jest funkcją przedziałami stałą na odcinku $[0, 3]$.

---

## 🏗️ Implementacja techniczna

Aplikacja została podzielona na moduły odzwierciedlające etapy rozwiązywania problemu inżynierskiego:

### 1. Sformułowanie wariacyjne
W sekcji "Teoria" znajduje się pełne wyprowadzenie matematyczne formy dwuliniowej $B(u, v)$ oraz funkcjonału liniowego $L(v)$, uzyskane poprzez całkowanie przez części i uwzględnienie warunków brzegowych.

### 2. Silnik obliczeniowy (Core)
- **Generowanie układu równań:** Automatyczne tworzenie macierzy sztywności i wektora obciążeń dla dowolnej liczby elementów $n$.
- **Całkowanie numeryczne:** Wykorzystanie **kwadratur Gaussa-Legendre'a** ($N=2$) do precyzyjnego obliczania całek wewnątrz elementów.
- **Solver macierzowy:** Własna implementacja **algorytmu eliminacji Gaussa**, służąca do rozwiązywania układu równań liniowych $Ax = b$.

### 3. Frontend i Wizualizacja
- **React & TypeScript:** Zapewnienie pełnej kontroli nad typami danych i reaktywnością interfejsu.
- **Recharts:** Generowanie interaktywnych wykresów funkcji $\phi(x)$.
- **KaTeX:** Renderowanie złożonych wzorów matematycznych w formacie LaTeX dla zwiększenia czytelności dokumentacji teoretycznej.

---

## 🚀 Instalacja i uruchomienie

Aplikacja jest dostępna w wersji online przez GitHub Pages (link w opisie repozytorium). Aby uruchomić ją lokalnie:

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Veexeq/RRiR-Project
   ```
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```

---

## 👤 Autor

**Wiktor Trybus**  
*Informatyka* na *WI AGH*  
*Projekt zrealizowany w roku akademickim 2025/2026.*