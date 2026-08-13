/* =========================================================
   Luca Antonini — antoniniluca.it
   Motore di traduzione condiviso fra il sito (index.html) e il
   curriculum (cv.html).

   L'italiano vive nel markup di ciascuna pagina — così le pagine
   restano leggibili senza JavaScript e per i crawler — mentre
   l'inglese sta nel dizionario qui sotto. Il dizionario è l'unione
   delle chiavi di tutte le pagine: ogni pagina ne usa la sua parte.
   ========================================================= */
(function () {
  'use strict';

  var EN = {
    /* ---- comuni: intestazione e navigazione ---- */
    'meta.title': 'Luca Antonini — ETL Developer',
    'meta.desc': 'Back-end developer specialized in ETL processes for international banking and insurance groups. SQL, Python, Apache Airflow, IBM DataStage.',

    'a11y.skip': 'Skip to content',

    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.oracle': 'Oracle',
    'nav.contact': 'Contact',

    'hero.eyebrow': 'ETL Developer · Data Engineering',
    'hero.lead': 'I build ETL processes and data architectures for international banking and insurance groups.',
    'hero.cta1': 'Get in touch',
    'hero.cta2': 'Open the CV',

    'about.title': 'About me',
    'about.body': 'Back-end developer specialized in building ETL processes for international banking and insurance groups, with experience in SQL, IBM DataStage, and Python with Apache Airflow. I work on data processing and transformation, and design datamarts and databases to support reporting and business analysis. Focused on <em>data quality</em>, I optimize workflows and ensure processes are robust and compliant with corporate standards.',

    /* ---- esperienza ---- */
    'exp.title': 'Professional experience',
    'exp.label.stack': 'Tech stack',
    'exp.label.stack2': 'Tech stack',

    'exp.employer.role': 'ETL Developer',
    'exp.employer.place': 'Italy',
    'exp.employer.period': 'Sep 2022 — present',
    'exp.employer.intro': 'Two consecutive assignments on projects for banking and insurance groups, from the maintenance of established ETL procedures to the migration towards Big Data technologies.',

    'exp.e1.sector': 'Insurance',
    'exp.e1.date': 'Jan 2025 — present',
    'exp.e1.summary': 'Reconstruction and migration of databases towards Big Data technologies, with data quality processes and processing pipelines at the core of the project.',
    'exp.e1.b1': 'End-to-end pipelines designed and developed with Apache Airflow, entirely in Python.',
    'exp.e1.b2': 'Data quality checks implemented as SQL procedures.',
    'exp.e1.b3': 'Databases optimized through table partitioning and query tuning.',

    'exp.e2.sector': 'Banking',
    'exp.e2.date': 'Sep 2022 — Dec 2024',
    'exp.e2.summary': 'Development and maintenance of ETL procedures supporting reporting, regulatory supervision and accounting closing processes.',
    'exp.e2.b1': 'Datamarts and databases designed and built to support data processing and end-user reporting.',
    'exp.e2.b2': 'Data quality managed and monitored to ensure consistency, robustness and reliability of processes.',
    'exp.e2.b3': 'Anomalies in ETL systems identified and resolved through continuous monitoring.',
    'exp.e2.b4': 'Testing on data quality and integrity, particularly in the context of banking supervision.',

    /* ---- formazione ---- */
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

    /* ---- progetti ---- */
    'proj.title': 'Projects',
    'proj.craveit.org': 'University of Pisa',
    'proj.craveit.body': 'Implementation of <em>text analytics</em> methods to classify the best restaurants in Rome.',
    'proj.craveit.link': 'Visit the project website',

    /* ---- competenze ---- */
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

    /* ---- oracle ---- */
    'oracle.title': 'Oracle',
    'oracle.intro': 'Ask me anything about my work.',
    'oracle.label': 'Your question',
    'oracle.placeholder': 'Ask something…',
    'oracle.send': 'Ask',
    'oracle.answer': 'If you want to talk about my experience or my skills, write to me. No oracle can replace knowing someone in person.',

    /* ---- contatti e form ---- */
    'contact.title': 'Contact',
    'contact.body': 'For job opportunities, collaborations, or just to talk about data, feel free to write: I reply to everyone.',

    'form.nome': 'First name',
    'form.cognome': 'Last name',
    'form.email': 'Email',
    'form.messaggio': 'Message',
    'form.submit': 'Send message',
    'form.privacy': 'The data you send is used only to reply to you and is never shared with third parties.',

    'footer.note': 'Static site. No cookies, no tracking.',

    /* ---- curriculum (cv.html) ---- */
    'cv.meta.title': 'Luca Antonini — Curriculum Vitae',
    'cv.role': 'ETL Developer · Data Engineering',
    'cv.back': '← Back to the site',
    'cv.print': 'Print / Save as PDF',
    'cv.profile': 'Profile',
    'cv.exp.title': 'Professional experience',
    'cv.exp.client': 'Client',
    'cv.exp.clients': 'Clients',
    'cv.edu.title': 'Education',
    'cv.skills.title': 'Skills',
    'cv.skills.machine': 'Technical',
    'cv.skills.tools': 'Tools',
    'cv.skills.lang': 'Languages',
    'cv.skills.soft': 'Soft skills',
    'cv.skills.machine.v': 'SQL (advanced) · Python (advanced)',
    'cv.skills.lang.v': 'Italian (native) · English (B2/C1)',
    'cv.skills.soft.v': 'Logical approach · Problem solving · Team work',
    'cv.proj.title': 'Projects',
    'cv.proj.craveit.body': 'Implementation of text analytics methods to classify the best restaurants in Rome.',
    'cv.int.title': 'Interests',
    'cv.int.v': 'Logic and formal semantics · Data management · Epistemology and methodology'
  };

  var NAV_LABEL = { it: 'Sezioni', en: 'Sections' };

  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  var placeholders = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-ph]'));
  var IT = {};                 // testi italiani così come stanno nel markup
  var listeners = [];
  var lang = 'it';

  nodes.forEach(function (el) {
    IT[el.getAttribute('data-i18n')] = read(el);
  });

  placeholders.forEach(function (el) {
    IT[el.getAttribute('data-i18n-ph')] = el.getAttribute('placeholder');
  });

  function read(el) {
    return el.tagName === 'META' ? el.getAttribute('content') : el.innerHTML;
  }

  function write(el, value) {
    if (value == null) return;
    if (el.tagName === 'META') el.setAttribute('content', value);
    else el.innerHTML = value;
  }

  function apply(next) {
    var dict = next === 'en' ? EN : IT;
    lang = next;

    nodes.forEach(function (el) {
      write(el, dict[el.getAttribute('data-i18n')]);
    });

    placeholders.forEach(function (el) {
      var value = dict[el.getAttribute('data-i18n-ph')];
      if (value != null) el.setAttribute('placeholder', value);
    });

    document.documentElement.lang = next;
    document.documentElement.setAttribute('data-lang', next);

    var nav = document.querySelector('.topbar__nav');
    if (nav) nav.setAttribute('aria-label', NAV_LABEL[next]);

    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-set-lang') === next));
    });

    listeners.forEach(function (fn) { fn(next); });

    try { localStorage.setItem('lang', next); } catch (e) { /* storage non disponibile */ }
  }

  function initial() {
    var fromQuery = new URLSearchParams(location.search).get('lang');
    if (fromQuery === 'it' || fromQuery === 'en') return fromQuery;

    var stored;
    try { stored = localStorage.getItem('lang'); } catch (e) { /* ignore */ }
    if (stored === 'it' || stored === 'en') return stored;

    return (navigator.language || 'it').toLowerCase().indexOf('it') === 0 ? 'it' : 'en';
  }

  window.I18N = {
    apply: apply,
    current: function () { return lang; },
    onChange: function (fn) { listeners.push(fn); }
  };

  apply(initial());

  document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { apply(btn.getAttribute('data-set-lang')); });
  });

  /* Stampa: usato sia dal sito sia dal curriculum. */
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });
})();
