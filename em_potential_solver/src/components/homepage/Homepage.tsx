import { memo } from 'react';
import styles from './homepage.module.css'

function Homepage() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Zadanie obliczeniowe</h1>
          <h2>z przedmiotu <i>Równania różniczkowe i różnicowe</i></h2>
        </div>
        <div className={styles.main}>
          <p>Strona ta stanowi rozwiązanie zadania obliczeniowego z przedmiotu <i>Równania różniczkowe i różnicowe</i>.</p><br />
          <p>Za pomocą paska nawigacyjnego na górze strony można dostać się do konkretnych części projektu, takich jak <b>wyprowadzenie zagadnienia wariacyjnego</b> oraz <b>rozwiązanie problemu</b>.</p><br />
          <p>Realizowany wariant zadania: <b>5. Potencjał elektromagnetyczny</b>, wersja na 50 pkt.</p>
        </div>
      </div>
    </>
  );
}

export default memo(Homepage);
