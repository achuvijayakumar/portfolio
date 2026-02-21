import { FileSystem } from '../core/FileSystem';
import { wm } from '../core/WindowManager';
import { createViewerApp } from './ViewerApp';

export function createProjectsApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.padding = '8px';

    const projects = FileSystem.getProjects();

    // Group by type
    const systems = projects.filter(p => p.type === 'system');
    const websites = projects.filter(p => p.type === 'website');

    function createSection(title: string, items: typeof projects) {
        const section = document.createElement('div');
        section.style.marginBottom = '16px';

        const header = document.createElement('div');
        header.style.cssText = 'font-size:13px; color:var(--accent); text-transform:uppercase; letter-spacing:2px; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid var(--border-color); font-family:var(--font-mono);';
        header.textContent = `// ${title}`;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.style.cssText = 'display:grid; grid-template-columns:repeat(auto-fill, minmax(90px, 1fr)); gap:8px;';

        items.forEach(p => {
            const file = document.createElement('div');
            file.className = 'desktop-icon';
            file.style.width = 'auto';
            file.style.border = '1px solid transparent';

            const iconMap: Record<string, string> = {
                brain: '🧠', server: '🖥️', chart: '📊',
                gift: '🎁', globe: '🌐'
            };
            const iconChar = iconMap[p.icon] || (p.type === 'system' ? '⚙️' : '🌐');

            file.innerHTML = `
                <div class="icon-img" style="font-size:24px; display:flex; justify-content:center; align-items:center; background:rgba(0,229,255,0.05);">
                    ${iconChar}
                </div>
                <span style="font-size:13px; text-align:center; color:var(--text-dim); line-height:1.2;">${p.name}</span>
            `;

            file.addEventListener('click', () => {
                container.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
                file.classList.add('selected');
            });

            file.addEventListener('dblclick', () => {
                wm.createWindow({
                    id: `viewer-${p.id}`,
                    title: p.name,
                    content: createViewerApp(p),
                    width: 480,
                    height: 500,
                    x: 120 + Math.random() * 60,
                    y: 80 + Math.random() * 40
                });
            });

            grid.appendChild(file);
        });

        section.appendChild(grid);
        return section;
    }

    container.appendChild(createSection('Systems / Backend', systems));
    container.appendChild(createSection('Web Deployments', websites));

    return container;
}
