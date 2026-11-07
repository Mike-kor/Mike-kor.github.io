import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apps = JSON.parse(fs.readFileSync(path.join(root, 'growth/apps.json'), 'utf8'));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

for (const app of apps) {
  const destination = app.play || app.web;
  if (!destination) throw new Error(`No destination for ${app.slug}`);
  const isWeb = !app.play && Boolean(app.web);
  const url = `https://mike-kor.github.io/install/${app.slug}/`;
  const title = `${app.name} — ${isWeb ? '지금 플레이' : 'Google Play'} | INDANG SOFT`;
  const description = `${app.hook} ${app.stage}. INDANG SOFT 공식 ${isWeb ? '웹 플레이' : 'Google Play'} 링크.`;
  const cta = isWeb ? '게임 바로 시작하기' : 'Google Play에서 계속하기';
  const secondary = app.web && app.play ? `<a class="alt" href="${esc(app.web)}" data-destination="${esc(app.web)}">웹에서 바로 플레이 <span>↗</span></a>` : '';
  const status = /출시/.test(app.stage)
    ? '스토어로 이동합니다. 잠시만 기다려 주세요.'
    : isWeb
      ? '새 창에서 게임을 엽니다.'
      : `현재 상태: ${app.stage}. 스토어 접근에 테스트 참여 자격이 필요할 수 있습니다.`;
  const page = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#101713"><meta name="robots" content="noindex,follow">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="INDANG SOFT"><meta property="og:title" content="${esc(app.name)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="https://mike-kor.github.io${esc(app.art)}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/indang-succulent.svg" type="image/svg+xml"><link rel="stylesheet" href="/growth/install.css"><script defer src="/growth/install.js"></script>
</head><body data-destination="${esc(destination)}" data-app="${esc(app.slug)}" data-kind="${isWeb ? 'web' : 'android'}" data-auto="${isWeb || /출시/.test(app.stage) ? 'true' : 'false'}">
<div class="grain" aria-hidden="true"></div><header><a class="brand" href="/"><img src="/assets/indang-succulent.svg" alt=""><span>INDANG <b>SOFT</b></span></a><span class="signature">A WORLD MADE TO BE PLAYED</span></header>
<main><div class="visual" style="--art:url('${esc(app.art)}')"><div class="art-wash"></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><img class="app-art" src="${esc(app.art)}" alt="${esc(app.name)} 앱 이미지"><div class="art-caption"><span>INDANG SOFT / ${isWeb ? 'WEB GAME' : 'MOBILE GAME'}</span><span>${esc(app.short)}</span></div></div>
<section class="card"><div class="status"><i></i>${esc(app.stage)}</div><p class="eyebrow">YOUR NEXT WORLD IS READY</p><h1>${esc(app.name)}</h1><p class="hook">${esc(app.hook)}</p><div class="handoff"><span class="spinner" aria-hidden="true"></span><div><strong id="handoff-title">${isWeb ? '게임을 준비하고 있어요' : 'Google Play로 이동하고 있어요'}</strong><small id="handoff-note">${esc(status)}</small></div></div><a class="primary" id="continue-link" href="${esc(destination)}" data-destination="${esc(destination)}">${cta}<span>↗</span></a>${secondary}<p class="fineprint">자동으로 이동하지 않으면 위 버튼을 눌러주세요.</p></section></main>
<footer><span>© INDANG SOFT</span><a href="/go/${esc(app.slug)}/">게임 소개 보기 ↗</a><a href="/app-privacy/">개인정보처리방침</a></footer><noscript><meta http-equiv="refresh" content="0;url=${esc(destination)}"></noscript></body></html>`;
  const out = path.join(root, 'install', app.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
}
console.log(`Generated ${apps.length} share splash pages.`);
