(function () {
  var overlay = document.getElementById('terminal-intro');
  if (!overlay) return;

  var promptText = overlay.querySelector('.terminal-prompt-text');
  var commandText = overlay.querySelector('.terminal-command');
  var cursorEl = overlay.querySelector('.terminal-cursor');
  var output = overlay.querySelector('.terminal-output');
  var hint = overlay.querySelector('.terminal-hint');

  var PROMPT = 'visitor@adamcalder ~ % ';
  var COMMAND = './portfolio --launch';

  // ── Type prompt on load ──
  var charIdx = 0;
  function typePrompt() {
    if (charIdx < PROMPT.length) {
      promptText.textContent += PROMPT[charIdx];
      charIdx++;
      setTimeout(typePrompt, Math.random() * 30 + 15);
    } else {
      // Show hint after prompt finishes typing
      setTimeout(function () {
        hint.classList.add('visible');
      }, 400);
    }
  }
  setTimeout(typePrompt, 400);

  // ── Boot sequence lines ──
  var bootLines = [
    { text: '', delay: 100 },
    { text: '> Identifying contestant #843...        ', suffix: 'OK', suffixClass: 'terminal-ok', delay: 0 },
    { text: '> Loading career data...                ', suffix: 'OK', suffixClass: 'terminal-ok', delay: 200 },
    { text: '    BambooHR       Platform PM', delay: 80, cls: 'terminal-dim' },
    { text: '    Travelpass      Senior PM', delay: 60, cls: 'terminal-dim' },
    { text: '    Learnexus       Director of PM', delay: 60, cls: 'terminal-dim' },
    { text: '    Grow.com        Data Visualization', delay: 60, cls: 'terminal-dim' },
    { text: '    TopGolf         Strategy', delay: 60, cls: 'terminal-dim' },
    { text: '> Compiling projects...                 ', suffix: 'OK', suffixClass: 'terminal-ok', delay: 200 },
    { text: '> Initializing particle field...        ', suffix: 'OK', suffixClass: 'terminal-ok', delay: 180 },
    { text: '> Deploying...                          ', suffix: 'OK', suffixClass: 'terminal-ok', delay: 250 },
    { text: '', delay: 100 },
    { text: '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 100%', delay: 350, cls: 'terminal-bar' },
    { text: '', delay: 80 },
    { text: 'READY', delay: 250, cls: 'terminal-accent' },
  ];

  var entered = false;

  function runBoot() {
    if (entered) return;
    entered = true;

    // Hide hint, stop cursor blink
    hint.classList.remove('visible');

    // Type the command
    var cmdIdx = 0;
    function typeCommand() {
      if (cmdIdx < COMMAND.length) {
        commandText.textContent += COMMAND[cmdIdx];
        cmdIdx++;
        setTimeout(typeCommand, Math.random() * 25 + 10);
      } else {
        // Hide cursor after command typed
        setTimeout(function () {
          cursorEl.style.display = 'none';
          showBootLines();
        }, 200);
      }
    }
    typeCommand();
  }

  function showBootLines() {
    var totalDelay = 200;
    bootLines.forEach(function (line) {
      totalDelay += line.delay;
      setTimeout(function () {
        var el = document.createElement('div');
        el.className = 'terminal-line';
        if (line.cls) el.classList.add(line.cls);

        // Main text
        var textNode = document.createTextNode(line.text);
        el.appendChild(textNode);

        // Suffix (OK, etc.)
        if (line.suffix) {
          var suffixSpan = document.createElement('span');
          suffixSpan.className = line.suffixClass || '';
          suffixSpan.textContent = line.suffix;
          el.appendChild(suffixSpan);
        }

        output.appendChild(el);

        // Animate in
        requestAnimationFrame(function () {
          el.classList.add('visible');
        });
      }, totalDelay);
    });

    // Transition out after boot completes
    totalDelay += 700;
    setTimeout(transitionOut, totalDelay);
  }

  function transitionOut() {
    if (typeof gsap === 'undefined') {
      overlay.remove();
      return;
    }

    gsap.to(overlay, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: function () {
        overlay.remove();
        // Trigger hero entrance
        if (window.__heroTimeline) {
          window.__heroTimeline.play();
        }
      },
    });
  }

  // Listen for Enter or click
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Enter') {
      document.removeEventListener('keydown', handler);
      runBoot();
    }
  });
  overlay.addEventListener('click', function handler() {
    overlay.removeEventListener('click', handler);
    runBoot();
  });
})();
