interface ISelection {
    selectionStartLineNumber: number
    selectionStartColumn: number
    positionLineNumber: number
    positionColumn: number
}

export const useSetEditorSelection = (editor: any, selection?: ISelection) => {
    if (selection) {
        editor.setSelection(selection)
        return
    }
    const totalLines = editor.getModel().getLineCount()
    const lastLineLength = editor.getModel().getLineMaxColumn(totalLines)
    const defaultSelection = {
      selectionStartLineNumber: totalLines,
      selectionStartColumn: lastLineLength,
      positionLineNumber: totalLines,
      positionColumn: lastLineLength
    }
    editor.setSelection(defaultSelection)
}