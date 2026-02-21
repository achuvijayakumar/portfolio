export function createCertificatesApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = 'padding:16px; display:flex; flex-direction:column; gap:8px; overflow-y:auto; height:100%; box-sizing:border-box; font-family:var(--font-mono);';

    const header = document.createElement('div');
    header.innerHTML = `
        <h3 style="font-size:16px; margin-bottom:4px; color:var(--accent);">// CERTIFICATIONS</h3>
        <p style="font-size:12px; color:var(--text-dim); margin-bottom:12px;">Click to view certificate.</p>
    `;
    container.appendChild(header);

    const certs = [
        { src: './certs/Generative AI Professional.jpg', badge: 'Oracle', name: 'Generative AI Professional' },
        { src: './certs/OCI AI Foundations Associate.jpg', badge: 'Oracle', name: 'AI Foundations Associate' },
        { src: './certs/OCI Foundations Associate.jpg', badge: 'Oracle', name: 'OCI Foundations Associate' },
        { src: './certs/AWS SimuLearn Computing Solutions_.jpg', badge: 'AWS', name: 'Cloud Computing Solutions' },
        { src: './certs/AWS SimuLearn Cloud First Step_.jpg', badge: 'AWS', name: 'Cloud First Steps' },
        { src: './certs/java & j2ee_.jpg', badge: 'Keltron', name: 'Java & J2EE' },
        { src: './certs/IBM.jpg', badge: 'IBM', name: 'Cybersecurity Fundamentals' }
    ];

    const list = document.createElement('div');
    list.style.cssText = 'display:flex; flex-direction:column; gap:6px;';

    certs.forEach(cert => {
        const row = document.createElement('div');
        row.style.cssText = `
            display:flex; align-items:center; gap:10px; padding:10px 14px;
            border:1px solid var(--border-color); border-radius:6px; cursor:pointer;
            background:rgba(0,229,255,0.03); transition:all 0.2s ease;
        `;
        row.innerHTML = `
            <span style="background:var(--accent); color:var(--bg-color); padding:2px 8px; font-size:12px; font-weight:bold; border-radius:3px; flex-shrink:0;">${cert.badge}</span>
            <span style="font-size:15px; color:var(--text-main);">${cert.name}</span>
        `;
        row.addEventListener('mouseenter', () => {
            row.style.borderColor = 'var(--accent)';
            row.style.background = 'rgba(0,229,255,0.08)';
            row.style.boxShadow = '0 0 12px rgba(0,229,255,0.1)';
        });
        row.addEventListener('mouseleave', () => {
            row.style.borderColor = 'var(--border-color)';
            row.style.background = 'rgba(0,229,255,0.03)';
            row.style.boxShadow = 'none';
        });
        row.addEventListener('click', () => showCertPopup(cert.src, `${cert.badge} — ${cert.name}`));
        list.appendChild(row);
    });

    container.appendChild(list);

    // Lightbox overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'display:none; position:fixed; inset:0; z-index:99999; background:rgba(0,0,0,0.9); align-items:center; justify-content:center; cursor:pointer; backdrop-filter:blur(5px);';
    overlay.addEventListener('click', () => { overlay.style.display = 'none'; });

    const inner = document.createElement('div');
    inner.style.cssText = 'position:relative; max-width:90vw; max-height:90vh;';
    inner.addEventListener('click', (e) => e.stopPropagation());

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute; top:-12px; right:-12px; width:32px; height:32px; background:var(--accent); color:var(--bg-color); border:none; font-size:1rem; cursor:pointer; z-index:10; border-radius:50%; font-weight:bold; box-shadow:0 0 10px rgba(0,229,255,0.4);';
    closeBtn.addEventListener('click', () => { overlay.style.display = 'none'; });

    const img = document.createElement('img');
    img.style.cssText = 'max-width:90vw; max-height:80vh; border:2px solid var(--accent); box-shadow:0 0 40px rgba(0,229,255,0.2); display:block; border-radius:4px;';

    const title = document.createElement('p');
    title.style.cssText = 'text-align:center; color:var(--accent); margin-top:0.75rem; font-size:1rem; font-weight:bold; text-shadow:0 0 8px rgba(0,229,255,0.3);';

    inner.appendChild(closeBtn);
    inner.appendChild(img);
    inner.appendChild(title);
    overlay.appendChild(inner);
    document.body.appendChild(overlay);

    function showCertPopup(src: string, name: string) {
        img.src = src;
        img.alt = name;
        title.textContent = name;
        overlay.style.display = 'flex';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.style.display = 'none';
    });

    return container;
}
