/* ============================================================
   测测你最像哪种植物 — 逻辑
   15 题 × 4 选项 → 6 种植物人格
   ============================================================ */

/* ---------- 1. 人格定义 ---------- */
const PLANTS = {
  sunflower: {
    name: '向日葵', tag: '追光型', color: '#E0912F', tint: '#FBEFD8', deep: '#A8641B', soft: '#F4C87E', line: '#B07A2C',
    desc: '你身上有一种把周围照亮的能力。不是刻意热情，而是你真的会因为别人的好消息而高兴。你习惯把情绪放在外面，难过时也想找个地方晒一晒。你怕被遗忘，所以总在不自觉地维护关系——但也请允许自己偶尔背对太阳，承认今天就是阴天。',
    tags: ['热烈', '外向', '主动', '容易被读懂'],
    care: [
      ['光照', '需要稳定的人际接触，长期独处会明显掉叶。'],
      ['水分', '一句回应、一次被需要就够了，用量不大但要勤。'],
      ['注意', '别把开朗当成不需要照顾，你也有不想发光的日子。']
    ]
  },
  monstera: {
    name: '龟背竹', tag: '深耕型', color: '#2F6B4F', tint: '#E4F0E7', deep: '#1E4C37', soft: '#7FBA96', line: '#2F6B4F',
    desc: '你是那种不急的人，但从不真的停下。别人看见的是结果，你自己清楚中间有多少个没人看见的步骤。你相信所有事情都能被拆解、被排序、被执行。要小心的地方在于：你会因为太可靠，把所有人的事都搬进自己的盆里。',
    tags: ['沉稳', '有条理', '长期主义', '容易过度负责'],
    care: [
      ['光照', '适合有长期目标的环境，短期刺激反而消耗你。'],
      ['水分', '需要"做完"的反馈，卡住太久就会停摆。'],
      ['注意', '定期修剪承诺，别人的事不必都由你兜底。']
    ]
  },
  cactus: {
    name: '仙人掌', tag: '节水型', color: '#6E9E7F', tint: '#E9F2EC', deep: '#4C7A5D', soft: '#A9CBB6', line: '#5A8C6E',
    desc: '你看起来不太需要人。边界守得很清楚，习惯先自己解决，解决不了再说——通常也就不需要说了。但刺从来不是用来伤人的，是为了在缺水的环境里活下去。真正靠近的人都知道，你内部储着很多柔软的东西，只是要够久才给。',
    tags: ['独立', '克制', '内里柔软', '慢热到极点'],
    care: [
      ['光照', '能很久不联系，不等于不需要关系。'],
      ['水分', '少而准。过密的关心会积水烂根。'],
      ['注意', '边界是保护不是拒绝，偶尔开一次花给别人看看。']
    ]
  },
  moss: {
    name: '苔藓', tag: '铺地型', color: '#74A05C', tint: '#EDF4E4', deep: '#4F7A3C', soft: '#A8C88C', line: '#6B9453',
    desc: '你不太起眼，也很少主动占据注意力的中心。但你安静地铺在那里，把一块地方变得能落脚。别人的情绪变化你往往第一个察觉，说得少，做得多。你只需要小心一件事：长期不发声，会让别人以为你真的没有需求。',
    tags: ['细腻', '稳定', '善于倾听', '存在感偏低'],
    care: [
      ['光照', '散射光就够，高强度社交会让你脱水。'],
      ['水分', '安静、可预期的关系，最让你长起来。'],
      ['注意', '不表达会被默认成不需要，偶尔请开口。']
    ]
  },
  dandelion: {
    name: '蒲公英', tag: '顺风型', color: '#7FA6C4', tint: '#E9F2F8', deep: '#4F7C9C', soft: '#B9D6E8', line: '#6E96B6',
    desc: '你对"稳定"这件事没有执念。想法来得快，兴趣换得也快——你不是没长性，你只是不愿意为了完成而完成。别人觉得你飘，其实你很早就想明白：留在原地，不一定比飘着更有安全感。你需要的是方向，不是根。',
    tags: ['自由', '好奇', '轻盈', '难以预测'],
    care: [
      ['光照', '在一个位置太久会蔫，换个环境恢复得很快。'],
      ['水分', '新鲜感就是水，重复最消耗你。'],
      ['注意', '飘不等于没方向，找到值得落地的地方不算妥协。']
    ]
  },
  sakura: {
    name: '樱花', tag: '一期一会型', color: '#E2839E', tint: '#FCEBF0', deep: '#B85C79', soft: '#F4B9C8', line: '#D07C95',
    desc: '你对"此刻"的敏感度高得惊人。一阵光、一句话、一个季节的转折，都能在你心里留很久。你享受强烈的感受，哪怕它注定短暂；不太擅长忍耐漫长而无感的时光。别人可能觉得你情绪化，其实那只是你对体验的要求比较高。',
    tags: ['敏锐', '浪漫', '强烈而短暂', '重质感'],
    care: [
      ['光照', '需要"被触动"的时刻，过于平淡会失去颜色。'],
      ['水分', '一段音乐、一次出行就够，比数量重要。'],
      ['注意', '花期短不等于没价值，别怕开始。']
    ]
  }
};

