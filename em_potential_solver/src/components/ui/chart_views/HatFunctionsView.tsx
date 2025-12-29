import { HatFunctionsChart } from './../chart/HatFunctionsChart';

const data = [
  { x: 0, y0: 1, y1: 0, y2: 0, y3: 0 },
  { x: 1, y0: 0, y1: 1, y2: 0, y3: 0 },
  { x: 2, y0: 0, y1: 0, y2: 1, y3: 0 },
  { x: 3, y0: 0, y1: 0, y2: 0, y3: 1 },
];

const functionKeys = ['y0', 'y1', 'y2', 'y3'];

export const HatFunctionsView = () => {
  return (
    <>
      <br />
      <div style={{ width: '100%', maxWidth: '1080px', margin: '0 auto' }}>
        <HatFunctionsChart 
          data={data} 
          functionNames={functionKeys} 
        />
      </div>
      <br />
    </>
  );
};
