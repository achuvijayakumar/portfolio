export function createExperienceApp(): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = 'padding:20px; font-family:var(--font-mono); overflow-y:auto; height:100%; font-size:14px;';

    const jobs = [
        {
            role: 'Software Engineer',
            company: 'LPE Software Solutions Pvt. Ltd.',
            period: 'Sep 2025 – Present',
            sections: [
                {
                    title: 'Distributed Backend Trading Platform',
                    bullets: [
                        'Engineered an event-driven backend using Redis as the central message bus, decoupling the UI from parallel processing agents.',
                        'Orchestrated task management via impl.py, coordinating agent polling (orderbook, balance, positions) and triggering downstream Redis-based automation.',
                        'Established a custom Order Management System (OMS) to coordinate multi-leg trades using atomic Redis HDEL locking.',
                        'Designed an OI crossover automation engine using Net Put/Call tracking, spot-based triggers, and hysteresis filters.',
                        'Executed a real-time payoff simulator with vectorized Black-Scholes pricing and live Greeks rendered via Plotly inside Streamlit.',
                        'Applied cache-warming strategies to preload 50k+ instrument entries into Redis hashes, enabling O(1) lookups.',
                        'Incorporated MotherDuck to warehouse PnL history, utilizing SQL-based FIFO logic via DuckDB window functions.',
                        'Developed a robust PDF ingestion and ETL routine to normalize trade data using pdfplumber and regex-based table parsing.'
                    ]
                },
                {
                    title: 'Streamlit UI & Redis-Driven Workflow Tools',
                    bullets: [
                        'Constructed multi-tab Streamlit dashboards with real-time feedback and Redis-bound actions.',
                        'Enhanced form components using session state and dynamic field generation for expiry, strike, option type, and lot.'
                    ]
                },
                {
                    title: 'File Automation & CLI Scripts',
                    bullets: [
                        'Generated UID-specific CSV pipelines to persist live trade/book data across users.',
                        'Built CLI tools to validate Redis calls and API responses.',
                        'Enforced automation for data refresh, log cleanup, and Redis expiry management using cron and bash.'
                    ]
                }
            ]
        },
        {
            role: 'Scrutiny Assistant',
            company: 'Commissioner for Entrance Examinations, Kerala',
            period: 'Mar 2025 – Apr 2025',
            sections: [
                {
                    title: null,
                    bullets: [
                        'Reviewed and validated 5500+ KEAM exam applications; performed 6000+ re-verifications.',
                        'Issued, cleared, and reissued memos based on flagged document discrepancies.',
                        'Coordinated with applicants and centers; resolved 100+ support queries.'
                    ]
                }
            ]
        },
        {
            role: 'Technical Assistant (Software)',
            company: 'ActsInfo',
            period: 'Jul 2022 – Jul 2024',
            sections: [
                {
                    title: null,
                    bullets: [
                        'Delivered 4 web applications with dynamic content and secure membership features.',
                        'Created MySQL-backed systems for registration, payments, and profile workflows.',
                        'Improved site performance with responsive UIs using HTML, CSS, and JavaScript.'
                    ]
                }
            ]
        }
    ];

    let html = '<h3 style="font-size:16px; margin-bottom:16px; color:var(--accent);">// WORK_EXPERIENCE</h3>';

    jobs.forEach((job, idx) => {
        const isLast = idx === jobs.length - 1;
        html += `
            <div style="border-left:2px solid ${idx === 0 ? 'var(--accent)' : 'var(--border-bright)'}; padding-left:16px; margin-bottom:${isLast ? '0' : '20px'}; position:relative;">
                <div style="position:absolute; left:-7px; top:0; width:12px; height:12px; border-radius:50%; background:${idx === 0 ? 'var(--accent)' : 'var(--border-bright)'}; ${idx === 0 ? 'box-shadow:0 0 8px var(--accent-glow);' : ''}"></div>
                <div style="font-size:16px; font-weight:bold; color:var(--text-main);">${job.role}</div>
                <div style="font-size:13px; color:var(--accent); margin:2px 0;">${job.company}</div>
                <div style="font-size:12px; color:var(--text-dim); margin-bottom:10px;">${job.period}</div>
        `;

        job.sections.forEach(section => {
            if (section.title) {
                html += `<div style="font-size:13px; color:var(--accent); text-transform:uppercase; letter-spacing:1px; margin:8px 0 6px; opacity:0.8;">▸ ${section.title}</div>`;
            }
            html += '<ul style="margin:0 0 8px 0; padding-left:16px; list-style:none;">';
            section.bullets.forEach(b => {
                html += `<li style="color:var(--text-dim); font-size:13px; line-height:1.6; margin-bottom:4px; position:relative; padding-left:12px;"><span style="position:absolute; left:0; color:var(--accent);">›</span>${b}</li>`;
            });
            html += '</ul>';
        });

        html += '</div>';
    });

    container.innerHTML = html;
    return container;
}
