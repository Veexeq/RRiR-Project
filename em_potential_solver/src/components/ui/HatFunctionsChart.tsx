import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from './hatfunctionchart.module.css';
import { memo } from 'react';

interface I_xVals {
  x: number,
  y0: number,
  y1: number,
  y2: number,
  y3: number,
};

function HatFunctionsChart() {
  
  const data: I_xVals[] = [
    { x: 0, y0: 1, y1: 0, y2: 0, y3: 0 },
    { x: 1, y0: 0, y1: 1, y2: 0, y3: 0 },
    { x: 2, y0: 0, y1: 0, y2: 1, y3: 0 },
    { x: 3, y0: 0, y1: 0, y2: 0, y3: 1 },
  ];

  /**
   * Colors:
   * Background: #FFFFFF
   * Outline: #2D232E or #534B52
   */
  
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#534B52" />

          <XAxis 
            dataKey="x"
            type="number"
            domain={[0, 3]}
            tickCount={4}
            stroke="#534B52"
            padding={{ left: 20, right: 20 }}
          />

          <YAxis 
            domain={[0.0, 1.25]}
            padding={{ top: 0, bottom: 0 }}
            stroke="#534B52"
            ticks={[0, 0.25, 0.5, 0.75, 1.0, 1.25]}
          />

          <Tooltip
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '8px', 
              border: '1px solid #E0DDCF',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }} 
          />

          {/* e_0 - Red */}
          <Line 
            type="linear" 
            dataKey="y0" 
            stroke="#d32f2f" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }}
            name="e₀(x)"
          />

          {/* e_1 - Blue */}
          <Line 
            type="linear" 
            dataKey="y1" 
            stroke="#1976d2" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            name="e₁(x)"
          />

          {/* e_2 - Green */}
          <Line 
            type="linear" 
            dataKey="y2" 
            stroke="#388e3c" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            name="e₂(x)"
          />

           {/* e_3 - Orange */}
           <Line 
            type="linear" 
            dataKey="y3" 
            stroke="#f57c00" 
            strokeWidth={3} 
            dot={{ r: 4 }}
            name="e₃(x)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(HatFunctionsChart);
