import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { axisStyle, chartMargins, gridColor } from './../chart/config/chartConfig'; 
import { CustomTooltip } from './../chart/config/CustomTooltip';
import styles from './../chart/config/ChartLayout.module.css';
import type { ChartData } from '../../../algo/types';

interface SolutionChartProps {
  data: ChartData;
}

export const SolutionChartView = ({ data }: SolutionChartProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartMargins}>
            
            {/* Definicja gradientu - efekt "premium" pod wykresem */}
            {/* <defs>
              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs> */}

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            
            <XAxis 
              dataKey="x" 
              type="number" 
              tick={axisStyle}
              // 'auto' sprawi, że oś dopasuje się do zakresu x (np. 0 do 3)
              domain={['dataMin', 'dataMax']} 
            />
            
            <YAxis 
              tick={axisStyle} 
              width={40} // Rezerwacja miejsca na liczby
              // Jeśli chcesz, by oś Y startowała od 0, daj [0, 'auto']
              // Jeśli wartości mogą być ujemne, daj ['auto', 'auto']
              domain={['auto', 'auto']} 
            />

            <Tooltip content={<CustomTooltip />} />

            <Area 
              type="monotone" // 'monotone' wygładza linię, 'linear' robi ostrą
              dataKey="val"   // <--- TU WPINAMY TWOJE POLA Z INTERFEJSU
              name="y(x)"     // Nazwa wyświetlana w tooltipie
              stroke="#8884d8" 
              fill="url(#colorVal)" 
              strokeWidth={3}
              dot={false}     // Wyłączamy kropki, bo przy gęstych danych (MES) zamazują obraz
              activeDot={{ r: 6 }} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
