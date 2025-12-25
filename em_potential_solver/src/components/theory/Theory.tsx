import { memo } from 'react';
import BoundaryConditions from './chapters/BoundaryConditions';
import Discrete from './chapters/Discrete';
import GaussElimination from './chapters/GaussElimination';
import Intro from './chapters/Intro';
import WeakForm from './chapters/WeakForm';
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
      <Intro />
      <BoundaryConditions />
      <WeakForm />
      <Discrete />
      <GaussElimination />
    </div>
  );
}

export default memo(Theory);
