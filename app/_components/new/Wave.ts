export class Wave {
    constructor(x: number, y: number) {
        const waves = document.createElement('div');
        for (let i = 0; i < 2; i++) {
            const div = document.createElement('div');
            waves.appendChild(div);
        }
        waves.classList.add('waves', 'absolute');
        waves.style.left = x + 'px';
        waves.style.top = y + 'px';
        this.element = waves
        this.x = x
        this.y = y
    }
    element: HTMLDivElement
    x: number
    y: number
}