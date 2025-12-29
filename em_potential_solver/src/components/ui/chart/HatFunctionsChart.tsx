import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { axisStyle, chartMargins, gridColor } from './config/chartConfig'; // nasze stałe
import { CustomTooltip } from './config/CustomTooltip';
import styles from './config/ChartLayout.module.css';

interface HatData {
  x: number;
  [key: string]: number;
}

interface HatChartProps {
  data: HatData[];
  functionNames: string[];
}

const LINE_COLORS = ['#d32f2f', '#1976d2', '#388e3c', '#f57c00', '#7b1fa2'];

export const HatFunctionsChart = ({ data, functionNames }: HatChartProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.baseWrapper} ${styles.fixedRatio}`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={chartMargins}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            
            <XAxis 
              dataKey="x" 
              type="number" 
              tick={axisStyle} 
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              tick={axisStyle} 
              width={40}
            />
            
            <Tooltip content={<CustomTooltip />} />

            {/* Generujemy linie dynamicznie */}
            {functionNames.map((key, index) => (
              <Line
                key={key}
                type="linear"
                dataKey={key}
                name={`e${index}`}
                stroke={LINE_COLORS[index % LINE_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3, fill: LINE_COLORS[index % LINE_COLORS.length] }}
                activeDot={{ r: 6 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
