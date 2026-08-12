# antoniniluca.it

Sito personale / CV di Luca Antonini. Sito statico, nessuna dipendenza, nessun build step.

## Struttura

```
index.html            il sito (tema "console SQL", scuro di default)
cv.html               il curriculum: documento A4, colonna singola
assets/css/style.css  stili del sito
assets/css/cv.css     stili del curriculum, stampa inclusa
assets/js/i18n.js     dizionario e motore di traduzione, condivisi
assets/js/main.js     comportamenti del sito: form, tema, scrollspy, reveal
assets/favicon.svg    favicon
CNAME                 dominio custom per GitHub Pages
robots.txt            indicizzazione
sitemap.xml           sitemap
.nojekyll             disattiva Jekyll su GitHub Pages
```

Sono due documenti distinti di proposito: il sito racconta, il curriculum si
stampa. Il CV non è il sito con un foglio di stile per la stampa, ma una pagina
a sé, con metrica A4, colonna singola e nero su bianco.

## Il curriculum

`cv.html` sta in **una pagina A4** in entrambe le lingue. Il pulsante *Stampa /
Salva in PDF* apre la finestra di stampa del browser: scegliendo "Salva come
PDF" si ottiene il file da allegare alle candidature.

Colonna singola per una ragione precisa: i sistemi automatici di screening (ATS)
sbagliano spesso l'ordine del testo sui layout a due colonne.

La scala di stampa si governa da **una riga sola**, nel blocco `@media print`
in fondo a `cv.css`:

```css
html { font-size: 10.1pt; }
```

Tutte le misure del documento sono in `rem`, quindi si riferiscono a `<html>`:
cambiando quel valore l'intero CV si ridimensiona mantenendo le proporzioni.
Alzandolo troppo, il contenuto passa a due pagine.

`cv.html` riporta recapiti diretti (telefono ed email) ed è perciò marcato
`noindex`: resta raggiungibile da chiunque abbia il link, ma fuori dai motori di
ricerca. Per renderlo indicizzabile, togliere il meta `robots` nell'`<head>`.

## Sviluppo locale

Basta aprire `index.html` nel browser. Per avere URL puliti:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Modificare i contenuti

- **Testi italiani**: direttamente in `index.html` e `cv.html` (sono il contenuto
  di default: le pagine restano leggibili anche senza JavaScript).
- **Testi inglesi**: nell'oggetto `EN` in cima a `assets/js/i18n.js`. Il
  dizionario è **unico per entrambe le pagine**: una trentina di chiavi sono
  condivise, quindi correggere un testo lo corregge in tutti e due i posti.

Aggiungendo un nuovo elemento tradotto: metti il testo italiano nell'HTML con
`data-i18n="chiave.nuova"` e aggiungi `'chiave.nuova': '...'` al dizionario `EN`.

Per controllare che non manchi nulla dopo una modifica:

```sh
python3 - <<'EOF'
import re
d = open('assets/js/i18n.js').read()
defined = set(re.findall(r"^\s*'([^']+)':", d.split('var EN = {')[1].split('\n  };')[0], re.M))
used = set()
for page in ['index.html', 'cv.html']:
    u = set(re.findall(r'data-i18n="([^"]+)"', open(page).read()))
    used |= u
    print(page, '-> mancanti:', sorted(u - defined) or 'nessuna')
print('orfane:', sorted(defined - used) or 'nessuna')
EOF
```

## Form di contatto

Sul sito non compare nessun indirizzo email: i messaggi arrivano tramite
[FormSubmit](https://formsubmit.co), che non richiede alcuna registrazione.

**Attivazione (una volta sola, ~2 minuti):**

1. Da terminale, inviare un messaggio di prova per attivare l'indirizzo
   (sostituendo l'indirizzo con il proprio):

   ```sh
   curl -X POST https://formsubmit.co/ajax/tua.email@esempio.it \
        -H 'Content-Type: application/json' \
        -H 'Referer: https://antoniniluca.it/' \
        -d '{"Nome":"Prova","Messaggio":"Attivazione del form"}'
   ```

   L'header `Referer` è obbligatorio: senza, FormSubmit risponde
   *«Make sure you open this page through a web server»* e non invia nulla.

2. Arriva una email da FormSubmit con un link di conferma: aprirlo.
3. Nella pagina di conferma compare una **stringa casuale** (l'alias).
   Copiarla.
4. In `assets/js/main.js` sostituire il segnaposto:

   ```js
   var ALIAS = 'INCOLLA-QUI-LA-STRINGA-DI-FORMSUBMIT';
   ```

5. Commit e push.

L'indirizzo email non entra mai nel codice né nella cronologia git: nel sito
finisce solo l'alias, che serve a recapitare i messaggi ma non rivela la casella
né permette di leggerla.

Finché l'alias non è inserito, il form mostra un messaggio d'errore esplicito
invece di fallire in silenzio. Contro lo spam automatico c'è un campo *honeypot*
nascosto (`_honey`), riconosciuto anche lato FormSubmit.

## Pubblicazione

Ogni push su `main` viene pubblicato automaticamente da GitHub Pages.

```sh
git add -A
git commit -m "Aggiorna contenuti"
git push
```

### Configurazione una tantum

1. Su GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / `root`**.
2. Nel campo **Custom domain** inserire `antoniniluca.it` (il file `CNAME` lo fa già).
3. Attendere la validazione del certificato e spuntare **Enforce HTTPS**.

### DNS da configurare presso il registrar del dominio

Record `A` per `antoniniluca.it` (apex):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Record `CNAME` per `www`:

```
www  →  nzetaq.github.io
```

La propagazione può richiedere da pochi minuti a qualche ora.
