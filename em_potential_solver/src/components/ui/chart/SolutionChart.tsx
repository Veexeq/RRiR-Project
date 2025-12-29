import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { axisStyle, chartMargins, gridColor } from './config/chartConfig';
import { CustomTooltip } from './config/CustomTooltip';
import styles from './config/ChartLayout.module.css';

interface Point {
  x: number;
  y: number;
}

export const SolutionChart = ({ data }: { data: Point[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={chartMargins}>
            
            <defs>
              <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            
            <XAxis 
              dataKey="x" 
              type="number" 
              tick={axisStyle} 
              domain={['auto', 'auto']}
              label={{ value: 'x', position: 'insideBottomRight', offset: -5, fill: '#666' }}
            />
            <YAxis 
              tick={axisStyle} 
              width={40}
              // Opcjonalnie: label={{ value: 'u(x)', angle: -90, position: 'insideLeft' }}
            />
            
            <Tooltip content={<CustomTooltip />} />

            <Area 
              type="monotone" // Lub "linear", wtedy ostre kąty
              dataKey="y" 
              stroke="#8884d8" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorY)" // Użycie gradientu
              dot={false} // Wyłączamy kropki, bo przy 1000 punktach zamażą wykres
              activeDot={{ r: 6 }} // Kropka tylko po najechaniu myszką
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
