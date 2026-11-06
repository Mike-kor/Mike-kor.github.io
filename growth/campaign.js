(() => {
  const params = new URLSearchParams(location.search);
  const source = params.get('utm_source');
  document.querySelectorAll('[data-destination]').forEach(link => {
    const url = new URL(link.dataset.destination);
    for (const key of ['utm_source','utm_medium','utm_campaign','utm_content']) if (params.has(key)) url.searchParams.set(key, params.get(key));
    link.href = url.toString();
    link.addEventListener('click', () => {
      try { const key = `indang-clicks:${location.pathname}:${source || 'direct'}`; localStorage.setItem(key, String(Number(localStorage.getItem(key)||0)+1)); } catch (_) {}
    });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    const url = new URL(link.href);
    const body = new URLSearchParams(url.search).get('body') || '';
    const campaign = new URLSearchParams(location.search);
    const attribution = ['utm_source','utm_medium','utm_campaign','utm_content'].filter(k => campaign.has(k)).map(k => `${k}=${campaign.get(k)}`).join('&');
    if (attribution && !body.includes('utm_source=')) url.searchParams.set('body', `${body}${body ? '\n\n' : ''}캠페인 정보: ${attribution}`);
    link.href = url.toString();
  });
})();
