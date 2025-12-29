import { memo } from 'react';
import styles from './solver.module.css';
import { InlineMath } from 'react-katex';
import HatFunctionsChart from '../ui/legacy_hat_function_chart/HatFunctionsChart';

function Solver() {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Solver MES</h1>
        <h3>
          równania różniczkowego{' '}
          <InlineMath math="\frac{d^2\phi}{dx^2} = -\frac{\rho}{\epsilon_r}"/>
        </h3>
      </div>
      <div className={styles.main}>
        <form>
          <div className={styles.highlight}>
            <label htmlFor="elementsCount">Podaj wartość <InlineMath math="n: "/></label>
            <input 
              type="number" 
              id="elementsCount"
              min={3}
              max={100}
            />
          </div>
        </form>
        <HatFunctionsChart />
        <button>Rozwiąż</button>
      </div>
    </div>
  );
}

export default memo(Solver);
