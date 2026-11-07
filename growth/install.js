(() => {
  const body = document.body;
  const destination = body.dataset.destination;
  const isWeb = body.dataset.kind === 'web';
  const publicRelease = body.dataset.auto === 'true';
  const link = document.querySelector('#continue-link');
  const note = document.querySelector('#handoff-note');
  const params = new URLSearchParams(location.search);
  const tracked = new URL(destination);
  for (const key of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term']) {
    if (params.has(key)) tracked.searchParams.set(key, params.get(key));
  }
  link.href = tracked.href;
  if (!publicRelease && !isWeb) {
    document.querySelector('#handoff-title').textContent = '스토어 등록정보를 확인할 수 있어요';
    note.textContent = '테스트 중인 앱은 참여 권한이 필요할 수 있습니다. 버튼을 눌러 Google Play를 확인하세요.';
    document.querySelector('.spinner').style.animation = 'none';
  }
  window.setTimeout(() => { location.replace(tracked.href); }, publicRelease ? 1250 : 2200);
})();
