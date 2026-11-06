(() => {
  const $ = (s) => document.querySelector(s);
  const appSelect = $('#app-select'), draftTitle = $('#draft-title'), draftBody = $('#draft-body');
  const channelLabels = {naver:'NAVER BLOG',search:'GOOGLE · NAVER SEO',play:'GOOGLE PLAY ASO',instagram:'INSTAGRAM · REELS',tiktok:'TIKTOK',shorts:'YOUTUBE SHORTS',x:'X · THREADS',community:'FACEBOOK · COMMUNITY'};
  const channelUrls = {naver:'https://blog.naver.com/PostWriteForm.naver',search:'https://searchadvisor.naver.com/',play:'https://play.google.com/console/',instagram:'https://www.instagram.com/',tiktok:'https://www.tiktok.com/upload',shorts:'https://studio.youtube.com/',x:'https://twitter.com/intent/tweet',community:'https://www.facebook.com/'};
  const tasks = [
    ['랜딩페이지 확인','앱 이미지·단계·테스트 링크가 현재 상태와 맞는지 확인합니다.'],
    ['검색 자산 정리','대표 키워드 3개와 제목·설명 문구를 검토합니다.'],
    ['네이버 블로그 게시','초안을 앱 화면 캡처와 함께 검토해 게시합니다.'],
    ['SNS 한 곳에 게시','오늘의 한 장면 또는 짧은 영상을 골라 올립니다.'],
    ['커뮤니티에 대화 시작','홍보만 붙이지 말고 플레이 경험을 묻는 글로 참여합니다.'],
    ['링크·반응 기록','게시 링크, 클릭, 댓글·테스트 문의를 간단히 기록합니다.']
  ];
  let apps = [], channel = 'naver', timer;
  const today = new Date(), dayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  $('#today-label').textContent = new Intl.DateTimeFormat('ko-KR',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(today);
  const currentApp = () => apps.find(a => a.slug === appSelect.value) || apps[0];
  const trackLink = (app, source=channel) => `${location.origin}/go/${app.slug}/?utm_source=${encodeURIComponent(source)}&utm_medium=${source==='naver'?'organic_social':source==='search'?'organic_search':source==='play'?'play_store':'social'}&utm_campaign=${encodeURIComponent(app.slug+'-'+dayKey)}&utm_content=${encodeURIComponent(source+'-'+dayKey)}`;
  const tagList = (app) => app.keywords.slice(0,4).map(k=>'#'+k.replaceAll(' ','')).join(' ');
  function copy(text, success='복사했습니다.') {
    const done = () => toast(success);
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done).catch(()=>fallback(text,done)); else fallback(text,done);
  }
  function fallback(text, done) { const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();try{document.execCommand('copy');done()}catch(_){toast('복사할 수 없습니다. 초안을 길게 눌러 복사하세요.')}t.remove(); }
  function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('show'),1800)}
  function drafts(app){const url=trackLink(app);const tags=tagList(app);return {
    naver:{title:`${app.name} — ${app.hook}`,body:`${app.hook}\n\n${app.description}\n\n플레이 흐름은 ${app.loop}입니다.\n\n이런 분께 잘 맞아요: ${app.audience}.\n\n${app.facts.map(x=>'• '+x).join('\n')}\n\n현재 단계: ${app.stage}\n앱 소개와 소식: ${url}\n\n${tags}`},
    instagram:{title:`${app.short} / 오늘의 플레이`,body:`${app.hook}\n\n${app.description}\n\n${app.facts.map(x=>'✦ '+x).join('\n')}\n\n자세한 소개와 플레이 링크는 프로필 링크에서 확인하세요.\n${url}\n\n${tags} #인당소프트 #모바일게임`},
    tiktok:{title:`${app.name} | 15초 플레이 영상`,body:`[0–2초 / 첫 장면을 바로 보여주기]\n자막: “${app.hook}”\n\n[2–10초 / 실제 플레이 장면 2~3개]\n내레이션: ${app.loop}\n화면 자막: ${app.facts.join(' · ')}\n\n[10–15초 / 마무리]\n자막: “${app.name} 더 보기”\n프로필 링크: ${url}\n\n설명: ${app.description}\n${tags} #게임추천 #게임영상`},
    x:{title:`${app.name} | INDANG SOFT`,body:`${app.hook}\n${app.description}\n\n${url}\n\n${tags}`},
    shorts:{title:`${app.hook} | ${app.name} #shorts`,body:`[0–3초 / 훅]\n화면 소재: https://mike-kor.github.io${app.art}\n내레이션: “${app.hook}”\n\n[3–10초 / 플레이 흐름]\n화면: ${app.loop}\n자막: ${app.facts.join(' · ')}\n\n[10–15초 / 행동 유도]\n내레이션: “${app.name}의 세계를 만나보세요.”\n화면 자막: ${app.stage}\n링크: ${url}`},
    community:{title:`${app.name}: 이런 플레이 스타일 좋아하시나요?`,body:`요즘 ${app.name}을 만들고 있습니다.\n\n${app.description}\n\n플레이 흐름은 ${app.loop} 쪽이에요.\n\n${app.stage} 상태고, 소개 페이지에 현재 정보를 정리했습니다: ${url}\n\n여러분은 이 장르에서 어떤 순간이 가장 재미있나요?`},
    search:{title:`${app.name} | INDANG SOFT`,body:`검색 제목\n${app.name} — ${app.hook}\n\n검색 설명\n${app.description} ${app.stage}.\n\n핵심 검색어\n${app.keywords.join(' · ')}\n\n색인 주소\nhttps://mike-kor.github.io/go/${app.slug}/\n\n체크\n□ Google Search Console에서 sitemap.xml 제출·색인 상태 확인\n□ Naver Search Advisor에서 사이트 등록·수집 현황 확인\n□ 실제 앱 화면과 설명이 일치하는지 검토\n□ 앱 상태가 바뀌면 전용 랜딩과 링크를 갱신`},
    play:{title:app.platform.includes('android')?app.name:`${app.name} — Google Play 대상 아님`,body:app.platform.includes('android')?`Google Play 앱 이름\n${app.name}\n\n짧은 설명 (${(app.storeShort||app.hook).length}/80자)\n${app.storeShort||app.hook}\n\n자세한 설명 초안\n${app.hook}\n\n${app.description}\n\n주요 특징\n${app.facts.map(x=>'• '+x).join('\n')}\n\n이런 분께\n${app.audience}\n\n현재 단계: ${app.stage}\n전용 링크: ${url}\n\n출시 전 점검\n□ 앱 실제 기능과 문구·스크린샷 일치\n□ 테스트/출시 상태와 국가·언어 타깃 확인\n□ 공개 Play 링크가 준비된 뒤에만 설치 버튼 게시`:`이 프로젝트는 웹에서 플레이하는 서비스입니다. Google Play 앱 등록정보는 만들지 말고, 웹 랜딩·검색 미리보기와 ${url} 링크를 사용하세요.`}
  };}
  function renderDraft(){const app=currentApp();if(!app)return;const d=drafts(app)[channel];$('#draft-channel').textContent=channelLabels[channel];$('#draft-count').textContent=`${app.name} · ${dayKey}`;draftTitle.value=d.title;draftBody.value=d.body;const a=$('#open-channel');const url=trackLink(app);if(channel==='x'){a.href=`https://twitter.com/intent/tweet?text=${encodeURIComponent(d.body)}&url=${encodeURIComponent(url)}`}else if(channel==='community'){a.href=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}else{a.href=channelUrls[channel]}a.textContent=channel==='search'?'검색 도구 열기 ↗':channel==='play'?'Google Play Console 열기 ↗':channel==='tiktok'?'TikTok 업로드 열기 ↗':'채널 열기 ↗';const asset=$('#asset-link');asset.href=`https://mike-kor.github.io${app.art}`;asset.setAttribute('aria-label',`${app.name} 이미지 소재 미리보기`);$('#campaign-link').value=url;$('#campaign-source').textContent=`utm_source=${channel}`;$('#app-stage').textContent=app.stage;}
  function renderTasks(){const key=`indang-growth:${currentApp().slug}:${dayKey}`;let done=[];try{done=JSON.parse(localStorage.getItem(key)||'[]')}catch(_){}$('#task-list').innerHTML=tasks.map(([name,desc],i)=>`<label class="task ${done.includes(i)?'done':''}"><input type="checkbox" data-task="${i}" ${done.includes(i)?'checked':''}><span><strong>${name}</strong><small>${desc}</small></span></label>`).join('');const pct=Math.round(done.length/tasks.length*100);$('#progress-label').textContent=`${done.length} / ${tasks.length}`;$('#progress-bar').style.width=`${pct}%`;$('#task-list').querySelectorAll('input').forEach(cb=>cb.addEventListener('change',()=>{const xs=[...$('#task-list').querySelectorAll('input:checked')].map(x=>Number(x.dataset.task));try{localStorage.setItem(key,JSON.stringify(xs))}catch(_){}renderTasks()}));}
  appSelect.addEventListener('change',()=>{renderDraft();renderTasks()});document.querySelectorAll('.channel-tab').forEach(b=>b.addEventListener('click',()=>{channel=b.dataset.channel;document.querySelectorAll('.channel-tab').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active))});renderDraft()}));
  $('#copy-link').addEventListener('click',()=>copy($('#campaign-link').value,'추적 링크를 복사했습니다.'));
  $('#copy-draft').addEventListener('click',()=>copy(`${draftTitle.value}\n\n${draftBody.value}`,'초안을 복사했습니다.'));
  $('#copy-all').addEventListener('click',()=>{const app=currentApp(),all=drafts(app);copy(`${app.name} · ${dayKey}\n\n${Object.entries(all).map(([k,v])=>`=== ${channelLabels[k]} ===\n${v.title}\n\n${v.body}`).join('\n\n--------------------\n\n')}`,'오늘의 채널별 팩을 복사했습니다.')});
  $('#reset-day').addEventListener('click',()=>{try{localStorage.removeItem(`indang-growth:${currentApp().slug}:${dayKey}`)}catch(_){}renderTasks();toast('오늘 체크를 초기화했습니다.')});
  fetch('/growth/apps.json').then(r=>r.json()).then(data=>{apps=data;appSelect.innerHTML=apps.map(a=>`<option value="${a.slug}">${a.name}</option>`).join('');const prior=localStorage.getItem('indang-growth-app');if(prior&&apps.some(a=>a.slug===prior))appSelect.value=prior;appSelect.addEventListener('change',()=>{try{localStorage.setItem('indang-growth-app',appSelect.value)}catch(_){}});renderDraft();renderTasks()}).catch(()=>toast('앱 목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.'));
})();
