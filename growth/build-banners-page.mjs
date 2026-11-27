import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const order = ['tome-of-return', 'mukgeom', 'numeron', 'goldilocks', 'apt-market', 'snowball-apocalypse', 'shooter-survival'];
const apps = JSON.parse(fs.readFileSync(path.join(root, 'growth/apps.json'), 'utf8'))
  .filter(app => order.includes(app.slug) && app.platform.includes('android') && app.stage === 'Google Play · 출시')
  .sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const cards = apps.map(app => {
  const shareUrl = `https://mike-kor.github.io/install/${app.slug}/`;
  const href = `/install/${app.slug}/`;
  return `<article class="banner-card banner-${esc(app.slug)}">
  <a class="banner-card-link" href="${esc(href)}" aria-label="${esc(app.name)} 게임 소개 열기">
    <div class="banner-art"><img class="art-image" src="${esc(app.art)}" alt="${esc(app.shareTitle || app.name)} 카카오톡 공유 배너" loading="lazy"></div>
    <div class="banner-caption"><div><h2>${esc(app.shareTitle || app.name)}</h2><p>${esc(app.hook)}</p></div><span class="stage">ANDROID<br>GOOGLE PLAY</span></div>
  </a>
  <div class="share-row"><code>${esc(shareUrl)}</code><button type="button" class="copy-link" data-copy-url="${esc(shareUrl)}">링크 복사</button></div>
</article>`;
}).join('\n');

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#111813">
<title>카카오톡 공유 링크 | INDANG SOFT</title><meta name="description" content="게임별 배너를 보고 카카오톡에 붙여넣을 개별 공유 링크를 복사하세요."><link rel="canonical" href="https://mike-kor.github.io/banners/">
<meta property="og:type" content="website"><meta property="og:site_name" content="INDANG SOFT"><meta property="og:title" content="게임 카카오톡 공유 링크"><meta property="og:description" content="배너를 눌러 게임을 살펴보고, 링크를 복사해 카카오톡에 붙여넣으세요."><meta property="og:url" content="https://mike-kor.github.io/banners/"><meta property="og:image" content="https://mike-kor.github.io${esc(apps[0]?.art ?? '/assets/indang-succulent.svg')}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/indang-succulent.svg" type="image/svg+xml"><link rel="stylesheet" href="/growth/banners.css?v=20261127-1"><script defer src="/growth/banners.js"></script></head><body>
<header><a class="brand" href="/"><img src="/assets/indang-succulent.svg" alt=""><span>INDANG <b>SOFT</b></span></a><a class="back-link" href="/#worlds">스튜디오 홈 <span>↗</span></a></header>
<main><section class="intro"><p class="eyebrow">GAME BANNERS <i>·</i> SHARE LINKS</p><h1>배너를 보고,<br><em>게임을 골라보세요.</em></h1><p class="lede">배너를 누르거나 아래 링크를 카카오톡에 붙여넣으면 게임명과 전용 이미지 미리보기가 표시됩니다.<br>링크를 누르면 Google Play로 이동합니다.</p></section>
<section class="banner-grid" aria-label="Google Play 게임 카카오톡 공유 링크">${cards}</section>
<footer><a class="brand" href="/"><img src="/assets/indang-succulent.svg" alt=""><span>INDANG <b>SOFT</b></span></a><span>ANDROID · GOOGLE PLAY</span><a href="/app-privacy/">개인정보처리방침</a></footer><p class="copy-status" aria-live="polite"></p></main></body></html>`;

const out = path.join(root, 'banners', 'index.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`Generated ${apps.length} Google Play game share links at /banners/.`);
