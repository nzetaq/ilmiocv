/* =========================================================
   Luca Antonini — antoniniluca.it
   Comportamenti del sito: form di contatto, tema, reveal allo
   scroll, scrollspy. Le traduzioni stanno in i18n.js, che va
   caricato prima di questo file.
   ========================================================= */
(function () {
  'use strict';

  /* Messaggi runtime del form: non stanno nel markup, quindi non
     passano dal dizionario condiviso di i18n.js. */
  var MSG = {
    it: {
      required: 'Campo obbligatorio.',
      email: 'Inserisci un indirizzo email valido.',
      sending: 'Invio in corso…',
      ok: 'Messaggio inviato. Ti rispondo appena possibile.',
      err: 'Invio non riuscito. Riprova tra qualche minuto.',
      notConfigured: 'Il form non è ancora configurato: manca la stringa di FormSubmit.'
    },
    en: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      sending: 'Sending…',
      ok: 'Message sent. I will get back to you as soon as possible.',
      err: 'Could not send the message. Please try again in a few minutes.',
      notConfigured: 'The form is not configured yet: the FormSubmit string is missing.'
    }
  };

  /* ---------------------------------------------------------
     Form di contatto (FormSubmit — nessun account da creare)

     ALIAS è la stringa casuale che FormSubmit invia via email dopo
     la conferma dell'indirizzo. Va usata al posto dell'indirizzo:
     serve solo a recapitare i messaggi, non lo espone e non permette
     di leggere la casella. Istruzioni complete nel README.
     --------------------------------------------------------- */
  var ALIAS = 'c47ae079cee7dfb63455bf223206523a';
  var ENDPOINT = 'https://formsubmit.co/ajax/';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function t(key) {
    var lang = window.I18N ? window.I18N.current() : 'it';
    return (MSG[lang] || MSG.it)[key];
  }

  function setStatus(text, kind) {
    if (!status) return;
    status.textContent = text || '';
    status.className = 'form__status' + (kind ? ' is-' + kind : '');
  }

  function resetFormMessages() {
    setStatus('');
    document.querySelectorAll('.field.is-invalid').forEach(function (f) {
      f.classList.remove('is-invalid');
    });
    document.querySelectorAll('.field__error').forEach(function (e) {
      e.textContent = '';
    });
  }

  function markInvalid(input, message) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.add('is-invalid');

    var error = field.querySelector('.field__error');
    if (!error) {
      error = document.createElement('p');
      error.className = 'field__error';
      field.appendChild(error);
    }
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }

  function clearInvalid(input) {
    var field = input.closest('.field');
    if (!field) return;
    field.classList.remove('is-invalid');
    var error = field.querySelector('.field__error');
    if (error) error.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  if (form) {
    // Cambiando lingua i messaggi resterebbero in quella precedente.
    if (window.I18N) window.I18N.onChange(resetFormMessages);

    var controls = Array.prototype.slice.call(
      form.querySelectorAll('input[required], textarea[required]')
    );

    // Toglie l'errore appena l'utente corregge, senza aspettare l'invio.
    controls.forEach(function (input) {
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('is-invalid')) clearInvalid(input);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      resetFormMessages();

      var firstBad = null;

      controls.forEach(function (input) {
        var value = input.value.trim();
        if (!value) {
          markInvalid(input, t('required'));
          firstBad = firstBad || input;
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          markInvalid(input, t('email'));
          firstBad = firstBad || input;
        }
      });

      if (firstBad) { firstBad.focus(); return; }

      if (ALIAS.indexOf('INCOLLA') === 0) {
        setStatus(t('notConfigured'), 'err');
        return;
      }

      var data = new FormData(form);
      var nome = String(data.get('nome')).trim();
      var cognome = String(data.get('cognome')).trim();
      var mittente = String(data.get('email')).trim();

      // Honeypot: se è compilato è un bot. Fingo l'invio riuscito e scarto.
      if (data.get('_honey')) {
        form.reset();
        setStatus(t('ok'), 'ok');
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      setStatus(t('sending'));

      fetch(ENDPOINT + encodeURIComponent(ALIAS), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'antoniniluca.it — messaggio da ' + nome + ' ' + cognome,
          _template: 'table',
          _captcha: 'false',
          _replyto: mittente,
          Nome: nome,
          Cognome: cognome,
          Email: mittente,
          Messaggio: String(data.get('messaggio')).trim()
        })
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          // FormSubmit risponde con success come stringa "true".
          if (result && (result.success === true || result.success === 'true')) {
            form.reset();
            setStatus(t('ok'), 'ok');
          } else {
            setStatus(t('err'), 'err');
          }
        })
        .catch(function () {
          setStatus(t('err'), 'err');
        })
        .then(function () {
          button.disabled = false;
        });
    });
  }

  /* ---------------------------------------------------------
     Oracle

     Risponde sempre la stessa cosa: è il punto. Il testo sta in
     #oracle-answer nell'HTML, quindi passa dal dizionario come
     ogni altra frase e resta modificabile senza toccare il JS.
     --------------------------------------------------------- */
  var oracleForm = document.getElementById('oracle-form');

  if (oracleForm) {
    var oracleLog = document.getElementById('oracle-log');
    var oracleInput = document.getElementById('oracle-input');
    var oracleAnswer = document.getElementById('oracle-answer');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var thinking = false;
    var MAX_SCAMBI = 8;

    // Cambiando lingua la trascrizione resterebbe in quella precedente.
    if (window.I18N) {
      window.I18N.onChange(function () { oracleLog.textContent = ''; });
    }

    function appendLine(className, text) {
      var line = document.createElement('p');
      line.className = className;
      line.textContent = text || '';
      oracleLog.appendChild(line);
      return line;
    }

    function trimLog() {
      // Ogni scambio sono due righe: domanda e risposta.
      while (oracleLog.children.length > MAX_SCAMBI * 2) {
        oracleLog.removeChild(oracleLog.firstChild);
      }
    }

    function reveal(line, text, done) {
      if (calm) { line.textContent = text; done(); return; }

      var i = 0;
      var caret = document.createElement('span');
      caret.className = 'oracle__caret';
      line.appendChild(caret);

      var timer = setInterval(function () {
        line.textContent = text.slice(0, ++i);
        if (i < text.length) {
          line.appendChild(caret);
        } else {
          clearInterval(timer);
          done();
        }
        oracleLog.scrollTop = oracleLog.scrollHeight;
      }, 18);
    }

    oracleForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (thinking) return;

      var question = oracleInput.value.trim();
      if (!question) { oracleInput.focus(); return; }

      appendLine('oracle__q', question);
      oracleInput.value = '';
      trimLog();
      oracleLog.scrollTop = oracleLog.scrollHeight;

      thinking = true;
      var line = appendLine('oracle__a', '');

      // Una breve attesa prima di rispondere: senza, sembra un errore.
      setTimeout(function () {
        reveal(line, oracleAnswer.textContent.trim(), function () {
          thinking = false;
          oracleLog.scrollTop = oracleLog.scrollHeight;
        });
      }, calm ? 0 : 420);
    });
  }

  /* ---------------------------------------------------------
     Tema
     --------------------------------------------------------- */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      // Il tema di base è scuro: senza attributo siamo su scuro.
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------------------------------------------------------
     Anno nel footer
     --------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------
     Reveal allo scroll
     --------------------------------------------------------- */
  /* L'animazione è un vezzo: il contenuto non deve mai dipendere da essa.
     Nascondo solo ciò che è già sotto la piega — quello che si vede all'arrivo
     resta visibile — e uso un semplice controllo geometrico allo scroll: su una
     quindicina di elementi costa nulla e non può lasciare la pagina bianca. */
  var candidates = Array.prototype.slice.call(
    document.querySelectorAll('.section, .entry, .engagement, .card, .panel')
  );

  var pending = candidates.filter(function (el) {
    return el.getBoundingClientRect().top > window.innerHeight * 0.92;
  });

  pending.forEach(function (el) { el.classList.add('reveal'); });

  function sweep() {
    var height = window.innerHeight;
    pending = pending.filter(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < height * 0.92 && box.bottom > 0) {
        el.classList.add('is-in');
        return false;
      }
      return true;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () { queued = false; sweep(); });
  }

  if (pending.length) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    schedule();
    // Ultima rete: se qualcosa impedisce lo scroll o il calcolo, mostro tutto.
    setTimeout(function () {
      pending.forEach(function (el) { el.classList.add('is-in'); });
      pending = [];
    }, 5000);
  }

  /* ---------------------------------------------------------
     Scrollspy sulla navigazione
     --------------------------------------------------------- */
  /* Attiva la voce dell'ultima sezione il cui inizio ha superato la linea
     appena sotto la barra fissa. Una fascia di rilevamento centrata sullo
     schermo, invece, sbaglia con le sezioni più corte di mezzo viewport:
     la fascia cade già dentro la sezione seguente. */
  var targets = Array.prototype.slice.call(document.querySelectorAll('.topbar__nav a'))
    .map(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  if (targets.length) {
    var topbar = document.querySelector('.topbar');

    var updateSpy = function () {
      var line = (topbar ? topbar.offsetHeight : 0) + 12;
      var current = null;

      targets.forEach(function (t) {
        if (t.section.getBoundingClientRect().top <= line) current = t;
      });

      // A fine pagina l'ultima sezione è quella che si sta leggendo, anche se
      // è troppo corta perché il suo inizio superi la linea di riferimento.
      var scrollBottom = window.innerHeight + window.pageYOffset;
      if (scrollBottom >= document.documentElement.scrollHeight - 2) {
        current = targets[targets.length - 1];
      }

      targets.forEach(function (t) {
        t.link.classList.toggle('is-active', t === current);
      });
    };

    var spyQueued = false;
    var scheduleSpy = function () {
      if (spyQueued) return;
      spyQueued = true;
      window.requestAnimationFrame(function () { spyQueued = false; updateSpy(); });
    };

    window.addEventListener('scroll', scheduleSpy, { passive: true });
    window.addEventListener('resize', scheduleSpy);
    window.addEventListener('load', scheduleSpy);
    window.addEventListener('hashchange', scheduleSpy);
    updateSpy();
  }
})();
