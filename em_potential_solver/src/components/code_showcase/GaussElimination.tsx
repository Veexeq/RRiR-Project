import CodeBlock from "../ui/CodeBlock";
import code from './../../algo/gaussElimination?raw'

function GaussElimination() {
  return (
    <>
      <CodeBlock 
        code={code}
        language="TypeScript"
      />
    </>
  );
}

export default GaussElimination;
