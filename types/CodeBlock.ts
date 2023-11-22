export class CodeBlock {
    constructor(code: string, type: "html" | "css") {
        this.code = code;
        this.type = type;
    }
    code: string
    type: "html" | "css"
}