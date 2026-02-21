export class BootLoader {
    private container: HTMLElement;
    private progressFill: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'boot-screen';
        document.body.appendChild(this.container);

        // ASCII Logo
        const logo = document.createElement('pre');
        logo.style.cssText = 'font-size:14px; line-height:1.2; margin-bottom:20px; text-align:center; color:#00e5ff; text-shadow: 0 0 10px rgba(0,229,255,0.4);';
        logo.textContent = `
    ╔═══════════════════════════╗
    ║   A C H U . O S   v2.0   ║
    ╚═══════════════════════════╝`;
        this.container.appendChild(logo);

        // Progress bar
        const track = document.createElement('div');
        track.className = 'boot-progress-track';
        this.progressFill = document.createElement('div');
        this.progressFill.className = 'boot-progress-fill';
        track.appendChild(this.progressFill);
        this.container.appendChild(track);
    }

    async boot(): Promise<void> {
        const lines = [
            '> initializing kernel...',
            '> loading filesystem...',
            '> starting window manager...',
            '> system online.'
        ];

        for (let i = 0; i < lines.length; i++) {
            const p = document.createElement('p');
            this.container.appendChild(p);
            await this.typeText(p, lines[i]);
            this.progressFill.style.width = `${((i + 1) / lines.length) * 100}%`;
            await this.wait(80);
        }

        await this.wait(300);

        // Fade out
        this.container.style.transition = 'opacity 0.25s ease';
        this.container.style.opacity = '0';

        return new Promise(resolve => {
            setTimeout(() => {
                this.container.remove();
                resolve();
            }, 250);
        });
    }

    private typeText(element: HTMLElement, text: string): Promise<void> {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                element.textContent += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, 15);
        });
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
