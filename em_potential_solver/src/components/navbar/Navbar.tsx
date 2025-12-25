import { Link } from 'react-router-dom';
import styles from './navbar.module.css'
import { memo } from 'react';

function Navbar() {
  return (
    <div className={styles.wrapper}>
      <Link to="/">Strona główna</Link>
      <Link to="/theory">Teoria</Link>
      <Link to="/code">Algorytmy</Link>
      <Link to="/solve">Solver</Link>
    </div>
  );
}

export default memo(Navbar);
