import Divider from '../ui/Divider';
import GaussElimination from './GaussElimination';
import GaussLegendre from './GaussLegendre';
import styles from './showcasepage.module.css';
import Solver from './Solver';
import Types from './Types';

function ShowcasePage() {

  return (
    <div className={styles.wrapper}>
      <GaussElimination />
      <GaussLegendre />
      <Solver />
      <Divider />
      <Types />
    </div>
  );
}

export default ShowcasePage;
