import { FileSystem } from '../core/FileSystem';
import { wm } from '../core/WindowManager';
import { createViewerApp } from './ViewerApp';

export function createTerminalApp(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'terminal-container';
    container.style.fontFamily = 'monospace';
    container.style.padding = '10px';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.background = '#000';
    container.style.color = '#0f0'; // Classic Green

    const output = document.createElement('div');
    output.style.flex = '1';
    output.style.overflowY = 'auto';
    output.style.whiteSpace = 'pre-wrap';
    output.style.marginBottom = '10px';

    const inputLine = document.createElement('div');
    inputLine.style.display = 'flex';
    inputLine.innerHTML = '<span style="color:#0f0; margin-right:8px;">visitor@achu.os:~$</span>';

    const input = document.createElement('input');
    input.type = 'text';
    input.style.flex = '1';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.color = '#0f0';
    input.style.outline = 'none';
    input.style.fontFamily = 'inherit';
    input.style.fontSize = 'inherit';
    input.autofocus = true;

    inputLine.appendChild(input);
    container.appendChild(output);
    container.appendChild(inputLine);

    // Focus helper
    container.addEventListener('click', () => input.focus());

    const print = (text: string, color: string = '#0f0') => {
        const p = document.createElement('div');
        p.style.color = color;
        p.textContent = text;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    };

    print('AchuOS Terminal v2.0', '#00e5ff');
    print('');
    print('Available commands:', '#00e5ff');
    print('  help      Show this help message');
    print('  about     Display user profile');
    print('  projects  List all projects');
    print('  contact   Show contact info');
    print('  clear     Clear terminal screen');
    print('  open <id> Open a project window');
    print('  exit      Close terminal');
    print('');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            print(`visitor@achu.os:~$ ${cmd}`, '#fff');
            input.value = '';
            execute(cmd);
        }
    });

    function execute(cmdString: string) {
        const [cmd, ...args] = cmdString.split(' ');

        switch (cmd.toLowerCase()) {
            case 'help':
                print('Available commands:');
                print('  help     - Show this help message');
                print('  about    - Display user profile');
                print('  projects - List all projects');
                print('  contact  - Show contact info');
                print('  clear    - Clear terminal screen');
                print('  open <id>- Open a project window');
                print('  exit     - Close terminal');
                break;

            case 'about':
                const profile = FileSystem.getProfile();
                print(`AUTHOR: ${profile.name}`);
                print(`ROLE: ${profile.role}`);
                print(`STATUS: ${profile.status}`);
                break;

            case 'projects':
                const projects = FileSystem.getProjects();
                projects.forEach(p => {
                    print(`[${p.id}] ${p.name} - ${p.type}`);
                });
                break;

            case 'contact':
                const social = FileSystem.getProfile().socials;
                Object.entries(social).forEach(([k, v]) => {
                    print(`${k.toUpperCase()}: ${v}`);
                });
                break;

            case 'open':
                if (!args[0]) {
                    print('Usage: open <project-id>', '#f00');
                    return;
                }
                const project = FileSystem.getFile(args[0]);
                if (project) {
                    print(`Opening ${project.name}...`);
                    wm.createWindow({
                        id: `viewer-${project.id}`,
                        title: project.name,
                        content: createViewerApp(project),
                        width: 450,
                        height: 500
                    });
                } else {
                    print(`Project "${args[0]}" not found.`, '#f00');
                }
                break;

            case 'clear':
                output.innerHTML = '';
                break;

            case 'exit':
                // Logic to find closest window and close it is tricky without ID access
                // But we can just say "Bye"
                print('Session terminated.');
                // wm.closeWindow(...) if we knew the ID
                break;

            case '':
                break;

            default:
                print(`Command not found: ${cmd}`, '#f00');
        }
    }

    return container;
}
