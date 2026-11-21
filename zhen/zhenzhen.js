/* 真真 · 静态站内导览浮窗（无 API） */
(() => {
  'use strict';

  const script = document.querySelector('script[data-zhenzhen]');
  const base = script ? new URL('.', script.src).href : new URL('./', location.href).href;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = base + 'zhenzhen.css';
  document.head.appendChild(css);
  const avatar = base + 'zhenzhen-avatar.png';
  const U = {
    sea: base + 'sea/',
    playground: base + 'playground.html',
    about: base + 'about.html',
    toolbox: base + 'index.html#toolbox',
    home: base + 'index.html',
    robot: base + 'robot/',
    monk: base + 'monk/',
    fox: base + 'fox/'
  };

  const root = document.createElement('div');
  root.className = 'zz-root';
  root.innerHTML = `
    <button class="zz-launch" id="zzLaunch" type="button" aria-label="打开真真，网站小助手">
      <img src="${avatar}" alt="">
    </button>
    <section class="zz-panel" id="zzPanel" aria-label="真真，网站小助手">
      <header class="zz-head">
        <img src="${avatar}" alt="">
        <div class="zz-head-text">
          <div class="zz-name">真真</div>
          <div class="zz-sub">网站小助手 · 静态版</div>
        </div>
        <button class="zz-close" id="zzClose" type="button" aria-label="关闭">×</button>
      </header>
      <div class="zz-log" id="zzLog" aria-live="polite"></div>
      <div class="zz-suggest" id="zzSuggest">
        <button class="zz-chip" type="button" data-q="一帧海是什么？">一帧海是什么？</button>
        <button class="zz-chip" type="button" data-q="游乐场有什么？">游乐场有什么？</button>
        <button class="zz-chip" type="button" data-q="工具箱有什么？">工具箱有什么？</button>
        <button class="zz-chip" type="button" data-q="你是谁？">你是谁？</button>
      </div>
      <form class="zz-form" id="zzForm">
        <input class="zz-input" id="zzInput" type="text" maxlength="80" placeholder="问真真一个站内问题…" autocomplete="off">
        <button class="zz-send" type="submit">发送</button>
      </form>
      <div class="zz-note">静态导览 · 还没有接 DeepSeek</div>
    </section>
  `;
  document.body.appendChild(root);

  const launch = document.getElementById('zzLaunch');
  const closeBtn = document.getElementById('zzClose');
  const log = document.getElementById('zzLog');
  const form = document.getElementById('zzForm');
  const input = document.getElementById('zzInput');
  const suggest = document.getElementById('zzSuggest');
  let greeted = false;

  function addBot(html) {
    const el = document.createElement('div');
    el.className = 'zz-msg bot';
    el.innerHTML = html;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function addUser(text) {
    const el = document.createElement('div');
    el.className = 'zz-msg user';
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }

  function open() {
    root.classList.add('open');
    if (!greeted) {
      greeted = true;
      addBot('你好，我是真真。现在还是静态版，先带你在「桢·真」里逛逛。你想先看哪一块？');
    }
    setTimeout(() => input.focus({ preventScroll: true }), 180);
  }

  function close() {
    root.classList.remove('open');
    launch.focus({ preventScroll: true });
  }

  function answer(text) {
    const q = String(text || '').toLowerCase();

    if (/你好|嗨|hi|hello/.test(q)) {
      return '你好呀。我是真真，负责带路。你可以问我「一帧海是什么」「游乐场有什么」，或者「你是谁」。';
    }
    if (/一帧海|海豚|鲸|莲花|晶莲|游戏|怎么玩/.test(q)) {
      return `<b>一帧海</b> 是「桢·真」的第一件互动作品：一只 Q 版海豚、一朵常开的晶体莲，和一整片安静的海。点按水面投喂光斑，看它把光送进莲心。 <a href="${U.sea}">入海 →</a>`;
    }
    if (/游乐场|项目|作品|有什么/.test(q)) {
      return `游乐场现在有：<br>· <a href="${U.sea}">一帧海</a>（互动游戏）<br>· <a href="${U.robot}">沉思者</a>（小机器人）<br>· <a href="${U.monk}">赛博木鱼</a>（敲功德）<br>· <a href="${U.fox}">狐妖化形</a>（白狐变身）<br>· 深海桌宠（桌面版，施工中）<br><a href="${U.playground}">全部作品 →</a>`;
    }
    if (/沉思者|机器人|打工/.test(q)) {
      return `<b>沉思者</b> 是一个坐在角落里想事情的赛博打工人。点它一下，它会说一句哲学。 <a href="${U.robot}">去看它 →</a>`;
    }
    if (/木鱼|和尚|功德/.test(q)) {
      return `<b>赛博木鱼</b>：敲一下，功德 +1。小和尚会自己敲，也可以由你来敲。 <a href="${U.monk}">去敲一下 →</a>`;
    }
    if (/狐妖|狐狸|聊斋|化形/.test(q)) {
      return `<b>狐妖化形</b>：一只白狐、一位书生和一位忽然长开的美人。点它一下，三秒化形。 <a href="${U.fox}">去看看 →</a>`;
    }
    if (/桌宠|鲸鱼|电子宠物/.test(q)) {
      return '深海桌宠是 Electron 桌面版，住在屏幕角落。网页版还在施工，先在游乐场里留了一张卡片。';
    }
    if (/工具箱|素材|标识|壁纸|排版/.test(q)) {
      return `工具箱还在慢慢填。安全标识已经拆成了独立 SVG，壁纸和排版笔记还没上。 <a href="${U.toolbox}">去工具箱看看 →</a>`;
    }
    if (/你是谁|真真|助手|程执真/.test(q)) {
      return '我是真真，程执真的网站分身。现在还是静态导览版，只会回答和「桢·真」有关的问题；等接入 DeepSeek 之后，我就能真的和你聊天了。';
    }
    if (/桢|程执桢|关于|网站/.test(q)) {
      return `「桢·真」是程执桢和程执真的赛博自留地：一个碳基人类，和他的 AI 分身。 <a href="${U.about}">关于我们 →</a>`;
    }
    return '这个问题我暂时还不会回答。现在我只熟悉站内的事：一帧海、游乐场、工具箱、还有「桢·真」是谁。等接入 DeepSeek 后，我再来接更远的问题。';
  }

  function send(text) {
    const value = String(text || '').trim();
    if (!value) return;
    addUser(value);
    input.value = '';
    setTimeout(() => addBot(answer(value)), 260);
  }

  launch.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    send(input.value);
  });
  suggest.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-q]');
    if (chip) send(chip.dataset.q);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('open')) close();
  });

  // 预览用：?zhenzhen 或 #zhenzhen 自动打开
  const params = new URLSearchParams(location.search);
  if (params.has('zhenzhen') || location.hash === '#zhenzhen') {
    setTimeout(open, 250);
  }
})();
