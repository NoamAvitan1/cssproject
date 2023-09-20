'use client'

import { useEffect, useRef, useState } from "react";

type Props = {
// config: {

// }
};

export const CodeEditor: React.FC<Props> = (props) => {

    const [code, setCode] = useState<Array<string>>(['// your code here'])
    const [currentRow, setCurrentRow] = useState<number>(0)

    const pRef = useRef<HTMLParagraphElement | null>(null)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter') {
            e.preventDefault()
            setCode(prev => [...prev, ''])
        } else if (e.key == 'Backspace') {
            if (code.length > 1 && code[currentRow].length === 0)
                console.log(code[currentRow])
                setCode(prev => prev.filter((_, i) => i !== currentRow))
        }
    }

    useEffect(() => {
        if(pRef.current)
            pRef.current.focus()
    }, [code])

  return (
    <div>
        <article onKeyDown={handleKeyDown} className="border border-aura rounded p-2 min-w-[600px]">
            {code.map((row, i) => (
                <span className="w-full flex items-center">
                    <p className="px-1 pr-2">{i}</p>
                    <p contentEditable
                        onFocus={() => setCurrentRow(i)}
                        autoFocus={i == code.length - 1}
                        ref={pRef}
                        className="focus:outline-none focus:bg-aura grow pl-1">{row}</p>
                </span>
            ))}
        </article>
    </div>
  );
};
