import styles from './divider.module.css';

function Divider() {
  
  return (
    <>
      <br /><br />
      <div className={styles.divider}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <br />
    </>
  );
}

export default Divider;
