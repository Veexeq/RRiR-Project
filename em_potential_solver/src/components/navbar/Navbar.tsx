import { Link } from 'react-router-dom';
import styles from './navbar.module.css'

function Navbar() {
  return (
    <div className={styles.wrapper}>
      <Link to="/">Strona główna</Link>
      <Link to="/theory">Teoria</Link>
      <Link to="/solve">Praktyka</Link>
    </div>
  );
}

export default Navbar;
