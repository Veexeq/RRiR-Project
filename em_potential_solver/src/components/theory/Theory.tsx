import { BlockMath, InlineMath } from 'react-katex';
import styles from './theory.module.css'

function Theory() {
  return (
    <div className={styles.wrapper}>
      <h2>Wyprowadzenie sformułowania wariacyjnego</h2>
      <InlineMath math="y=y(t)"/>
      <BlockMath math="\frac{dy}{dt} = -ky"/>
    </div>
  );
}

export default Theory;
