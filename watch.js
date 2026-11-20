/* CodeKids Academy: "Watch & Do" narrated step animations.
   ONE renderer is shared by:
     • the in-app player (index.html → openWatch), narrated by the device's voice
     • the MP4 maker (scripts/make-videos.sh), narrated by the Mac's voice
   drawScene() is a pure function of (scene, time), so videos and the app look identical.
   Scenes are written for children aged 5–9: short sentences, one idea per scene. */
(function (root) {
  'use strict';

  /* ── SCRIPTS ─────────────────────────────────────────────────────────────
     scene = { say: 'narration (read aloud)', cap?: 'shorter caption', v: visual type, ...params }
     Visual types: title, emoji, steps, bug, check, cards, grid, blocks, turtle, apple, branch, code
     Grid moves: U D L R, repeats as 'R*3'. Grid coordinates are [row, col] with row 0 at the top. */
  const WATCH = {
    'p0-1': { title: 'Robot Chef', e: '🤖', scenes: [
      { v: 'title', e: '🤖', title: 'Robot Chef', sub: 'Program a grown-up robot!', say: "Let's play Robot Chef! Today, a grown-up is your robot." },
      { v: 'emoji', e: '🍽️', items: ['🍪', '🧀', '🍇'], say: 'First, pick a simple snack, like crackers and cheese. Put everything on the table.' },
      { v: 'steps', lines: ['1. Pick up one cracker', '2. Put it on the plate', '3. Put cheese on'], say: 'A robot does exactly what you say. Nothing more, nothing less! Say your steps, one at a time.' },
      { v: 'bug', e: '🤖', what: 'Cheese on its head?!', say: "Uh oh! If you say put cheese on, the robot might put cheese on its head! That's a bug." },
      { v: 'steps', lines: ['1. Pick up one cracker', '2. Put it on the plate', '3. Put cheese ON THE CRACKER'], hl: 2, say: 'Fix the step so it says exactly what you mean. Then run your program again, from the start.' },
      { v: 'check', items: ['The robot made the snack', 'Only your steps were used', 'You found and fixed a bug'], say: 'You did it when the robot makes the snack using only your steps. Yum! Now you try!' },
    ]},
    'p0-2': { title: 'Floor Maze Adventure', e: '🗺️', scenes: [
      { v: 'title', e: '🗺️', title: 'Floor Maze Adventure', sub: 'Help the robot find the treasure', say: "Let's build a maze, and program a robot to find the treasure!" },
      { v: 'grid', n: 4, start: [3, 0], goal: [1, 3], rocks: [[2, 1], [3, 2]], prog: [], say: 'Make a grid of four by four squares. Put the robot on start, the treasure on a square, and add some rocks.' },
      { v: 'cards', cards: ['U', 'U', 'R', 'R', 'R'], say: 'Now plan the whole path with arrow cards, before you move anything. Each card moves the robot one square.' },
      { v: 'grid', n: 4, start: [3, 0], goal: [1, 3], rocks: [[2, 1], [3, 2]], prog: ['U', 'R', 'R', 'R', 'U'], say: "Run the program! Move one square for each card. Oh no, it bumped into a rock. That's a bug!" },
      { v: 'grid', n: 4, start: [3, 0], goal: [1, 3], rocks: [[2, 1], [3, 2]], prog: ['U', 'U', 'R', 'R', 'R'], say: 'Find the wrong card, fix it, and run it again. Yes! The robot found the treasure!' },
      { v: 'check', items: ['Plan all the cards first', 'Solve 3 different mazes', 'Try a repeat card!'], say: 'Try three different mazes. Can you solve them on the first try? Now you try!' },
    ]},
    'p0-3': { title: 'Treasure Hunt Code', e: '🏴‍☠️', scenes: [
      { v: 'title', e: '🏴‍☠️', title: 'Treasure Hunt Code', sub: 'You are the coder!', say: 'You are the coder today! Hide a treasure, and write the code to find it.' },
      { v: 'emoji', e: '🧸', items: ['🛋️', '🚪', '🪴'], say: 'Hide a small treasure at home. Then draw a map, with where you start and where the treasure is.' },
      { v: 'grid', n: 4, start: [3, 0], goal: [1, 3], rocks: [[2, 1]], prog: ['R*3', 'U', 'U'], say: 'Write your code with arrows. Use a repeat card to make it shorter. Repeat three times, go right!' },
      { v: 'emoji', e: '🕵️', items: ['📜', '👣', '🎁'], say: 'Give your code to someone in your family. No hints allowed! Can they find the treasure?' },
      { v: 'check', items: ['They found it with your code', 'Your code used a repeat', 'You made your code better'], say: 'Ask what was confusing, and make your code even better. Now you try!' },
    ]},
    'p1-1': { title: 'Hello, Cat!', e: '🐱', scenes: [
      { v: 'title', e: '🐱', title: 'Hello, Cat!', sub: 'Your first ScratchJr program', say: "Let's make a cat walk, jump, and say hello!" },
      { v: 'blocks', actor: '🐱', blocks: ['flag', 'right', 'right', 'right', 'hop', 'say:Hello!'], say: 'Open ScratchJr. Drag a green flag block. Then add move right blocks, a hop block, and a speech bubble.' },
      { v: 'blocks', actor: '🐱', blocks: ['flag', 'right', 'right', 'right', 'hop', 'say:Hello!'], run: true, say: 'Tap the green flag to run your program. Look! The cat walks, jumps, and says hello!' },
      { v: 'emoji', e: '🎨', items: ['🏖️', '🌳', '🏰'], say: 'Pick a background you like, like the beach, a forest, or a castle.' },
      { v: 'check', items: ['It starts with the green flag', 'It uses 3 or more blocks', 'Bonus: a friend says hi back!'], say: 'Great job! Can you add a second character that says hello back? Now you try!' },
    ]},
    'p1-2': { title: 'Snowflake Loops', e: '❄️', scenes: [
      { v: 'title', e: '❄️', title: 'Snowflake Loops', sub: 'Code art with loops', say: "Let's draw with code, and find out how loops make code shorter!" },
      { v: 'turtle', shape: 'square', code: ['move', 'turn ↻', 'move', 'turn ↻', 'move', 'turn ↻', 'move', 'turn ↻'], say: "Draw a square with four move blocks and four turn blocks. That's eight blocks!" },
      { v: 'turtle', shape: 'square', code: ['repeat 4 ×', '   move', '   turn ↻'], say: 'Now use a repeat block. Repeat four times: move, then turn. The same square, with only three blocks!' },
      { v: 'turtle', shape: 'snowflake', code: ['repeat 8 ×', '   draw a square', '   turn a little'], say: 'Put the square inside another repeat, and turn a little each time. A snowflake!' },
      { v: 'check', items: ['Your snowflake uses repeat', 'You can say why repeat is shorter', 'Bonus: change the number of arms'], say: 'If the shape looks wrong, count the turns, and fix the bug. Now you try!' },
    ]},
    'p1-3': { title: 'Animated Birthday Card', e: '🎂', scenes: [
      { v: 'title', e: '🎂', title: 'Animated Birthday Card', sub: 'Make a surprise for someone', say: "Let's make an animated birthday card for someone special!" },
      { v: 'steps', lines: ['First: 🐱 says Happy Birthday', 'Next: 🎈 a balloon flies up', 'End: 🎉 surprise!'], say: 'First, draw a plan on paper. What happens first, next, and at the end?' },
      { v: 'blocks', actor: '🐱', blocks: ['flag', 'say:Happy Birthday!'], run: true, say: 'Start with a green flag, and make your character say happy birthday.' },
      { v: 'blocks', actor: '🎈', blocks: ['tap', 'up', 'up', 'up'], run: true, say: 'Add a tap trigger. When you touch the balloon, it flies up! Surprise!' },
      { v: 'emoji', e: '🎤', items: ['🎵', '💜', '🎵'], say: 'Record your voice singing, or saying a happy message.' },
      { v: 'check', items: ['It plays start to finish', '2 characters, 2 triggers', 'You showed it and explained it'], say: 'Show your card to the birthday person, and tell them how it works. Now you try!' },
    ]},
    'p2-1': { title: 'Catch the Apple', e: '🍎', scenes: [
      { v: 'title', e: '🍎', title: 'Catch the Apple', sub: 'Your first Scratch game', say: "Let's make a game in Scratch! Apples fall from the sky, and you catch them with a bowl." },
      { v: 'code', lines: ['when ⬅️ key pressed → change x by -10', 'when ➡️ key pressed → change x by 10'], say: 'Make a bowl sprite that moves left and right with the arrow keys.' },
      { v: 'apple', score: false, say: 'Add an apple. It starts at the top, in a random place, and falls down.' },
      { v: 'code', lines: ['when 🏁 clicked → set score to 0', 'if touching bowl? then', '   change score by 1', '   go to the top, random x'], say: 'Make a variable called score. When the apple touches the bowl, add one point, and send the apple back to the top.' },
      { v: 'apple', score: true, say: 'Play your game! Every catch adds a point.' },
      { v: 'check', items: ['Score goes up only on a catch', 'Apple restarts in a random place', 'Bonus: a 30 second timer'], say: 'Test it, and fix anything that feels unfair. Now you try!' },
    ]},
    'p2-2': { title: 'Choose-Your-Path Story', e: '📖', scenes: [
      { v: 'title', e: '📖', title: 'Choose-Your-Path Story', sub: 'The reader decides!', say: "Let's make a story where the reader chooses what happens next!" },
      { v: 'branch', say: 'Draw a story map: a start, a choice, and two different endings.' },
      { v: 'code', lines: ['ask "Go into the cave or the beach?"', 'if answer = cave then', '   broadcast 🦇 cave', 'else', '   broadcast 🏖️ beach'], say: 'Use ask and wait for the choice. Then use if, else, to jump to the right scene.' },
      { v: 'branch', walk: true, say: 'Play every path, one by one, to make sure none of them break.' },
      { v: 'check', items: ['2 choices, 2 endings', 'Every path tested', 'Bonus: count the choices'], say: 'Two choices and two endings, and every path works. Now you try!' },
    ]},
    'p2-3': { title: 'Arcade Game + Play Test', e: '🕹️', scenes: [
      { v: 'title', e: '🕹️', title: 'Arcade Game', sub: 'Design it. Test it. Improve it.', say: "Let's design your own arcade game, and make it better with real players!" },
      { v: 'steps', lines: ['💡 Write your game idea', '👾 Player, enemies and lives', '⬆️ Level 2 is harder', '🏆 Win and 💀 game-over screens', '🙏 Credit any borrowed art'], say: 'Write your idea, then build it step by step: a player, enemies, lives, a harder level two, and win and lose screens.' },
      { v: 'emoji', e: '🎮', items: ['🧒', '👀', '🧑'], say: 'Now ask two people to play your game. Watch them, and write down what they say.' },
      { v: 'steps', lines: ['Too hard? → slow the enemies', 'Confusing? → add instructions', 'Write a change log ✍️'], hl: 2, say: 'Fix two things from their feedback, and write what you changed in a change log.' },
      { v: 'check', items: ['Lives, 2 levels, win + lose', '2 testers, 2 fixes', 'Borrowed art is credited'], say: "That's how real game designers work. Now you try!" },
    ]},
  };

  /* ── TIMING ──────────────────────────────────────────────────────────── */
  const MOVE = 0.75;
  function expandProg(prog) {
    const moves = []; // [{d, card}]
    (prog || []).forEach((c, ci) => {
      const m = /^([UDLR])(?:\*(\d))?$/.exec(c);
      if (!m) return;
      for (let k = 0; k < (m[2] ? +m[2] : 1); k++) moves.push({ d: m[1], card: ci });
    });
    return moves;
  }
  function blockActions(blocks) {
    return blocks.filter(b => !['flag', 'tap'].includes(b)).map(b => ({ b, dur: b.startsWith('say:') ? 1.6 : b === 'hop' ? 0.8 : 0.6 }));
  }
  function sceneLength(sc) {
    switch (sc.v) {
      case 'title': return 2.5;
      case 'emoji': return 1.2 + (sc.items || []).length * 0.6;
      case 'steps': return 0.8 * sc.lines.length + 0.8;
      case 'bug': return 2.2;
      case 'check': return 0.9 * sc.items.length + 1.0;
      case 'cards': return 0.5 * sc.cards.length + 1.0;
      case 'grid': { const n = expandProg(sc.prog).length; return n ? 0.8 + n * MOVE + 1.6 : 2.2; }
      case 'blocks': { const tb = 0.5 * sc.blocks.length + 0.4; return sc.run ? tb + 0.6 + blockActions(sc.blocks).reduce((s, a) => s + a.dur, 0) + 1.2 : tb + 0.6; }
      case 'turtle': return sc.code.length * 0.35 + (sc.shape === 'snowflake' ? 5.5 : 3) + 1;
      case 'apple': return 7;
      case 'branch': return sc.walk ? 6.5 : 3.5;
      case 'code': return 0.8 * sc.lines.length + 0.8;
      default: return 2;
    }
  }

  /* ── DRAWING HELPERS ─────────────────────────────────────────────────── */
  const W = 1080, H = 1080;
  const C = { bg1: '#141833', bg2: '#0b0e1c', card: '#1b2036', line: '#2e3860', text: '#f1f2fb', muted: '#9aa0c4', purple: '#7c6fff', teal: '#00d4aa', yellow: '#ffd166', pink: '#ff6b9d', orange: '#ff9f43', red: '#ff6b6b', blue: '#48dbfb' };
  const EMOJI = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  const SANS = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const easeOut = x => 1 - Math.pow(1 - clamp(x), 3);
  const pop = x => { x = clamp(x); return x < 0.7 ? easeOut(x / 0.7) * 1.12 : 1.12 - 0.12 * ((x - 0.7) / 0.3); };
  function rr(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
  function emoji(ctx, e, x, y, size, scale = 1, alpha = 1) {
    if (scale <= 0.01 || alpha <= 0) return;
    ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.scale(scale, scale);
    // a solid fillStyle matters: WebKit paints colour emoji with the current fill if it's a gradient
    ctx.fillStyle = '#000'; ctx.font = `${size}px ${EMOJI}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(e, 0, size * 0.04);
    ctx.restore();
  }
  function text(ctx, s, x, y, size, color = C.text, weight = 700, align = 'center', alpha = 1) {
    ctx.save(); ctx.globalAlpha = alpha; ctx.font = `${weight} ${size}px ${SANS}`; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y); ctx.restore();
  }
  function wrap(ctx, s, maxW, size, weight = 600) {
    ctx.font = `${weight} ${size}px ${SANS}`;
    const words = s.split(' '), lines = []; let cur = '';
    words.forEach(w => { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
    if (cur) lines.push(cur);
    return lines;
  }
  function background(ctx) {
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, C.bg1); g.addColorStop(1, C.bg2);
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const r = ctx.createRadialGradient(W * 0.2, H * 0.1, 10, W * 0.2, H * 0.1, 700); r.addColorStop(0, 'rgba(124,111,255,.18)'); r.addColorStop(1, 'rgba(124,111,255,0)');
    ctx.fillStyle = r; ctx.fillRect(0, 0, W, H);
  }
  const ARROW = { U: '↑', D: '↓', L: '←', R: '→' };
  const ACOL = { U: C.purple, R: C.teal, D: C.pink, L: C.orange };
  function arrowCard(ctx, c, x, y, s, scale = 1, glow = false) {
    const m = /^([UDLR])(?:\*(\d))?$/.exec(c); if (!m) return;
    ctx.save(); ctx.translate(x + s / 2, y + s / 2); ctx.scale(scale, scale); ctx.translate(-s / 2, -s / 2);
    if (glow) { ctx.shadowColor = C.yellow; ctx.shadowBlur = 28; }
    rr(ctx, 0, 0, s, s, s * 0.16); ctx.fillStyle = '#fff'; ctx.fill(); ctx.shadowBlur = 0;
    ctx.lineWidth = glow ? 7 : 3; ctx.strokeStyle = glow ? C.yellow : '#c9cbe0'; ctx.stroke();
    text(ctx, ARROW[m[1]], s / 2, s * (m[2] ? 0.42 : 0.5), s * 0.62, ACOL[m[1]], 900);
    if (m[2]) text(ctx, '🔁 ' + m[2] + '×', s / 2, s * 0.82, s * 0.2, '#1d2033', 800);
    ctx.restore();
  }

  /* ── VISUALS ─────────────────────────────────────────────────────────── */
  const VIS = { top: 150, bottom: 790 };
  const V = {};
  V.title = (ctx, sc, t) => {
    const s = pop(t / 0.8) * (1 + 0.04 * Math.sin(t * 3));
    emoji(ctx, sc.e, W / 2, 380, 260, s);
    text(ctx, sc.title, W / 2, 610, 78, C.text, 900, 'center', clamp((t - 0.4) / 0.5));
    text(ctx, sc.sub || '', W / 2, 690, 42, C.teal, 600, 'center', clamp((t - 0.8) / 0.5));
  };
  V.emoji = (ctx, sc, t) => {
    emoji(ctx, sc.e, W / 2, 360, 230, pop(t / 0.7) * (1 + 0.03 * Math.sin(t * 2.5)));
    const items = sc.items || [], gap = 220, x0 = W / 2 - (items.length - 1) * gap / 2;
    items.forEach((it, i) => emoji(ctx, it, x0 + i * gap, 640, 140, pop((t - 0.8 - i * 0.6) / 0.5)));
  };
  V.steps = (ctx, sc, t) => {
    const n = sc.lines.length, h = Math.min(110, 560 / n), y0 = VIS.top + (VIS.bottom - VIS.top - n * (h + 18)) / 2;
    sc.lines.forEach((ln, i) => {
      const a = clamp((t - 0.3 - i * 0.8) / 0.4); if (!a) return;
      const y = y0 + i * (h + 18), hl = sc.hl === i && t > 0.3 + i * 0.8 + 0.4;
      ctx.save(); ctx.globalAlpha = a; ctx.translate((1 - easeOut(a)) * -60, 0);
      rr(ctx, 90, y, W - 180, h, 22); ctx.fillStyle = hl ? 'rgba(0,212,170,.18)' : C.card; ctx.fill();
      ctx.lineWidth = hl ? 5 : 2; ctx.strokeStyle = hl ? C.teal : C.line; ctx.stroke();
      text(ctx, ln, 130, y + h / 2, Math.min(48, h * 0.42), hl ? C.teal : C.text, 700, 'left');
      ctx.restore();
    });
  };
  V.bug = (ctx, sc, t) => {
    emoji(ctx, sc.e || '🤖', W / 2 - 150, 430, 240, pop(t / 0.6));
    const wob = Math.sin(t * 9) * 0.12;
    ctx.save(); ctx.translate(W / 2 + 190, 360); ctx.rotate(wob); emoji(ctx, '🐞', 0, 0, 200, pop((t - 0.5) / 0.5)); ctx.restore();
    text(ctx, 'BUG!', W / 2 + 190, 520, 84, C.red, 900, 'center', clamp((t - 0.8) / 0.3));
    text(ctx, sc.what || '', W / 2, 680, 50, C.yellow, 700, 'center', clamp((t - 1.1) / 0.4));
  };
  V.check = (ctx, sc, t) => {
    const n = sc.items.length, y0 = 230;
    text(ctx, '✅ Done when…', W / 2, 190, 52, C.teal, 900, 'center', clamp(t / 0.4));
    sc.items.forEach((it, i) => {
      const a = clamp((t - 0.5 - i * 0.9) / 0.4); if (!a) return;
      const y = y0 + 40 + i * 140;
      ctx.save(); ctx.globalAlpha = a;
      rr(ctx, 110, y, W - 220, 110, 24); ctx.fillStyle = C.card; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.line; ctx.stroke();
      ctx.restore();
      emoji(ctx, '✅', 180, y + 55, 64, pop((t - 0.8 - i * 0.9) / 0.4));
      text(ctx, it, 240, y + 55, 44, C.text, 700, 'left', a);
    });
    const yt = y0 + 60 + n * 140;
    if (yt < VIS.bottom) text(ctx, 'Now you try! 🚀', W / 2, yt + 20, 60, C.yellow, 900, 'center', clamp((t - 0.6 - n * 0.9) / 0.4));
  };
  V.cards = (ctx, sc, t) => {
    const n = sc.cards.length, s = Math.min(170, (W - 160) / n - 20), gap = s + 20, x0 = W / 2 - (n * gap - 20) / 2;
    text(ctx, 'Your program', W / 2, 260, 48, C.muted, 700);
    sc.cards.forEach((c, i) => arrowCard(ctx, c, x0 + i * gap, 380, s, pop((t - 0.3 - i * 0.5) / 0.4)));
    text(ctx, 'One card = one square', W / 2, 680, 44, C.teal, 700, 'center', clamp((t - 0.5 * n) / 0.5));
  };
  V.grid = (ctx, sc, t) => {
    const n = sc.n, moves = expandProg(sc.prog), cards = sc.prog || [];
    const top = cards.length ? 290 : 190, size = Math.min(470, VIS.bottom - top - 10), cell = size / n, gx = W / 2 - size / 2, gy = top;
    rr(ctx, gx - 8, gy - 8, size + 16, size + 16, 18); ctx.fillStyle = '#f4f4fa'; ctx.fill();
    ctx.strokeStyle = '#c9cbe0'; ctx.lineWidth = 3;
    for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.moveTo(gx + i * cell, gy); ctx.lineTo(gx + i * cell, gy + size); ctx.stroke(); ctx.beginPath(); ctx.moveTo(gx, gy + i * cell); ctx.lineTo(gx + size, gy + i * cell); ctx.stroke(); }
    const at = (r, c) => [gx + c * cell + cell / 2, gy + r * cell + cell / 2];
    (sc.rocks || []).forEach(([r, c]) => emoji(ctx, '🪨', ...at(r, c), cell * 0.62));
    emoji(ctx, '🏁', ...at(...sc.start), cell * 0.38, 1, 0.55);
    emoji(ctx, '⭐', ...at(...sc.goal), cell * 0.62, 1 + 0.06 * Math.sin(t * 4));
    // simulate
    const D = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
    let pos = sc.start.slice(), crashed = -1;
    const k = moves.length ? clamp((t - 0.8) / MOVE, 0, moves.length) : 0;
    const full = Math.floor(k), frac = k - full;
    const blocked = p => p[0] < 0 || p[1] < 0 || p[0] >= n || p[1] >= n || (sc.rocks || []).some(r => r[0] === p[0] && r[1] === p[1]);
    for (let i = 0; i < full; i++) { const nx = [pos[0] + D[moves[i].d][0], pos[1] + D[moves[i].d][1]]; if (blocked(nx)) { crashed = i; break; } pos = nx; }
    let [rx, ry] = at(...pos);
    if (crashed < 0 && full < moves.length && frac > 0) {
      const d = D[moves[full].d], nx = [pos[0] + d[0], pos[1] + d[1]];
      const f = blocked(nx) ? Math.sin(frac * Math.PI) * 0.35 : easeOut(frac);
      rx += d[1] * cell * f; ry += d[0] * cell * f;
    }
    const done = moves.length && t > 0.8 + moves.length * MOVE;
    // program strip: highlight the running card (or the card that caused the crash)
    if (cards.length) {
      const s = 96, gap = 112, x0 = W / 2 - (cards.length * gap - 16) / 2;
      let curCard = -1;
      if (crashed >= 0) curCard = moves[crashed].card;
      else if (t >= 0.8 && !done) { const cur = Math.floor((t - 0.8) / MOVE); curCard = moves[cur] ? moves[cur].card : -1; }
      cards.forEach((c, i) => arrowCard(ctx, c, x0 + i * gap, VIS.top + 4, s, 1, i === curCard));
    }
    const win = crashed < 0 && pos[0] === sc.goal[0] && pos[1] === sc.goal[1] && (done || full === moves.length);
    const shake = crashed >= 0 ? Math.sin(t * 30) * 6 : 0;
    emoji(ctx, '🤖', rx + shake, ry, cell * 0.66, 1 + (win ? 0.12 * Math.abs(Math.sin(t * 6)) : 0));
    if (crashed >= 0) { emoji(ctx, '🐞', rx + cell * 0.38, ry - cell * 0.38, cell * 0.42, pop((t - 0.8 - (crashed + 1) * MOVE) / 0.4)); }
    if (moves.length && (crashed >= 0 || done)) {
      const msg = win ? '🎉 Treasure found!' : crashed >= 0 ? '💥 Bumped a rock: a bug!' : '🐞 Missed the treasure: a bug!';
      text(ctx, msg, W / 2, VIS.bottom - 4, 46, win ? C.yellow : C.red, 900, 'center', 1);
    }
  };
  // ScratchJr-style green flag (there is no green-flag emoji)
  function greenFlag(ctx, x, y, size, scale = 1) {
    if (scale <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(scale * size / 100, scale * size / 100);
    ctx.fillStyle = '#5a3d1e'; rr(ctx, -34, -46, 9, 96, 4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-26, -44); ctx.quadraticCurveTo(0, -56, 18, -40); ctx.quadraticCurveTo(32, -28, 46, -36); ctx.lineTo(46, 4); ctx.quadraticCurveTo(32, 12, 18, 0); ctx.quadraticCurveTo(0, -14, -26, -4); ctx.closePath();
    ctx.fillStyle = '#2ecc40'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#1e8a2a'; ctx.stroke();
    ctx.restore();
  }
  const ARROWS = { right: '→', left: '←', up: '↑', down: '↓' };
  const BLK = { flag: ['🏁', '#ffd166'], tap: ['👆', '#ffd166'], right: ['➡️', '#48dbfb'], left: ['⬅️', '#48dbfb'], up: ['⬆️', '#48dbfb'], down: ['⬇️', '#48dbfb'], hop: ['🦘', '#48dbfb'] };
  V.blocks = (ctx, sc, t) => {
    const n = sc.blocks.length, bw = Math.min(150, (W - 140) / n - 8), x0 = W / 2 - (n * (bw + 8) - 8) / 2, by = VIS.top + 10;
    const tb = 0.5 * n + 0.4, actions = blockActions(sc.blocks);
    // which block is running
    let runIdx = -1, tt = t - tb - 0.6;
    if (sc.run && tt >= 0) { let acc = 0; for (let i = 0; i < actions.length; i++) { if (tt < acc + actions[i].dur) { runIdx = i; break; } acc += actions[i].dur; } }
    const nonTrig = sc.blocks.map((b, i) => ['flag', 'tap'].includes(b) ? -1 : i).filter(i => i >= 0);
    sc.blocks.forEach((b, i) => {
      const say = b.startsWith('say:'), [ic, col] = say ? ['💬', '#a29bfe'] : BLK[b];
      const s = pop((t - 0.2 - i * 0.5) / 0.4); if (s <= 0.01) return;
      const active = (sc.run && runIdx >= 0 && nonTrig[runIdx] === i) || (sc.run && tt >= -0.6 && tt < 0 && i === 0);
      ctx.save(); ctx.translate(x0 + i * (bw + 8) + bw / 2, by + bw / 2); ctx.scale(s, s);
      if (active) { ctx.shadowColor = '#fff'; ctx.shadowBlur = 30; }
      rr(ctx, -bw / 2, -bw / 2, bw, bw, 22); ctx.fillStyle = col; ctx.fill(); ctx.shadowBlur = 0;
      if (active) { ctx.lineWidth = 7; ctx.strokeStyle = '#fff'; ctx.stroke(); }
      ctx.restore();
      const cx = x0 + i * (bw + 8) + bw / 2, cy = by + bw / 2;
      if (b === 'flag') greenFlag(ctx, cx, cy, bw * 0.5, s);
      else if (ARROWS[b]) { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); text(ctx, ARROWS[b], 0, 0, bw * 0.62, '#fff', 900); ctx.restore(); }
      else emoji(ctx, ic, cx, cy, bw * 0.52, s);
    });
    // stage
    const sy = by + bw + 40, sh = VIS.bottom - sy;
    rr(ctx, 70, sy, W - 140, sh, 28); ctx.fillStyle = '#dff3ff'; ctx.fill();
    ctx.fillStyle = '#9be38a'; ctx.fillRect(70, sy + sh - 70, W - 140, 70);
    // actor position
    let ax = 230, ay = sy + sh - 150, bubble = '', acc = 0;
    if (sc.run && tt > 0) {
      for (const a of actions) {
        const p = clamp((tt - acc) / a.dur);
        if (tt <= acc) break;
        if (a.b === 'right') ax += 150 * easeOut(p);
        if (a.b === 'left') ax -= 150 * easeOut(p);
        if (a.b === 'up') ay -= 95 * easeOut(p);
        if (a.b === 'down') ay += 95 * easeOut(p);
        if (a.b === 'hop' && p < 1) ay -= Math.sin(p * Math.PI) * 120;
        if (a.b.startsWith('say:')) bubble = a.b.slice(4);
        acc += a.dur;
      }
    }
    emoji(ctx, sc.actor, ax, ay, 150);
    if (bubble) {
      ctx.font = `800 46px ${SANS}`; const bwid = ctx.measureText(bubble).width + 60;
      const bx = Math.min(ax + 40, W - 90 - bwid), byy = ay - 190;
      rr(ctx, bx, byy, bwid, 90, 30); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#1d2033'; ctx.stroke();
      text(ctx, bubble, bx + bwid / 2, byy + 45, 46, '#1d2033', 800);
    }
    if (sc.run && tt > -0.6 && tt < 0.2) { if (sc.blocks[0] === 'tap') emoji(ctx, '👆', W - 170, sy + 80, 90, pop((tt + 0.6) / 0.3)); else greenFlag(ctx, W - 170, sy + 80, 90, pop((tt + 0.6) / 0.3)); }
  };
  V.turtle = (ctx, sc, t) => {
    // code list
    const ct = sc.code.length * 0.35;
    rr(ctx, 60, VIS.top + 10, 400, VIS.bottom - VIS.top - 20, 24); ctx.fillStyle = C.card; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = C.line; ctx.stroke();
    text(ctx, `${sc.code.length} blocks`, 260, VIS.top + 60, 40, C.yellow, 900, 'center', clamp((t - ct) / 0.4));
    sc.code.forEach((ln, i) => {
      const a = clamp((t - i * 0.35) / 0.3); if (!a) return;
      const y = VIS.top + 110 + i * Math.min(66, 520 / sc.code.length);
      const rep = ln.startsWith('repeat');
      ctx.save(); ctx.globalAlpha = a;
      rr(ctx, 90 + (ln.startsWith('   ') ? 40 : 0), y - 26, 320 - (ln.startsWith('   ') ? 40 : 0), 52, 12); ctx.fillStyle = rep ? '#ffab19' : '#4c97ff'; ctx.fill();
      ctx.restore();
      text(ctx, ln.trim(), 110 + (ln.startsWith('   ') ? 40 : 0), y, 32, '#fff', 800, 'left', a);
    });
    // path
    const segs = [];
    const sq = (x, y, ang, len) => { let px = x, py = y, a = ang; for (let i = 0; i < 4; i++) { const nx = px + Math.cos(a) * len, ny = py + Math.sin(a) * len; segs.push([px, py, nx, ny]); px = nx; py = ny; a += Math.PI / 2; } };
    const cx = 760, cy = 470;
    if (sc.shape === 'snowflake') { for (let k = 0; k < 8; k++) sq(cx, cy, -Math.PI / 2 + k * Math.PI / 4, 130); }
    else sq(cx - 130, cy + 130, -Math.PI / 2, 260);
    const dt = sc.shape === 'snowflake' ? 5.5 : 3, p = clamp((t - ct - 0.2) / dt) * segs.length;
    ctx.lineWidth = 8; ctx.lineCap = 'round';
    let tip = [segs[0][0], segs[0][1]];
    segs.forEach((s, i) => {
      if (p <= i) return;
      const f = Math.min(1, p - i), x2 = s[0] + (s[2] - s[0]) * f, y2 = s[1] + (s[3] - s[1]) * f;
      ctx.strokeStyle = sc.shape === 'snowflake' ? `hsl(${190 + i * 1.5},90%,${62 + (i % 4) * 4}%)` : C.blue;
      ctx.beginPath(); ctx.moveTo(s[0], s[1]); ctx.lineTo(x2, y2); ctx.stroke(); tip = [x2, y2];
    });
    emoji(ctx, '🐢', tip[0], tip[1], 64);
    if (p >= segs.length) emoji(ctx, sc.shape === 'snowflake' ? '❄️' : '✨', 960, 220, 90, pop((t - ct - 0.2 - dt) / 0.4));
  };
  const rnd = i => { const x = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); };
  V.apple = (ctx, sc, t) => {
    const x0 = 120, x1 = W - 120, top = VIS.top + 20, bottom = VIS.bottom - 60, period = 1.75;
    rr(ctx, 70, VIS.top, W - 140, VIS.bottom - VIS.top, 28); ctx.fillStyle = '#dff3ff'; ctx.fill();
    ctx.fillStyle = '#9be38a'; ctx.fillRect(70, VIS.bottom - 40, W - 140, 40);
    const k = Math.floor(t / period), f = (t % period) / period;
    const ax = x0 + rnd(k) * (x1 - x0), ay = top + f * (bottom - top);
    const prevX = x0 + rnd(k - 1) * (x1 - x0);
    const bowlX = prevX + (ax - prevX) * easeOut(clamp(f / 0.7));
    emoji(ctx, '🍎', ax, ay, 90);
    emoji(ctx, '🥣', bowlX, bottom + 6, 130);
    if (sc.score) {
      const score = Math.max(0, k);
      rr(ctx, 100, VIS.top + 24, 260, 84, 20); ctx.fillStyle = '#ffab19'; ctx.fill();
      text(ctx, `score: ${score}`, 230, VIS.top + 66, 44, '#fff', 900);
      if (f < 0.25 && k > 0) text(ctx, '+1', prevX, bottom - 110 - f * 200, 64, C.teal, 900, 'center', 1 - f * 4);
    }
  };
  V.branch = (ctx, sc, t) => {
    const box = (x, y, w, label, e, a, hl) => {
      if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
      rr(ctx, x - w / 2, y - 60, w, 120, 24); ctx.fillStyle = hl ? 'rgba(255,209,102,.22)' : C.card; ctx.fill(); ctx.lineWidth = hl ? 6 : 3; ctx.strokeStyle = hl ? C.yellow : C.line; ctx.stroke(); ctx.restore();
      emoji(ctx, e, x - w / 2 + 60, y, 64, 1, a); text(ctx, label, x + 30, y, 40, C.text, 800, 'center', a);
    };
    const line = (x1, y1, x2, y2, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.muted; ctx.lineWidth = 5; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); };
    const P = { s: [W / 2, 230], c: [W / 2, 440], a: [W / 2 - 250, 680], b: [W / 2 + 250, 680] };
    const a1 = clamp(t / 0.4), a2 = clamp((t - 0.8) / 0.4), a3 = clamp((t - 1.6) / 0.4);
    let hl = '';
    if (sc.walk) { const w = (t - 2) % 4; if (t > 2) hl = w < 2 ? 'a' : 'b'; }
    line(...P.s, ...P.c, a2); line(...P.c, ...P.a, a3); line(...P.c, ...P.b, a3);
    box(...P.s, 380, 'Start', '🧭', a1, false);
    box(...P.c, 460, 'Cave or beach?', '🤔', a2, false);
    box(...P.a, 380, 'Cave', '🦇', a3, hl === 'a');
    box(...P.b, 380, 'Beach', '🏖️', a3, hl === 'b');
    if (hl) {
      const w = ((t - 2) % 2) / 2, to = hl === 'a' ? P.a : P.b;
      const pt = w < 0.5 ? [P.s[0] + (P.c[0] - P.s[0]) * w * 2, P.s[1] + (P.c[1] - P.s[1]) * w * 2] : [P.c[0] + (to[0] - P.c[0]) * (w - 0.5) * 2, P.c[1] + (to[1] - P.c[1]) * (w - 0.5) * 2];
      emoji(ctx, '🧒', pt[0] + 150, pt[1] - 40, 70);
      if (w > 0.95) emoji(ctx, '✅', to[0] + 170, to[1] - 50, 56);
    }
  };
  V.code = (ctx, sc, t) => {
    const n = sc.lines.length, h = Math.min(100, 560 / n), y0 = VIS.top + (VIS.bottom - VIS.top - n * (h + 14)) / 2;
    sc.lines.forEach((ln, i) => {
      const a = clamp((t - 0.3 - i * 0.8) / 0.4); if (!a) return;
      const ind = ln.startsWith('   ') ? 70 : 0, s = ln.trim();
      const col = /^(when|ask)/.test(s) ? '#ffab19' : /^(if|else)/.test(s) ? '#ffab19' : /score/.test(s) ? '#ff8c1a' : /broadcast/.test(s) ? '#ffbf00' : '#4c97ff';
      const y = y0 + i * (h + 14);
      ctx.save(); ctx.globalAlpha = a; ctx.translate((1 - easeOut(a)) * 80, 0);
      rr(ctx, 90 + ind, y, W - 180 - ind, h, 18); ctx.fillStyle = col; ctx.fill();
      ctx.restore();
      ctx.save(); ctx.translate((1 - easeOut(a)) * 80, 0);
      const fs = Math.min(42, h * 0.42); ctx.font = `800 ${fs}px ${SANS}`;
      let fsz = fs; while (ctx.measureText(s).width > W - 260 - ind && fsz > 22) { fsz -= 2; ctx.font = `800 ${fsz}px ${SANS}`; }
      text(ctx, s, 120 + ind, y + h / 2, fsz, '#fff', 800, 'left', a);
      ctx.restore();
    });
  };

  /* ── FRAME ───────────────────────────────────────────────────────────── */
  function drawScene(ctx, pid, i, t, opts = {}) {
    const p = WATCH[pid], sc = p.scenes[i];
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    background(ctx);
    // header
    emoji(ctx, p.e, 80, 78, 56);
    text(ctx, p.title, 130, 78, 40, C.text, 800, 'left');
    text(ctx, `${i + 1} / ${p.scenes.length}`, W - 70, 78, 36, C.muted, 700, 'right');
    // progress dots
    p.scenes.forEach((_, k) => { ctx.beginPath(); ctx.arc(W / 2 - (p.scenes.length - 1) * 14 + k * 28, 128, 7, 0, Math.PI * 2); ctx.fillStyle = k < i ? C.teal : k === i ? C.yellow : C.line; ctx.fill(); });
    // visual
    (V[sc.v] || (() => {}))(ctx, sc, t);
    // caption
    const cap = sc.cap || sc.say, lines = wrap(ctx, cap, W - 160, 44, 650).slice(0, 4);
    const ch = 40 + lines.length * 56;
    rr(ctx, 50, H - ch - 40, W - 100, ch, 28); ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fill();
    lines.forEach((ln, k) => text(ctx, ln, W / 2, H - ch - 40 + 48 + k * 56, 44, '#fff', 650));
    if (opts.watermark !== false) text(ctx, 'CodeKids Academy', W - 70, 128, 22, C.muted, 600, 'right', 0.6);
    ctx.restore();
  }

  const api = { WATCH, W, H, sceneLength, drawScene, has: pid => !!WATCH[pid] };
  root.CKWatch = api;
  if (typeof module !== 'undefined') module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