const ORDER = ['sunflower', 'monstera', 'cactus', 'moss', 'dandelion', 'sakura'];

/* ---------- 2. 题库（每题 4 项，主 +3 / 次 +1） ---------- */
const QUESTIONS = [
  { q: '突然空出一整天，什么安排都没有。你的第一反应是——',
    a: [
      { t: '立刻发消息约人，一个人待着太浪费了', s: { sunflower: 3, dandelion: 1 } },
      { t: '关掉通知，好好跟自己待一天', s: { moss: 3, monstera: 1 } },
      { t: '终于可以把拖了很久那件事做掉了', s: { monstera: 3, cactus: 1 } },
      { t: '出门瞎逛，看路上会撞见什么', s: { dandelion: 3, sakura: 1 } }
    ]},
  { q: '在一场热闹的聚会里，你通常在——',
    a: [
      { t: '人群中心，聊得最开的那个', s: { sunflower: 3, dandelion: 1 } },
      { t: '角落里，和一两个人慢慢聊', s: { moss: 3, sakura: 1 } },
      { t: '厨房或阳台，忙着给大家续菜倒水', s: { monstera: 3, sunflower: 1 } },
      { t: '中途出去透口气，或者干脆没到', s: { cactus: 3, moss: 1 } }
    ]},
  { q: '碰到一件很棘手的事，你多半会——',
    a: [
      { t: '先跟人吐槽一轮，情绪散了才好动手', s: { sunflower: 3, sakura: 1 } },
      { t: '列个清单，一步步把它拆掉', s: { monstera: 3, cactus: 1 } },
      { t: '自己闷头扛，不到关键不开口', s: { cactus: 3, moss: 1 } },
      { t: '换个方向绕过去，不一定要硬碰', s: { dandelion: 3, sakura: 1 } }
    ]},
  { q: '朋友最常这样形容你——',
    a: [
      { t: '有你在就热闹', s: { sunflower: 3, sakura: 1 } },
      { t: '靠谱，交给你就放心', s: { monstera: 3, cactus: 1 } },
      { t: '有点难接近，但懂了就离不开', s: { cactus: 3, moss: 1 } },
      { t: '想法很多，有点抓不住', s: { dandelion: 3, sakura: 1 } }
    ]},
  { q: '你的桌面（或房间）通常是——',
    a: [
      { t: '随手放，但自己都找得到', s: { dandelion: 3, sunflower: 1 } },
      { t: '规矩整洁，东西各有各的位置', s: { monstera: 3, cactus: 1 } },
      { t: '极简，几乎没什么多余的东西', s: { cactus: 3, moss: 1 } },
      { t: '摆满喜欢的小东西，抬手就能够到', s: { sakura: 3, sunflower: 1 } }
    ]},
  { q: '有人深夜找你倾诉，你会——',
    a: [
      { t: '一边听一边给建议', s: { sunflower: 3, monstera: 1 } },
      { t: '陪着听完，说一句"我在"', s: { moss: 3, sakura: 1 } },
      { t: '帮他把问题理清楚', s: { monstera: 3, cactus: 1 } },
      { t: '讲个自己更惨的事逗他笑', s: { sakura: 3, dandelion: 1 } }
    ]},
  { q: '计划突然被打乱，你心里多半是——',
    a: [
      { t: '有点烦，但马上能重新排一遍', s: { monstera: 3, sunflower: 1 } },
      { t: '反而松一口气，随它去吧', s: { dandelion: 3, moss: 1 } },
      { t: '会别扭一阵，需要时间消化', s: { moss: 3, sakura: 1 } },
      { t: '不动声色，自己悄悄把局面兜住', s: { cactus: 3, monstera: 1 } }
    ]},
  { q: '最能让你充电的是——',
    a: [
      { t: '晒太阳、走路、见到人', s: { sunflower: 3, dandelion: 1 } },
      { t: '一个人做点慢的事：做饭、打扫、发呆', s: { moss: 3, monstera: 1 } },
      { t: '学一个新东西，或者把一件事打通', s: { monstera: 3, cactus: 1 } },
      { t: '看一场日落、一阵风、听一首歌，被打动', s: { sakura: 3, moss: 1 } }
    ]},
  { q: '你更害怕的是——',
    a: [
      { t: '被遗忘', s: { sunflower: 3, sakura: 1 } },
      { t: '被困住', s: { dandelion: 3, cactus: 1 } },
      { t: '一切失控', s: { monstera: 3, cactus: 1 } },
      { t: '打扰到别人', s: { moss: 3, sakura: 1 } }
    ]},
  { q: '你理想里的"家"是——',
    a: [
      { t: '常有人来做客，饭桌永远够长', s: { sunflower: 3, monstera: 1 } },
      { t: '小而安稳，门一关就是全世界', s: { moss: 3, monstera: 1 } },
      { t: '简单耐造，随时可以搬走', s: { cactus: 3, dandelion: 1 } },
      { t: '窗要很大，光要好，季节要能进来', s: { sakura: 3, dandelion: 1 } }
    ]},
  { q: '有件想做很久的事迟迟没动手，多半卡在——',
    a: [
      { t: '想得太好，怕做出来不够好', s: { sakura: 3, moss: 1 } },
      { t: '步骤太多，光想想就累了', s: { monstera: 3, cactus: 1 } },
      { t: '其实也不是非要不可，拖着也行', s: { dandelion: 3, cactus: 1 } },
      { t: '没人一起做，一个人提不起劲', s: { sunflower: 3, moss: 1 } }
    ]},
  { q: '你表达喜欢的方式更像——',
    a: [
      { t: '直接说、直接约、直接抱', s: { sunflower: 3, dandelion: 1 } },
      { t: '记住他的小事，默默给办妥当', s: { moss: 3, monstera: 1 } },
      { t: '什么都不说，但一定会在', s: { cactus: 3, moss: 1 } },
      { t: '给他推荐歌、书、地方，说"这个很像你"', s: { sakura: 3, dandelion: 1 } }
    ]},
  { q: '睡不着的时候，你多半在——',
    a: [
      { t: '翻聊天记录，想起一大堆人', s: { sakura: 3, sunflower: 1 } },
      { t: '复盘今天说过的话，反复咂摸', s: { moss: 3, sakura: 1 } },
      { t: '想明天的安排，越想越清醒', s: { monstera: 3, cactus: 1 } },
      { t: '随便刷，刷到哪儿算哪儿', s: { dandelion: 3, cactus: 1 } }
    ]},
  { q: '别人对你的第一印象通常是——',
    a: [
      { t: '明亮，好接近', s: { sunflower: 3, sakura: 1 } },
      { t: '安静，不太好猜', s: { moss: 3, cactus: 1 } },
      { t: '稳，让人放心', s: { monstera: 3, moss: 1 } },
      { t: '有意思，但有点飘', s: { dandelion: 3, cactus: 1 } }
    ]},
  { q: '如果明天醒来变成一株植物，你希望自己长在——',
    a: [
      { t: '开阔向阳的山坡，谁都看得见我', s: { sunflower: 3, sakura: 1 } },
      { t: '安静的林下角落，只有细心的人会发现', s: { moss: 3, monstera: 1 } },
      { t: '干燥的旷野，靠自己也能活很久', s: { cactus: 3, dandelion: 1 } },
      { t: '不挑地方，风把我吹到哪儿就哪儿生根', s: { dandelion: 3, cactus: 1 } }
    ]}
];

