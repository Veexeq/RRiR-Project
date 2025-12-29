import GaussElimination from './GaussElimination';
import GaussLegendre from './GaussLegendre';
import styles from './showcasepage.module.css';
import Solver from './Solver';

function ShowcasePage() {
  return (
    <div className={styles.wrapper}>
      <GaussElimination />
      <GaussLegendre />
      <Solver />
    </div>
  );
}

export default ShowcasePage;
