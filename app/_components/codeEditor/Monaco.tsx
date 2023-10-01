'use client'
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor'
import { PrettierButton } from './PrettierButton';

type Props = {
  initialValue?: string
  h?: string
  w?: string
  limit?: number
  lang?: 'html' | 'css'
  theme?: string
  lineNumbers?: boolean
  minimap?: boolean
  paddingTop?: number
  handleChange?: (code: string) => void
};

export const Monaco = (props: Props) => {
  const Editor = dynamic(
    () => import('@monaco-editor/react').then(module => module.Editor),
    { ssr: false }
  )

  const [code, setCode] = useState(props.initialValue ?? '/* your code here */')
  
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor
  }

  const handleChange = (value: string | undefined) => {
    if (!value) return
    setCode(value)
    if (props.handleChange) props.handleChange(value)
  }

  useEffect(() => {
    const editor = editorRef.current
    if (editor && code && code.length > (props.limit ?? 3000)) {
      editor.setValue(code.substring(0, (props.limit ?? 3000)))
      const totalLines = editor.getModel().getLineCount()
      const lastLineLength = editor.getModel().getLineMaxColumn(totalLines)
      const selection = {
        selectionStartLineNumber: totalLines,
        selectionStartColumn: lastLineLength,
        positionLineNumber: totalLines,
        positionColumn: lastLineLength
      }
      editor.setSelection(selection)
    }
  }, [code])

  return (
    <div style={{
      height: props.h ?? "600px",
      width: props.w ?? "600px"
    }}>
      <PrettierButton instance={editorRef.current} code={code} />
      <Editor
      theme={props.theme ?? 'vs-dark'}
      language={props.lang ?? 'css'}
      value={code}
      height={'100%'}
      width={'100%'}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      options={
        {
          scrollBeyondLastLine: false,
          lineNumbers: props.lineNumbers ? 'on' : 'off',
          minimap: {
            enabled: props.minimap ?? false
          },
          padding: {
            top: props.paddingTop ?? 10
          }
        }
      }
      />
    </div>
  );
};
