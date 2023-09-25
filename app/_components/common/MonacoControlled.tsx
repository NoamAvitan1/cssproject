'use client'
import { Editor, useMonaco } from "@monaco-editor/react";
import { Component, useEffect, useMemo, useState } from "react";
export default class MonacoControlled extends Component {
    editor: any
    monaco:any
    props: any

  constructor(props: {value: string, onChange: Function, onSelectionChange: Function}) {
    super(props);

    this.editor = null;
    this.monaco = null;
    this.editorDidMount = this.editorDidMount.bind(this);
    this.updateEditor = this.updateEditor.bind(this);
  }

  editorDidMount(editor: any, monaco: any) {
    this.editor = editor;
    this.monaco = monaco;
    this.updateEditor();

    this.editor.onDidChangeCursorSelection((e: any) => {
      if (this.props.onSelectionsChange) {
        this.props.onSelectionsChange([e.selection, ...e.secondarySelections]);
      }

      this.updateEditor();
    });
  }

  componentDidUpdate() {
    this.updateEditor();
  }

  updateEditor() {
    if (this.props.value !== this.editor.getValue()) {
      this.editor.setValue(this.props.value);
    }

    if (Array.isArray(this.props.selections)) {
      if (
        !this.monaco.Selection.selectionsArrEqual(
          this.props.selections,
          this.editor.getSelections()
        )
      ) {
        this.editor.setSelections(this.props.selections);
      }
    }
  }

  render() {
    return (
      <div className="WebpageEditor">
        <Editor
          height="600px"
          width="600px"
          theme="vs-dark"
          onMount={this.editorDidMount}
          onChange={value => {
            if (this.props.onChange) {
              this.props.onChange(value);
            }
            this.updateEditor();
          }}
        />
      </div>
    );
  }
}