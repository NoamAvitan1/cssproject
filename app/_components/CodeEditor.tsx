'use client'
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

type Props = {};

const limit = 1500

export const CodeEditor: React.FC<Props> = (props) => {


  const [lines, setLines] = useState<Array<string>>(['// your code here'])
  const [currentLine, setCurrentLine] = useState<number>(0)

  const linesRef = useRef<Array<HTMLSpanElement>>([])
  
  const moveCursor = (el: HTMLElement, charIndex: number = 5) => {
    if (!el) return
    const range = document.createRange()
    const selection = window.getSelection()
    
    range.setStart(el.firstChild!, charIndex)
    range.collapse(true)
    
    selection!.removeAllRanges()
    selection!.addRange(range)
  }

    // const updateLinesCount = () => {
    //     if(editorRef.current) {
    //         const lineHeight = parseFloat(window.getComputedStyle(editorRef.current).lineHeight);
    //         const elementHeight = editorRef.current.clientHeight;
    //         const newLinesCount = Math.round(elementHeight / lineHeight);
    //         console.log(lineHeight, elementHeight)
    //         setLinesCount(newLinesCount);
    //     }
    // }

    const handleInput = (e: any) => {
      const data = e.nativeEvent.data
      // if (editorRef?.current?.innerText) {
      //   const len = editorRef.current.innerText.length
      //   // setCode(editorRef.current.innerText)
      //   if(editorRef.current.innerText.length > limit) {
      //     const trimmedCode = editorRef.current.innerText.substring(0, limit)
      //     editorRef.current.innerText = trimmedCode
      //     // setCode(trimmedCode)
      //   }
      //   // if (data == '{') editorRef.current.innerText += '}'
      //   // else if (data == '[') editorRef.current.innerText += ']'
      //   // else if (data == '(') editorRef.current.innerText += ')'
      //   // editorRef.current.setSelectionRange(len, len)
      //   const range = document.createRange();
      //   const selection = window.getSelection();
      //   // range.selectNodeContents(editorRef.current);
      //   range.collapse(false);  // Set to the end of the content
      //   selection!.removeAllRanges();
      //   selection!.addRange(range);
      // }
      // // updateLinesCount()
    }

    useEffect(() => {
      moveCursor(linesRef.current[currentLine], currentLine)
    }, [currentLine])

  return (
    <div>
      {/* <button onClick={moveCursor}>CLICKME</button> */}
      <article className="border border-aura rounded p-2 w-[600px] bg-neutral-900 min-h-[80vh] overflow-auto flex">
        {/* <ul className="flex flex-col text-slate-500 text-right">
          <li className="h-0 overflow-hidden">123</li>
            {Array(linesCount).fill(null).map((_, i) => (
                <span>{i}</span>
            ))}
        </ul> */}
        <div className="w-[1px] bg-slate-500 mx-2"></div>
        {lines.map((line, i) => (
            <span id="editor" ref={el => linesRef.current[i] = el!}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            className="whitespace-pre h-min focus:outline-none w-full">
                your code here...
            </span>
        ))}
      </article>
    </div>
  );
};
