import GaussElimination from './GaussElimination';
import styles from './showcasepage.module.css';

function ShowcasePage() {
  return (
    <div className={styles.wrapper}>
      <GaussElimination />
    </div>
  );
}

export default ShowcasePage;
