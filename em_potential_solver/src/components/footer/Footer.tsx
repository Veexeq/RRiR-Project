import styles from './footer.module.css'

function Footer() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Wiktor Trybus</div>
      <div className={styles.text}>2025/26</div>
      <div className={styles.text}>Grupa 7</div>
    </div>
  );
}

export default Footer;
