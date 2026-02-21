import interact from 'interactjs';

export interface WindowConfig {
    id: string;
    title: string;
    content: HTMLElement | string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    isTerminal?: boolean;
}

export class WindowManager {
    private windows: Map<string, HTMLElement> = new Map();
    private zIndexCounter = 10;
    private container: HTMLElement;

    constructor(containerId: string = 'desktop') {
        const el = document.getElementById(containerId);
        if (!el) throw new Error(`Container #${containerId} not found`);
        this.container = el;

        // Global click listener to handle focus
        document.addEventListener('mousedown', (e) => {
            const target = e.target as HTMLElement;
            const win = target.closest('.pixel-window');
            if (win) {
                this.focusWindow(win.id);
            }
        });
    }

    createWindow(config: WindowConfig) {
        if (this.windows.has(config.id)) {
            this.focusWindow(config.id);
            return;
        }

        const win = document.createElement('div');
        win.id = config.id;
        win.className = 'pixel-window';
        win.style.left = `${config.x || 100}px`;
        win.style.top = `${config.y || 100}px`;
        win.style.zIndex = `${this.zIndexCounter++}`;
        if (config.width) win.style.width = `${config.width}px`;
        if (config.height) win.style.height = `${config.height}px`;

        // Header
        const header = document.createElement('div');
        header.className = 'window-header';
        header.innerHTML = `
      <span class="window-title">${config.title}</span>
      <div class="window-controls">
        <div class="control-btn close" data-action="close"></div>
      </div>
    `;

        // Content
        const content = document.createElement('div');
        content.className = 'window-content';
        if (typeof config.content === 'string') {
            content.innerHTML = config.content;
        } else {
            content.appendChild(config.content);
        }

        win.appendChild(header);
        win.appendChild(content);

        // Controls Logic
        header.querySelector('[data-action="close"]')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeWindow(config.id);
        });

        this.container.appendChild(win);
        this.windows.set(config.id, win);

        // Setup Interact.js
        interact(win).draggable({
            allowFrom: '.window-header',
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                move: (event) => {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute('data-x', x.toString());
                    target.setAttribute('data-y', y.toString());
                }
            }
        });

        // Animate Open
        requestAnimationFrame(() => win.classList.add('open'));
        this.focusWindow(config.id);
    }

    closeWindow(id: string) {
        const win = this.windows.get(id);
        if (win) {
            win.classList.remove('open');
            setTimeout(() => {
                win.remove();
                this.windows.delete(id);
            }, 200);
        }
    }

    focusWindow(id: string) {
        const win = this.windows.get(id);
        if (win) {
            // Remove active class from all
            this.windows.forEach(w => w.classList.remove('active'));
            win.classList.add('active');
            win.style.zIndex = `${this.zIndexCounter++}`;
        }
    }
}

export const wm = new WindowManager(); // Singleton instance
