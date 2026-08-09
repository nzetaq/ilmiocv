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
[Web3Forms](https://web3forms.com), che inoltra alla casella registrata senza mai
esporla nel codice della pagina.

**Configurazione (una volta sola):**

1. Su <https://web3forms.com> inserire l'indirizzo su cui ricevere i messaggi.
2. Arriva una email con la *access key*: copiarla.
3. In `assets/js/main.js` sostituire il segnaposto:

   ```js
   var ACCESS_KEY = 'INSERISCI-QUI-LA-TUA-ACCESS-KEY';
   ```

4. Commit e push.

Finché la chiave non è inserita, il form mostra un messaggio d'errore esplicito
invece di fallire in silenzio.

La access key è pensata per stare nel codice pubblico: consente solo di inviare
messaggi a quella casella, non di leggerla né di risalire all'indirizzo. Il form
include un campo *honeypot* nascosto che scarta gran parte dello spam automatico.

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
