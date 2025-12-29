/* eslint-disable  @typescript-eslint/no-explicit-any */

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ddd',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif'
      }}>
        {/* Nagłówek dymka (np. wartość X) */}
        <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#333' }}>
          x = {Number(label).toFixed(4)}
        </p>
        
        {/* Lista wartości Y */}
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: entry.color }} />
            <span style={{ fontSize: '0.9rem', color: '#555' }}>
              {entry.name}: <strong>{Number(entry.value).toFixed(4)}</strong>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};