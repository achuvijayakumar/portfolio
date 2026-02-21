import { wm } from '../core/WindowManager';
// import { FileSystem } from '../core/FileSystem';
import { createProjectsApp } from '../apps/ProjectsApp';
import { createAboutApp } from '../apps/AboutApp';
import { createExperienceApp } from '../apps/ExperienceApp';
import { createContactApp } from '../apps/ContactApp';
import { createCertificatesApp } from '../apps/CertificatesApp';
import { createSkillsApp } from '../apps/SkillsApp';

interface DesktopIcon {
    id: string;
    label: string;
    iconFn: () => string; // Return SVG or HTML
    action: () => void;
}

export class Desktop {
    private container: HTMLElement;
    private icons: DesktopIcon[] = [];

    constructor() {
        this.container = document.getElementById('desktop') || document.body;
        this.initIcons();
        this.render();
    }

    private initIcons() {
        this.icons = [
            {
                id: 'projects',
                label: 'Projects',
                iconFn: () => '📁',
                action: () => {
                    wm.createWindow({
                        id: 'projects-window',
                        title: 'Projects Explorer',
                        content: createProjectsApp(),
                        width: 500,
                        height: 400,
                        x: 50,
                        y: 50
                    });
                }
            },
            {
                id: 'about',
                label: 'Bio.txt',
                iconFn: () => '📄',
                action: () => {
                    wm.createWindow({
                        id: 'about-window',
                        title: 'About Me',
                        content: createAboutApp(),
                        width: 400,
                        height: 500,
                        x: 100,
                        y: 80
                    });
                }
            },
            {
                id: 'experience',
                label: 'Work',
                iconFn: () => '💼',
                action: () => {
                    wm.createWindow({
                        id: 'experience-window',
                        title: 'Work Experience',
                        content: createExperienceApp(),
                        width: 500,
                        height: 550,
                        x: 140,
                        y: 40
                    });
                }
            },
            {
                id: 'terminal',
                label: 'Terminal',
                iconFn: () => '💻',
                action: () => {
                    // TODO: Terminal App
                    import('../apps/TerminalApp').then(m => {
                        wm.createWindow({
                            id: 'terminal-window',
                            title: 'Terminal',
                            content: m.createTerminalApp(),
                            width: 600,
                            height: 400,
                            x: 150,
                            y: 150,
                            isTerminal: true
                        });
                    })
                }
            },
            {
                id: 'contact',
                label: 'Contact',
                iconFn: () => '📧',
                action: () => {
                    wm.createWindow({
                        id: 'contact-window',
                        title: 'Contact',
                        content: createContactApp(),
                        width: 380,
                        height: 400,
                        x: 200,
                        y: 100
                    });
                }
            },
            {
                id: 'skills',
                label: 'Skills',
                iconFn: () => '⚡',
                action: () => {
                    wm.createWindow({
                        id: 'skills-window',
                        title: 'Skills Matrix',
                        content: createSkillsApp(),
                        width: 420,
                        height: 480,
                        x: 180,
                        y: 50
                    });
                }
            },
            {
                id: 'certs',
                label: 'Certs',
                iconFn: () => '🏆',
                action: () => {
                    wm.createWindow({
                        id: 'certs-window',
                        title: 'Certificates',
                        content: createCertificatesApp(),
                        width: 450,
                        height: 400,
                        x: 120,
                        y: 60
                    });
                }
            }
        ];
    }

    private render() {
        const grid = document.createElement('div');
        grid.style.display = 'flex';
        grid.style.flexDirection = 'column';
        grid.style.gap = '20px';
        grid.style.padding = '20px';
        grid.style.position = 'absolute';
        grid.style.top = '0';
        grid.style.left = '0';

        this.icons.forEach(icon => {
            const el = document.createElement('div');
            el.className = 'desktop-icon';
            el.innerHTML = `
        <div class="icon-img" style="display:flex;justify-content:center;align-items:center;font-size:24px;background:white">
            ${icon.iconFn()}
        </div>
        <span>${icon.label}</span>
      `;

            // Select logic
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                el.classList.add('selected');
            });

            // Open logic
            el.addEventListener('dblclick', () => {
                icon.action();
            });

            grid.appendChild(el);
        });

        // Deselect on bg click
        document.addEventListener('click', () => {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        });

        this.container.appendChild(grid);
    }
}