const MAX_SCORE = QUESTIONS.length * 3;   // 45
const CHOICES = ['1', '2', '3', '4'];

/* ---------- 3. 植物插画 ---------- */
const ART = {
  sunflower(p) {
    let petals = '';
    for (let i = 0; i < 18; i++) {
      petals += `<ellipse cx="50" cy="20" rx="3.8" ry="8.4" fill="${p.soft}" transform="rotate(${i * 20} 50 42)"/>`;
    }
    for (let i = 0; i < 12; i++) {
      petals += `<ellipse cx="50" cy="26" rx="3.2" ry="6.6" fill="${p.color}" transform="rotate(${i * 30 + 15} 50 42)"/>`;
    }
    return `
      <path d="M50 94 V60" stroke="${p.line}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      <path d="M50 78 C38 78 31 71 31 60 C42 57 50 66 50 78Z" fill="${p.line}" opacity=".55"/>
      <path d="M50 68 C61 68 68 61 68 51 C58 48 50 57 50 68Z" fill="${p.deep}" opacity=".4"/>
      <g>${petals}</g>
      <circle cx="50" cy="42" r="11.5" fill="${p.deep}"/>
      <circle cx="50" cy="42" r="7.5" fill="${p.color}" opacity=".35"/>`;
  },

  monstera(p) {
    const holes = [
      [26, 74, 13, 6, -18], [22, 96, 15, 6, 6], [33, 116, 13, 6, 26],
      [74, 74, 13, 6, 18], [78, 96, 15, 6, -6], [67, 116, 13, 6, -26],
      [50, 66, 5, 9, 0], [50, 128, 5, 9, 0]
    ].map(h => `<ellipse cx="${h[0]}" cy="${h[1]}" rx="${h[2]}" ry="${h[3]}" fill="#000" transform="rotate(${h[4]} ${h[0]} ${h[1]})"/>`).join('');
    return `
      <defs>
        <mask id="mv">
          <path d="M50 22 C22 22 10 44 12 74 C14 108 30 132 50 136 C70 132 86 108 88 74 C90 44 78 22 50 22Z" fill="#fff"/>
          ${holes}
        </mask>
      </defs>
      <path d="M50 136 V92" stroke="${p.line}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
      <g mask="url(#mv)">
        <path d="M50 22 C22 22 10 44 12 74 C14 108 30 132 50 136 C70 132 86 108 88 74 C90 44 78 22 50 22Z" fill="${p.color}"/>
        <path d="M50 22 C34 40 34 110 50 136 C66 110 66 40 50 22Z" fill="${p.deep}" opacity=".22"/>
      </g>
      <path d="M50 34 V128" stroke="${p.soft}" stroke-width="2" stroke-linecap="round" opacity=".8" fill="none"/>`;
  },

  cactus(p) {
    let spikes = '';
    [[38, 52], [38, 62], [62, 44], [62, 54], [42, 40], [58, 36]].forEach(s => {
      spikes += `<path d="M${s[0]} ${s[1]} l-3 -3 M${s[0]} ${s[1]} l3 -3" stroke="${p.deep}" stroke-width="1.3" stroke-linecap="round" opacity=".65"/>`;
    });
    return `
      <path d="M18 92 H82" stroke="${p.soft}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M50 90 V46" stroke="${p.color}" stroke-width="17" stroke-linecap="round" fill="none"/>
      <path d="M50 70 C37 70 32 62 32 52 V40" stroke="${p.color}" stroke-width="11" stroke-linecap="round" fill="none"/>
      <path d="M50 60 C62 60 67 53 67 44 V36" stroke="${p.deep}" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/>
      <g>${spikes}</g>
      <circle cx="50" cy="30" r="5" fill="#E2839E"/>
      <circle cx="50" cy="30" r="2" fill="#fff" opacity=".6"/>`;
  },

  moss(p) {
    let tufts = '';
    for (let i = 0; i < 11; i++) {
      const x = 14 + i * 6.6;
      const h = 8 + (i % 3) * 4;
      tufts += `<path d="M${x} 84 q3 -${h} 6 0" stroke="${p.color}" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
    }
    let caps = '';
    [[38, 62], [50, 54], [62, 64]].forEach(c => {
      caps += `<path d="M${c[0]} 84 V${c[1]}" stroke="${p.deep}" stroke-width="1.6" stroke-linecap="round" fill="none"/>
               <ellipse cx="${c[0]}" cy="${c[1] - 3}" rx="3" ry="4.6" fill="${p.deep}"/>`;
    });
    return `
      <path d="M10 90 C26 78 74 78 90 90 Z" fill="${p.soft}"/>
      <path d="M12 92 C30 84 70 84 88 92 Z" fill="${p.color}" opacity=".55"/>
      <g>${caps}</g>
      <g>${tufts}</g>
      <circle cx="30" cy="86" r="2.4" fill="${p.deep}" opacity=".6"/>
      <circle cx="70" cy="87" r="2" fill="${p.deep}" opacity=".5"/>`;
  },

  dandelion(p) {
    const C = 50, Y = 42;
    let seeds = '';
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      const x2 = C + Math.cos(a) * 23, y2 = Y + Math.sin(a) * 23;
      const x1 = C + Math.cos(a) * 5, y1 = Y + Math.sin(a) * 5;
      seeds += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${p.line}" stroke-width=".9" opacity=".7"/>
                <circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="1.7" fill="${p.soft}"/>`;
    }
    let fly = '';
    [[76, 20], [88, 34], [70, 12]].forEach(f => {
      fly += `<g opacity=".75"><circle cx="${f[0]}" cy="${f[1]}" r="2.6" fill="${p.deep}"/>
              <path d="M${f[0]} ${f[1] - 2} l-2 -3 M${f[0] + 2} ${f[1] - 1} l0 -3.4 M${f[0] + 3} ${f[1] + 1} l2.4 -2" stroke="${p.line}" stroke-width=".8" stroke-linecap="round"/></g>`;
    });
    return `
      <path d="M50 94 Q47 66 50 44" stroke="${p.line}" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M50 80 C41 80 36 74 36 66 C45 64 50 71 50 80Z" fill="${p.color}" opacity=".5"/>
      <g>${seeds}</g>
      <circle cx="50" cy="42" r="5" fill="${p.deep}"/>
      <g>${fly}</g>`;
  },

  sakura(p) {
    const flower = (x, y, r) => {
      let p2 = '';
      for (let i = 0; i < 5; i++) {
        p2 += `<ellipse cx="${x}" cy="${y - r * 0.72}" rx="${r * 0.56}" ry="${r * 0.72}" fill="${p.soft}" transform="rotate(${i * 72} ${x} ${y})"/>`;
      }
      return `<g>${p2}<circle cx="${x}" cy="${y}" r="${r * 0.3}" fill="${p.deep}"/></g>`;
    };
    return `
      <path d="M14 92 C34 84 42 66 50 46" stroke="#8E6A55" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M32 78 C40 74 44 66 46 58" stroke="#8E6A55" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M42 64 C52 60 62 60 70 66" stroke="#8E6A55" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      ${flower(50, 40, 12)}
      ${flower(70, 62, 9)}
      ${flower(46, 60, 8)}
      ${flower(30, 74, 7)}
      <circle cx="64" cy="40" r="2.6" fill="${p.deep}" opacity=".45"/>`;
  }
};

