# antoniniluca.it

Sito personale / CV di Luca Antonini. Sito statico, nessuna dipendenza, nessun build step.

## Struttura

```
index.html            pagina unica (italiano nel markup, inglese via dizionario JS)
assets/css/style.css  stili, tema chiaro/scuro, foglio di stampa
assets/js/main.js     i18n, tema, scrollspy, reveal
assets/favicon.svg    favicon
CNAME                 dominio custom per GitHub Pages
robots.txt            indicizzazione
sitemap.xml           sitemap
.nojekyll             disattiva Jekyll su GitHub Pages
```

## Sviluppo locale

Basta aprire `index.html` nel browser. Per avere URL puliti:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Modificare i contenuti

- **Testi italiani**: direttamente in `index.html` (sono il contenuto di default).
- **Testi inglesi**: nell'oggetto `EN` in cima a `assets/js/main.js`. Ogni chiave
  corrisponde all'attributo `data-i18n` dell'elemento corrispondente nell'HTML.

Aggiungendo un nuovo elemento tradotto: metti il testo italiano nell'HTML con
`data-i18n="chiave.nuova"` e aggiungi `'chiave.nuova': '...'` al dizionario `EN`.

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
