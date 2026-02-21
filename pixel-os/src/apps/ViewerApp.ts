import { marked } from 'marked';
import type { Project } from '../core/FileSystem';

export function createViewerApp(project: Project): HTMLElement {
  const container = document.createElement('div');
  container.style.padding = '16px';
  container.style.fontFamily = 'var(--font-mono)';
  container.className = 'markdown-body';

  const md = `
## ${project.name}

**Type:** \`${project.type.toUpperCase()}\`
**Tech:** ${project.param.stack.map(s => `\`${s}\``).join(' · ')}

---

**PROBLEM:**
${project.param.problem}

**SOLUTION:**
${project.param.solution}

**IMPACT:**
${project.param.impact}

---

${project.content}
  `;

  container.innerHTML = marked.parse(md) as string;

  return container;
}