/* ---------- 4. 状态与渲染 ---------- */
const $ = id => document.getElementById(id);

const els = {
  intro:  $('screen-intro'),
  quiz:   $('screen-quiz'),
  result: $('screen-result'),
  start:  $('btn-start'),
  back:   $('btn-back'),
  fill:   $('progress-fill'),
  count:  $('count'),
  bar:    $('progress'),
  qIndex: $('q-index'),
  qText:  $('q-text'),
  opts:   $('options'),
  hint:   $('hint'),
  art:    $('plant-art'),
  rName:  $('r-name'),
  rTag:   $('r-tag'),
  rDesc:  $('r-desc'),
  rTags:  $('r-tags'),
  rCare:  $('r-care'),
  rBars:  $('r-bars'),
  rSecond:$('r-second'),
  rPct:   $('r-pct'),
  ring:   $('ring-fg'),
  pctNote:$('r-pct-note'),
  eyebrow:$('r-eyebrow'),
  copy:   $('btn-copy'),
  link:   $('share-link'),
  linkA:  $('share-url'),
  copyLk: $('btn-copylink'),
  retry:  $('btn-retry'),
  toast:  $('toast'),
  sheet:  $('sheet'),
  mask:   $('sheet-mask'),
  poster: $('poster'),
  share:  $('btn-share'),
  save:   $('btn-save'),
  native: $('btn-nativeshare'),
  sClose: $('sheet-close'),
  sTip:   $('sheet-tip')
};

