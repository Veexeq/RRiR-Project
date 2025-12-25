import { memo } from 'react';
import styles from './footer.module.css'

function Footer() {

  const topScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const container = document.querySelector(".mainContent");

    if (!container) {
      return;
    } 

    container.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Wiktor Trybus, 2025/26</div>
      <div className={styles.text}><a href="#" onClick={topScroll}>Na górę strony</a></div>
      <div className={styles.text}>RRiR, Grupa 7</div>
    </div>
  );
}

export default memo(Footer);
