'use client'
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { PrettierButton } from './PrettierButton';
import { useSetEditorSelection } from '@/app/_hooks/useSetEditorSelection';

// dynamic imports
const Editor = dynamic(() => import('@monaco-editor/react').then(module => module.Editor), { ssr: false });

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

  // let Editor: any = null

  const [code, setCode] = useState(props.initialValue ?? '/* your code here */')
  const [isMounted, setIsMounted] = useState(false)
  
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    setIsMounted(true)
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
      useSetEditorSelection(editor)
    }
  }, [code])

  return (
    <div style={{
      height: props.h ?? "600px",
      width: props.w ?? "600px",
      position: 'relative',
    }}>
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
      {isMounted && <div className='absolute top-10 right-0 [&_button]:hover:animate-bounce'>
        <PrettierButton instance={editorRef.current} code={code} />
      </div>}
    </div>
  );
};