let current = 0;
const answers = new Array(QUESTIONS.length).fill(-1);
let topKey = null, topPct = 0;

function show(screen) {
  [els.intro, els.quiz, els.result].forEach(s => s.classList.remove('is-active'));
  screen.classList.add('is-active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
  current = 0;
  answers.fill(-1);
  render();
  show(els.quiz);
}

function render() {
  const q = QUESTIONS[current];
  const n = current + 1;

  els.qIndex.textContent = '第 ' + n + ' 题';
  els.qText.textContent = q.q;
  els.count.textContent = n + ' / ' + QUESTIONS.length;
  els.fill.style.width = (n / QUESTIONS.length * 100) + '%';
  els.bar.setAttribute('aria-valuenow', String(n));
  els.back.disabled = (current === 0);
  els.hint.textContent = '键盘按 1 – ' + q.a.length + ' 也能选';

  els.opts.innerHTML = '';
  q.a.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'opt';
    btn.style.animationDelay = (i * 60) + 'ms';
    btn.innerHTML = '<span class="num">' + (i + 1) + '</span><span>' + opt.t + '</span>';
    btn.addEventListener('click', () => pick(i));
    els.opts.appendChild(btn);
  });
}

let locked = false;
function pick(i) {
  if (locked) return;
  locked = true;
  answers[current] = i;

  const nodes = els.opts.querySelectorAll('.opt');
  nodes.forEach((node, k) => {
    if (k === i) node.classList.add('is-pick');
    else node.classList.add('is-dim');
  });

  setTimeout(() => {
    if (current < QUESTIONS.length - 1) {
      current++;
      render();
    } else {
      finish();
    }
    locked = false;
  }, 320);
}

