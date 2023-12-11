export class CodeBlock {
    constructor(code: string, type: "html" | "css") {
        // this.name = name
        this.code = code;
        this.type = type;
    }
    // name: string
    code: string
    type: "html" | "css"
}