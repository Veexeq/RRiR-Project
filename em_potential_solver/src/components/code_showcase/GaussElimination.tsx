import CodeBlock from "../ui/CodeBlock";
import gaussEliminationSC from './../../algo/gaussElimination?raw'

const LANGUAGE = 'typescript';

function GaussElimination() {
  return (
    <>
      <CodeBlock 
        code={gaussEliminationSC}
        language={LANGUAGE}
      />
    </>
  );
}

export default GaussElimination;