function tally() {
  const score = {};
  ORDER.forEach(k => score[k] = 0);
  answers.forEach((pickIdx, qi) => {
    const s = QUESTIONS[qi].a[pickIdx].s;
    for (const k in s) score[k] += s[k];
  });
  return score;
}

function finish() {
  const score = tally();
  const total = ORDER.reduce((sum, k) => sum + score[k], 0);
  const ranked = ORDER.map(k => ({ k, v: score[k] })).sort((a, b) => b.v - a.v);
  topKey = ranked[0].k;
  const p = PLANTS[topKey];

  topPct = Math.max(18, Math.round(score[topKey] / MAX_SCORE * 100));

  els.art.style.background = p.tint;
  els.art.innerHTML = '<svg viewBox="0 0 100 100">' + ART[topKey](p) + '</svg>';
  document.getElementById('result-card').style.setProperty('--accent', p.color);

  els.rName.innerHTML = p.name + ' <span class="dot">·</span> ';
  els.eyebrow.textContent = '你的植物是';
  els.rTag.textContent = p.tag;
  els.rDesc.textContent = p.desc;

  els.rTags.innerHTML = '';
  p.tags.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    li.style.background = p.tint;
    li.style.color = p.deep;
    li.style.borderColor = p.soft;
    els.rTags.appendChild(li);
  });

  els.rCare.innerHTML = '';
  p.care.forEach(row => {
    const wrap = document.createElement('div');
    wrap.className = 'care-row';
    const dt = document.createElement('dt'); dt.textContent = row[0];
    const dd = document.createElement('dd'); dd.textContent = row[1];
    wrap.appendChild(dt); wrap.appendChild(dd);
    els.rCare.appendChild(wrap);
  });

  els.ring.style.stroke = p.color;
  els.ring.style.strokeDashoffset = String(326.7 * (1 - topPct / 100));
  els.rPct.textContent = String(topPct);
  els.pctNote.textContent = noteFor(topPct);

  els.rBars.innerHTML = '';
  ORDER.forEach(k => {
    const pc = Math.round(score[k] / total * 100);
    const row = document.createElement('div');
    row.className = 'bar-row' + (k === topKey ? ' is-top' : '');
    row.innerHTML =
      '<span class="name">' + PLANTS[k].name + '</span>' +
      '<span class="bar-track"><span class="bar-fill" style="background:' + PLANTS[k].color + '"></span></span>' +
      '<span class="val">' + pc + '%</span>';
    els.rBars.appendChild(row);
    // 双 rAF：确保初始 0 宽度先完成一次渲染，再设目标宽度，过渡动画才会触发
    requestAnimationFrame(() => requestAnimationFrame(() => {
      row.querySelector('.bar-fill').style.width = pc + '%';
    }));
  });

  const second = ranked[1];
  els.rSecond.textContent = '你的第二成分是' + PLANTS[second.k].name + '（占 ' +
    Math.round(second.v / total * 100) + '%）—— 在需要的时候，你会切换成它那一套去应付。';

  setupShareLink();
  show(els.result);
}

// 干净的地址：不带 hash / query，别把别人的来路参数一起分享出去
function siteUrl() {
  if (!/^https?:$/.test(location.protocol)) return '';
  return location.origin + location.pathname;
}

