import { FileSystem } from '../core/FileSystem';

export function createAboutApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.fontSize = '16px';
    container.style.fontFamily = 'var(--font-mono)';

    const profile = FileSystem.getProfile();

    container.innerHTML = `
    <div style="text-align:center; margin-bottom:24px;">
        <div style="width:80px; height:80px; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; font-size:40px; background:rgba(0,229,255,0.08); border:2px solid rgba(0,229,255,0.3); border-radius:12px; box-shadow: 0 0 20px rgba(0,229,255,0.1);">
            👤
        </div>
        <h2 style="font-size:24px; margin-bottom:4px;">${profile.name}</h2>
        <p style="color:var(--accent); margin-bottom:8px; font-size:14px; text-transform:uppercase; letter-spacing:2px;">${profile.role}</p>
        <div style="display:inline-block; border:1px solid var(--accent); padding:3px 12px; font-size:13px; color:var(--accent); border-radius:4px; box-shadow: 0 0 8px rgba(0,229,255,0.15);">${profile.status}</div>
    </div>

    <div style="border-top:1px solid var(--border-color); padding-top:16px; margin-top:16px;">
        <h3 style="font-size:16px; margin-bottom:12px; color:var(--accent);">// BIO</h3>
        ${profile.bio.map(line => `<p style="color:var(--text-dim); font-size:14px; line-height:1.6; margin-bottom:8px;">${line}</p>`).join('')}
    </div>

    <div style="border-top:1px solid var(--border-color); padding-top:16px; margin-top:12px;">
        <h3 style="font-size:16px; margin-bottom:12px; color:var(--accent);">// SOCIALS</h3>
        <div style="display:flex; flex-direction:column; gap:8px;">
            <a href="${profile.socials.github}" target="_blank" style="color:var(--text-dim); font-size:14px; text-decoration:none; cursor:pointer;">⟨/⟩ github.com/achuvijayakumar</a>
            <a href="${profile.socials.linkedin}" target="_blank" style="color:var(--text-dim); font-size:14px; text-decoration:none; cursor:pointer;">▧ linkedin.com/in/achuvijayakumar</a>
            <a href="${profile.socials.email}" style="color:var(--text-dim); font-size:14px; text-decoration:none; cursor:pointer;">@ achuvijayakumar@outlook.com</a>
        </div>
    </div>
  `;

    return container;
}
