import GaussElimination from './GaussElimination';
import GaussLegendre from './GaussLegendre';
import styles from './showcasepage.module.css';

function ShowcasePage() {
  return (
    <div className={styles.wrapper}>
      <GaussElimination />
      <GaussLegendre />
    </div>
  );
}

export default ShowcasePage;
