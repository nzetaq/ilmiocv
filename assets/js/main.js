/* =========================================================
   Luca Antonini — antoniniluca.it
   i18n (IT di default nel markup, EN da dizionario), tema,
   scrollspy, reveal, stampa.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Dizionario inglese. Le chiavi corrispondono a data-i18n;
     l'italiano vive direttamente nell'HTML (così il sito resta
     leggibile anche senza JavaScript e per i crawler).
     --------------------------------------------------------- */
  var EN = {
    'meta.title': 'Luca Antonini — ETL Developer',
    'meta.desc': 'Back-end developer specialized in ETL processes for international banking and insurance groups. SQL, Python, Apache Airflow, IBM DataStage.',

    'a11y.skip': 'Skip to content',

    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    'hero.eyebrow': 'ETL Developer · Data Engineering',
    'hero.lead': 'I build ETL processes and data architectures for international banking and insurance groups.',
    'hero.cta1': 'Get in touch',
    'hero.cta2': 'Save CV as PDF',

    'about.title': 'About me',
    'about.body': 'Back-end developer specialized in building ETL processes for international banking and insurance groups, with experience in SQL, IBM DataStage, and Python with Apache Airflow. I work on data processing and transformation, and design datamarts and databases to support reporting and business analysis. Focused on <em>data quality</em>, I optimize workflows and ensure processes are robust and compliant with corporate standards.',

    'exp.title': 'Professional experience',
    'exp.label.client': 'Client',
    'exp.label.clients': 'Clients',
    'exp.label.stack': 'Tech stack',
    'exp.label.stack2': 'Tech stack',

    'exp.j1.date': 'Jan 2025 — present',
    'exp.j1.role': 'ETL Developer',
    'exp.j1.place': 'Italy',
    'exp.j1.summary': 'Reconstruction and migration of databases for the transition to Big Data technologies, with particular focus on data quality processes and processing pipelines.',
    'exp.j1.b1': 'Design and development of end-to-end pipelines with Apache Airflow, fully implemented in Python.',
    'exp.j1.b2': 'Implementation of SQL procedures for Data Quality checks.',
    'exp.j1.b3': 'Database management and optimization through table partitioning and query tuning.',

    'exp.j2.date': 'Sep 2022 — Dec 2024',
    'exp.j2.role': 'ETL Developer',
    'exp.j2.place': 'Italy',
    'exp.j2.summary': 'Development and maintenance of ETL procedures, testing and data quality to support reporting, regulatory supervision and accounting closing processes.',
    'exp.j2.b1': 'Design and creation of datamarts and databases to support data processing and end-user reporting.',
    'exp.j2.b2': 'Management and monitoring of data quality to ensure consistency, robustness and reliability of processes.',
    'exp.j2.b3': 'Identification and resolution of anomalies in ETL systems through continuous monitoring.',
    'exp.j2.b4': 'Testing activities focused on data quality and integrity, particularly in the context of banking supervision.',

    'edu.title': 'Education',
    'edu.m.date': '2017 — 2020',
    'edu.m.degree': 'Master’s Degree in Philosophy — LM-78',
    'edu.m.org': 'University of Pisa',
    'edu.m.b1': 'Grade: <strong>110/110 with honours</strong>.',
    'edu.m.b2': 'Topics: mathematical logic and formal semantics, philosophy of language, ontology.',
    'edu.b.date': '2013 — 2017',
    'edu.b.degree': 'Bachelor’s Degree in Philosophy — L-5',
    'edu.b.org': 'University of Pisa',
    'edu.b.b1': 'Grade: <strong>110/110 with honours</strong>.',
    'edu.b.b2': 'Topics: mathematical logic and formal semantics, philosophy of language, ontology.',

    'proj.title': 'Projects',
    'proj.craveit.org': 'University of Pisa',
    'proj.craveit.body': 'Implementation of <em>text analytics</em> methods to classify the best restaurants in Rome.',
    'proj.craveit.link': 'Visit the project website',

    'skills.title': 'Skills',
    'skills.tech.title': 'Technical skills',
    'skills.level.adv': 'Advanced',
    'skills.level.adv2': 'Advanced',
    'skills.lang.title': 'Languages',
    'skills.lang.it': 'Italian',
    'skills.lang.itlvl': 'Native',
    'skills.lang.en': 'English',
    'skills.tools.title': 'Tools',
    'skills.soft.title': 'Soft skills',
    'skills.soft.b1': 'Logical approach',
    'skills.soft.b2': 'Problem solving',
    'skills.soft.b3': 'Team work',
    'skills.int.title': 'Interests',
    'skills.int.b1': 'Logic and formal semantics',
    'skills.int.b2': 'Data management',
    'skills.int.b3': 'Epistemology and methodology',

    'contact.title': 'Contact',
    'contact.body': 'For job opportunities, collaborations, or just to talk about data, feel free to write: I reply to everyone.',

    'form.nome': 'First name',
    'form.cognome': 'Last name',
    'form.email': 'Email',
    'form.messaggio': 'Message',
    'form.submit': 'Send message',
    'form.privacy': 'The data you send is used only to reply to you and is never shared with third parties.',

    'footer.note': 'Static site. No cookies, no tracking.'
  };

  var NAV_LABEL = { it: 'Sezioni', en: 'Sections' };

  /* Messaggi runtime del form (non presenti nel markup). */
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
     i18n
     --------------------------------------------------------- */
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var IT = {}; // testi italiani così come si trovano nel markup

  nodes.forEach(function (el) {
    IT[el.getAttribute('data-i18n')] = read(el);
  });

  function read(el) {
    return el.tagName === 'META' ? el.getAttribute('content') : el.innerHTML;
  }

  function write(el, value) {
    if (value == null) return;
    if (el.tagName === 'META') el.setAttribute('content', value);
    else el.innerHTML = value;
  }

  var currentLang = 'it';

  function applyLang(lang) {
    var dict = lang === 'en' ? EN : IT;
    currentLang = lang;
    nodes.forEach(function (el) {
      write(el, dict[el.getAttribute('data-i18n')]);
    });

    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    var nav = document.querySelector('.topbar__nav');
    if (nav) nav.setAttribute('aria-label', NAV_LABEL[lang]);

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === lang));
    });

    // I messaggi del form resterebbero nella lingua precedente: li azzero.
    resetFormMessages();

    try { localStorage.setItem('lang', lang); } catch (e) { /* storage non disponibile */ }
  }

  function initialLang() {
    var fromQuery = new URLSearchParams(location.search).get('lang');
    if (fromQuery === 'it' || fromQuery === 'en') return fromQuery;

    var stored;
    try { stored = localStorage.getItem('lang'); } catch (e) { /* ignore */ }
    if (stored === 'it' || stored === 'en') return stored;

    return (navigator.language || 'it').toLowerCase().indexOf('it') === 0 ? 'it' : 'en';
  }

  applyLang(initialLang());

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-set-lang'));
    });
  });

  /* ---------------------------------------------------------
     Form di contatto (FormSubmit — nessun account da creare)

     ALIAS è la stringa casuale che FormSubmit invia via email dopo
     la conferma dell'indirizzo. Va usata al posto dell'indirizzo:
     serve solo a recapitare i messaggi, non lo espone e non permette
     di leggere la casella. Istruzioni complete nel README.
     --------------------------------------------------------- */
  var ALIAS = 'INCOLLA-QUI-LA-STRINGA-DI-FORMSUBMIT';
  var ENDPOINT = 'https://formsubmit.co/ajax/';

  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  function t(key) {
    return (MSG[currentLang] || MSG.it)[key];
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
     Tema
     --------------------------------------------------------- */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      if (!current) {
        current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
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
     Stampa / salva in PDF
     --------------------------------------------------------- */
  var printBtn = document.getElementById('print-cv');
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  /* ---------------------------------------------------------
     Reveal allo scroll
     --------------------------------------------------------- */
  /* L'animazione è un vezzo: il contenuto non deve mai dipendere da essa.
     Nascondo solo ciò che è già sotto la piega — quello che si vede all'arrivo
     resta visibile — e uso un semplice controllo geometrico allo scroll: su una
     quindicina di elementi costa nulla e non può lasciare la pagina bianca. */
  var candidates = Array.prototype.slice.call(
    document.querySelectorAll('.section, .entry, .card, .panel')
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
  var links = Array.prototype.slice.call(document.querySelectorAll('.topbar__nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
