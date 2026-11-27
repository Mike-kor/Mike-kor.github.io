const status = document.querySelector('.copy-status');

async function copyLink(button) {
  const value = button.dataset.copyUrl;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  button.textContent = '복사했어요';
  status.textContent = `${value} 링크를 복사했습니다.`;
  window.setTimeout(() => { button.textContent = '링크 복사'; }, 1800);
}

document.querySelectorAll('.copy-link').forEach(button => {
  button.addEventListener('click', () => copyLink(button));
});
