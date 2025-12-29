import { useState } from 'react';
import styles from './solver.module.css';
import { InlineMath } from 'react-katex';
import type { ChartData } from '../../algo/types';
import { Solver as SolverEngine } from '../../algo/Solver';
import { SolutionChartView } from '../ui/chart_views/SolutionChartView';

function Solver() {

  const [n, setn] = useState<number | string>(3);
  const [data, setData] = useState<ChartData>([]);

  console.log(data);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let val: string | number = e.target.value;
    if (val === '' || Number.isNaN(val)) {
      setn(' ');
      return;
    }
    
    val = Number(val);
    if (!Number.isNaN(val)) {
      setn(Number(val));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const num = Number(n);
    if (num < 3 || num > 1000) {

      alert("Liczba elementów skończonych (n) powinna być ze zbioru: \n{3, 4, ..., 1000}.");
      return;
    }
    
    const data: ChartData = SolverEngine.solve(num);
    setData(data);
  };

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
        <form onSubmit={handleSubmit}>
          <div className={styles.highlight}>
            <label htmlFor="elementsCount">Podaj wartość <InlineMath math="n: "/></label>
            <input 
              type="text" 
              id="elementsCount"
              value={n}
              onChange={inputChange}
            />
            <p>(Dla jak najdokładniejszego wykresu powinna ona być podzielna przez 3)</p>
          </div>
        </form>
        <br />
        <SolutionChartView data={data}/>
        <br />
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
          >Rozwiąż
          </button>
        </form>
      </div>
    </div>
  );
}

export default Solver;
