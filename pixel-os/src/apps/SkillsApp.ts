export function createSkillsApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = 'padding:20px; font-family:var(--font-mono); overflow-y:auto; height:100%;';

    const skills = [
        {
            category: 'Languages',
            items: ['Python', 'Java', 'JavaScript']
        },
        {
            category: 'Backend & Frameworks',
            items: ['Streamlit', 'J2EE', 'FastAPI', 'Redis']
        },
        {
            category: 'Frontend Tools',
            items: ['Streamlit', 'HTML', 'CSS']
        },
        {
            category: 'Databases',
            items: ['QuestDB', 'MySQL', 'DuckDB (MotherDuck)']
        },
        {
            category: 'Data Tools & Cloud',
            items: ['Pandas', 'CSV pipelines', 'AWS (S3, EC2)']
        },
        {
            category: 'Dev Tools',
            items: ['Linux', 'Git', 'Docker', 'crontab', 'systemctl', 'pdfplumber', 'Eclipse IDE', 'VS Code', 'Antigravity']
        },
        {
            category: 'Additional',
            items: ['Technical analysis', 'Market data strategy', 'Risk automation']
        }
    ];

    let html = '<h3 style="font-size:16px; margin-bottom:16px; color:var(--accent);">// SKILLS_MATRIX</h3>';

    skills.forEach(group => {
        html += `
            <div style="margin-bottom:14px;">
                <div style="font-size:12px; color:var(--accent); text-transform:uppercase; letter-spacing:2px; margin-bottom:6px; opacity:0.8;">${group.category}</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${group.items.map(item => `
                        <span style="
                            display:inline-block; padding:4px 10px; font-size:13px;
                            border:1px solid var(--border-bright); border-radius:4px;
                            color:var(--text-main); background:rgba(0,229,255,0.04);
                            transition:all 0.2s ease; cursor:default;
                        " onmouseenter="this.style.borderColor='var(--accent)';this.style.background='rgba(0,229,255,0.1)';this.style.boxShadow='0 0 8px rgba(0,229,255,0.15)'"
                           onmouseleave="this.style.borderColor='var(--border-bright)';this.style.background='rgba(0,229,255,0.04)';this.style.boxShadow='none'"
                        >${item}</span>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    return container;
}
