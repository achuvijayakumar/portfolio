import { FileSystem } from '../core/FileSystem';

export function createContactApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = 'padding:24px; text-align:center; font-family:var(--font-mono);';

    const socials = FileSystem.getProfile().socials;

    const header = document.createElement('div');
    header.innerHTML = `
        <h3 style="font-size:18px; color:var(--accent); margin-bottom:6px;">// CONNECT</h3>
        <p style="font-size:13px; color:var(--text-dim); margin-bottom:20px;">Let's build something together.</p>
    `;
    container.appendChild(header);

    const links = [
        { label: 'GitHub', url: socials.github, icon: '⟨/⟩' },
        { label: 'LinkedIn', url: socials.linkedin, icon: '▧' },
        { label: 'Email', url: socials.email, icon: '@' }
    ];

    links.forEach(link => {
        const btn = document.createElement('a');
        btn.href = link.url;
        btn.target = '_blank';
        btn.style.cssText = `
            display: flex; align-items: center; justify-content: center; gap: 10px;
            margin: 8px auto; padding: 10px 16px;
            border: 1px solid var(--border-bright); border-radius: 6px;
            text-decoration: none; color: var(--text-main);
            font-weight: bold; font-size: 15px; max-width: 220px;
            background: rgba(0,229,255,0.04);
            transition: all 0.2s ease; cursor: pointer;
        `;

        btn.innerHTML = `<span style="color:var(--accent); font-size:18px; font-weight:bold;">${link.icon}</span> ${link.label}`;

        btn.addEventListener('mouseenter', () => {
            btn.style.borderColor = 'var(--accent)';
            btn.style.background = 'rgba(0,229,255,0.08)';
            btn.style.boxShadow = '0 0 12px rgba(0,229,255,0.15)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.borderColor = 'var(--border-bright)';
            btn.style.background = 'rgba(0,229,255,0.04)';
            btn.style.boxShadow = 'none';
        });

        container.appendChild(btn);
    });

    return container;
}
