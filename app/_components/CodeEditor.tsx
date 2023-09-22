'use client'

import React, { useRef, useState } from "react";

type Props = {
// config: {

// }
};

export const CodeEditor: React.FC<Props> = (props) => {

    const [codeLines, setCodeLines] = useState<Array<string>>(['// your code here'])
    const refs = useRef<Array<HTMLSpanElement | null>>([])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>, index: number) => {
        if (e.key == 'Backspace') {
            if (codeLines[index] === '') {
                setCodeLines(prev => prev.filter((_, i) => i !== index))
            }
        }
    }

    const handleInput = (e: React.BaseSyntheticEvent, index:number) => {
        const value = e.target.innerHTML
        setCodeLines(prev => prev.map((_, i) => i === index ? value : _))
    }

  return (
    <div>
        <article className="border border-aura rounded p-2 w-[600px] min-h-[80vh] overflow-auto">
            {codeLines.map((code, i) => (
                <span
                ref={el => refs.current[i] = el}
                contentEditable
                suppressContentEditableWarning
                onInput={e => handleInput(e, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                className="w-full whitespace-pre focus:outline-none focus:bg-aura">{code}</span>
            ))}
        </article>
    </div>
  );
};
