import './style.css';
import { BootLoader } from './core/BootLoader';
import { Desktop } from './ui/Desktop';
import { wm } from './core/WindowManager';
import { createTerminalApp } from './apps/TerminalApp';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Boot Sequence
    const boot = new BootLoader();
    await boot.boot();

    // 2. Initialize Desktop
    new Desktop();

    // 3. Global Shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault();
            // Toggle Terminal
            const existing = document.getElementById('terminal-window');
            if (existing) {
                // If minimized or not top, bring to top? Or close?
                // Let's toggle visibility/existence
                if (existing.classList.contains('active')) {
                    wm.closeWindow('terminal-window');
                } else {
                    wm.focusWindow('terminal-window');
                }
            } else {
                wm.createWindow({
                    id: 'terminal-window',
                    title: 'Terminal',
                    content: createTerminalApp(),
                    width: 600,
                    height: 400,
                    x: 100,
                    y: 100,
                    isTerminal: true
                });
            }
        }

        if (e.key === 'Escape') {
            // Close active window
            const active = document.querySelector('.pixel-window.active');
            if (active) {
                wm.closeWindow(active.id);
            }
        }
    });

    console.log('System Online.');
});