function setupShareLink() {
  const url = siteUrl();
  if (url) {
    els.linkA.href = url;
    els.linkA.textContent = url.replace(/^https?:\/\//, '');
    els.link.hidden = false;
  } else {
    els.link.hidden = true;
  }
}

// 复制到剪贴板：优先 Clipboard API，失败降级到 textarea + execCommand
async function writeClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = !!document.execCommand && document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

function noteFor(pct) {
  if (pct >= 75) return '你的倾向非常集中，几乎是这一株的标准样本。';
  if (pct >= 60) return '主要落在这一株上，偶尔会向邻近的品种偏一点。';
  if (pct >= 45) return '你身上混着好几种成分，这只是占比最高的那一株。';
  return '六种都说得通一点，说明你不太好被归类。';
}

/* ---------- 5. 交互 ---------- */
els.start.addEventListener('click', startQuiz);

els.back.addEventListener('click', () => {
  if (current > 0 && !locked) {
    current--;
    render();
  }
});

els.retry.addEventListener('click', startQuiz);

els.copyLk.addEventListener('click', async () => {
  const url = siteUrl();
  if (!url) return;
  // 部分聊天软件会把 http(s) 之外的东西识别不出来，这里就复制裸 URL
  const ok = await writeClipboard(url);
  say(ok ? '链接已复制，直接粘给朋友就能点开' : '复制失败，长按上面的链接试试');
});

els.copy.addEventListener('click', async () => {
  const p = PLANTS[topKey];
  const url = siteUrl();
  // URL 单独占一行：微信等客户端对整行裸链接的识别率最高
  const text =
    '【植物人格测试】我是' + p.name + ' · ' + p.tag + '\n' +
    '契合度 ' + topPct + '%　' + p.tags.join(' / ') + '\n\n' +
    '十五道题，三分钟，测测你最像哪种植物：\n' + url;
  const ok = await writeClipboard(text);
  say(ok ? '已复制，文案里带链接，朋友点开就能测' : '复制失败，改用上面的「复制链接」');
});

let toastTimer = null;
function say(msg) {
  els.toast.textContent = msg;
  els.toast.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('is-on'), 2200);
}

/* ---------- 6. 分享海报 ---------- */
const PW = 750, PH = 1060;
const FONT = "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif";

let posterUrl = null, posterFile = null, posterBusy = false;

function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// 中文每行 per 字；行首不留句号/叹号这类标点
function wrapCJK(text, per) {
  const stay = '，。、；：？！）》」"';
  const out = [];
  let line = '';
  for (let i = 0; i < text.length; i++) {
    line += text[i];
    if (line.length >= per) {
      const next = text[i + 1];
      if (next && stay.indexOf(next) > -1) { line += next; i++; }
      if (i < text.length - 1) { out.push(line); line = ''; }
    }
  }
  if (line) out.push(line);
  return out;
}

function buildPosterSVG() {
  const p = PLANTS[topKey];
  const lines = wrapCJK(p.desc.split('。').filter(Boolean).slice(0, 2).join('。') + '。', 21);

  // 关键词胶囊
  const gap = 14, pillH = 54;
  const widths = p.tags.map(t => t.length * 25 + 46);
  const totalW = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
  let x = (PW - totalW) / 2;
  const pills = p.tags.map((t, i) => {
    const w = widths[i];
    const s = '<rect x="' + x + '" y="0" width="' + w + '" height="' + pillH + '" rx="27" fill="' +
      p.tint + '" stroke="' + p.soft + '"/>' +
      '<text x="' + (x + w / 2) + '" y="' + (pillH / 2 + 9) + '" text-anchor="middle" font-size="24" font-weight="600" fill="' +
      p.deep + '" font-family="' + FONT + '">' + esc(t) + '</text>';
    x += w + gap;
    return s;
  }).join('');

  const descTop = 656, lineH = 44;
  const desc = lines.map((l, i) =>
    '<text x="375" y="' + (descTop + i * lineH) + '" text-anchor="middle" font-size="26" fill="#4C665C" font-family="' +
    FONT + '">' + esc(l) + '</text>').join('');
  const pillTop = descTop + lines.length * lineH + 22;
  const date = new Date().toLocaleDateString('zh-CN');

  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + PW + '" height="' + PH + '" viewBox="0 0 ' + PW + ' ' + PH + '">' +
    '<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#FFFDF8"/><stop offset="1" stop-color="#F4F1E7"/></linearGradient></defs>' +
    '<rect width="' + PW + '" height="' + PH + '" fill="url(#bg)"/>' +
    '<circle cx="706" cy="66" r="180" fill="' + p.color + '" opacity=".07"/>' +
    '<circle cx="36" cy="1016" r="150" fill="' + p.deep + '" opacity=".05"/>' +

    '<text x="375" y="88" text-anchor="middle" font-size="21" letter-spacing="6" font-weight="600" fill="#A8BCB0" font-family="' + FONT + '">植物人格测试</text>' +
    '<line x1="352" y1="114" x2="398" y2="114" stroke="#D8E2DA" stroke-width="2"/>' +

    '<circle cx="375" cy="300" r="150" fill="' + p.tint + '"/>' +
    '<g transform="translate(375,300) scale(2.35) translate(-50,-50)">' + ART[topKey](p) + '</g>' +

    '<text x="375" y="560" text-anchor="middle" font-size="64" font-weight="700" letter-spacing="3" fill="' + p.deep + '" font-family="' + FONT + '">' + esc(p.name) + '</text>' +
    '<text x="375" y="616" text-anchor="middle" font-size="30" letter-spacing="5" font-weight="600" fill="' + p.color + '" font-family="' + FONT + '">' + esc(p.tag) + '</text>' +
    desc +
    '<g transform="translate(0,' + pillTop + ')">' + pills + '</g>' +

    '<line x1="70" y1="' + (PH - 152) + '" x2="' + (PW - 70) + '" y2="' + (PH - 152) + '" stroke="#E4E9E2" stroke-width="1.5"/>' +
    '<text x="375" y="' + (PH - 106) + '" text-anchor="middle" font-size="25" fill="#7C9188" font-family="' + FONT + '">十五道题 · 三分钟 · 你是哪一种植物</text>' +
    '<text x="375" y="' + (PH - 60) + '" text-anchor="middle" font-size="20" fill="#A8BCB0" font-family="' + FONT + '">契合度 ' + topPct + '% · ' + date + '</text>' +
    '</svg>';
}

