export const useStringToNode = (html: string, style: boolean = false) => {
    if (!style) {
        const parser = new DOMParser();

        const parsedDoc = parser.parseFromString(html, "text/html");

        const htmlElement = parsedDoc.firstChild!;

        return htmlElement;
    }
}