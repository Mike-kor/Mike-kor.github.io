import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apps = JSON.parse(fs.readFileSync(path.join(root, 'growth/apps.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

for (const app of apps) {
  const title = `${app.name} | INDANG SOFT`;
  const canonical = `https://mike-kor.github.io/go/${app.slug}/`;
  const description = `${app.description} ${app.stage}.`;
  const cta = app.play
    ? `<a class="primary" data-destination="${esc(app.play)}" href="${esc(app.play)}">Google Play에서 보기 <span>↗</span></a>${app.web ? ` <a class="secondary" data-destination="${esc(app.web)}" href="${esc(app.web)}">웹에서 바로 플레이 ↗</a>` : ''}`
    : app.web
      ? `<a class="primary" data-destination="${esc(app.web)}" href="${esc(app.web)}">웹에서 바로 플레이 <span>↗</span></a>`
      : `<a class="primary" href="mailto:indangsoft@gmail.com?subject=${encodeURIComponent(app.email)}">테스트·출시 소식 문의 <span>↗</span></a>`;
  const schema = { '@context':'https://schema.org', '@type':'VideoGame', name:app.name, description:app.description, gamePlatform:app.platform.includes('web') ? ['Web browser'] : ['Android'], image:`https://mike-kor.github.io${app.art}`, url:canonical, author:{'@type':'Organization',name:'INDANG SOFT'} };
  const page = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#111813">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="INDANG SOFT"><meta property="og:title" content="${esc(app.name)} — ${esc(app.hook)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="https://mike-kor.github.io${esc(app.art)}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/indang-succulent.svg" type="image/svg+xml"><link rel="stylesheet" href="/growth/campaign.css"><script type="application/ld+json">${JSON.stringify(schema)}</script><script defer src="/growth/campaign.js"></script>
</head><body><header><a class="brand" href="/"><img src="/assets/indang-succulent.svg" alt=""><span>INDANG <b>SOFT</b></span></a><a class="all-worlds" href="/#worlds">모든 세계 보기 <span>↗</span></a></header>
<main><section class="hero"><div class="image" style="--art:url('${esc(app.art)}')"><div class="image-shade"></div><span class="edition">INDANG SOFT <i>·</i> ${esc(app.stage.toUpperCase())}</span><div class="hero-copy"><p class="eyebrow">A WORLD MADE TO BE PLAYED</p><h1>${esc(app.name)}</h1><p class="hook">${esc(app.hook)}</p><div class="actions">${cta}<a class="secondary" href="/#worlds">다른 세계 둘러보기</a></div></div><span class="scroll-mark">SCROLL TO EXPLORE ↓</span></div></section>
<section class="story"><div class="story-heading"><p class="eyebrow dark">THE PLAY LOOP</p><h2>이 세계에 들어가면,<br><em>이런 플레이가 시작됩니다.</em></h2></div><div class="story-body"><p class="lead">${esc(app.description)}</p><p>${esc(app.loop)}</p><ul>${app.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul><div class="audience"><span>FOR PLAYERS WHO LOVE</span><p>${esc(app.audience)}</p></div><div class="actions bottom-actions">${cta}<a class="secondary dark-link" href="mailto:indangsoft@gmail.com?subject=${encodeURIComponent(app.email)}">INDANG SOFT에 문의하기</a></div></div></section></main>
<footer><a class="brand" href="/"><img src="/assets/indang-succulent.svg" alt=""><span>INDANG <b>SOFT</b></span></a><span>SEOUL, KOREA · MADE FOR PLAYERS</span><a href="https://mike-kor.github.io/app-privacy/">개인정보처리방침</a></footer></body></html>`;
  const out = path.join(root, 'go', app.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
}
console.log(`Generated ${apps.length} campaign landing pages.`);