async function makePoster() {
  if (posterBusy) return;
  posterBusy = true;
  els.poster.classList.add('is-busy');
  els.poster.innerHTML = '';

  try {
    const svg = buildPosterSVG();
    const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = () => rej(new Error('svg load failed'));
      img.src = url;
    });

    const S = 2;
    const cv = document.createElement('canvas');
    cv.width = PW * S; cv.height = PH * S;
    const g = cv.getContext('2d');
    g.fillStyle = '#FBF9F4';
    g.fillRect(0, 0, cv.width, cv.height);
    g.drawImage(img, 0, 0, PW * S, PH * S);

    const blob = await new Promise(res => cv.toBlob(res, 'image/png'));
    if (!blob) throw new Error('toBlob failed');

    if (posterUrl) URL.revokeObjectURL(posterUrl);
    posterUrl = URL.createObjectURL(blob);
    posterFile = new File([blob], '植物人格-' + PLANTS[topKey].name + '.png', { type: 'image/png' });

    const photo = document.createElement('img');
    photo.src = posterUrl;
    photo.alt = '我的植物人格结果卡片';
    els.poster.innerHTML = '';
    els.poster.appendChild(photo);

    els.native.hidden = !(navigator.canShare && navigator.canShare({ files: [posterFile] }));
    openSheet();
  } catch (e) {
    say('卡片没画出来，先用下面的文案分享吧');
  } finally {
    els.poster.classList.remove('is-busy');
    posterBusy = false;
  }
}

function openSheet() {
  els.sheet.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeSheet() {
  els.sheet.hidden = true;
  document.body.style.overflow = '';
}

function savePoster() {
  if (!posterUrl) return;
  const a = document.createElement('a');
  a.href = posterUrl;
  a.download = '植物人格-' + PLANTS[topKey].name + '.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  say('已保存，去相册或文件夹找它');
}

async function nativeShare() {
  if (!posterFile) return;
  try {
    await navigator.share({
      files: [posterFile],
      title: '植物人格测试',
      text: '我是' + PLANTS[topKey].name + ' · ' + PLANTS[topKey].tag + '，你呢？',
      url: siteUrl() || undefined
    });
  } catch (e) {
    if (e && e.name !== 'AbortError') say('没发出去，试试直接保存图片');
  }
}

els.share.addEventListener('click', makePoster);
els.save.addEventListener('click', savePoster);
els.native.addEventListener('click', nativeShare);
els.sClose.addEventListener('click', closeSheet);
els.mask.addEventListener('click', closeSheet);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !els.sheet.hidden) closeSheet();
});

document.addEventListener('keydown', e => {
  if (!els.quiz.classList.contains('is-active')) return;
  const idx = CHOICES.indexOf(e.key);
  if (idx > -1 && idx < QUESTIONS[current].a.length && !locked) {
    pick(idx);
  } else if (e.key === 'Backspace' && current > 0 && !locked) {
    current--;
    render();
  }
});
