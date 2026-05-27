# Sherlock Holmes

Aplicacio web estatica per crear una ruta de pistes geolocalitzades. El joc proposa una serie d'enigmes repartits en un mapa: quan la persona jugadora s'acosta a cada ubicacio, pot obrir la pista, respondre el repte i recuperar una lletra. En completar totes les pistes, cal ordenar les lletres per descobrir la paraula clau final.

El projecte esta pensat per poder-se reutilitzar en qualsevol entorn: un barri, un parc, una escola, una ciutat, un museu, una excursio o una gimcana. Per adaptar-lo nomes cal canviar les ubicacions, les pistes, les preguntes, les respostes, les imatges i la paraula final.

## Com funciona

- Mostra un mapa amb una ruta de 10 enigmes.
- Cada enigma te coordenades GPS, una pista, una pregunta i una o mes respostes valides.
- Les pistes es desbloquegen progressivament.
- Quan la persona es troba dins del radi definit, pot resoldre l'enigma.
- Cada enigma resolt entrega una lletra.
- Amb totes les lletres, cal ordenar la paraula clau i validar-la.
- Es pot instal.lar com a PWA en dispositius compatibles.

## Fitxers principals

- `index.html`: estructura de la pantalla inicial i carrega de l'aplicacio.
- `styles.css`: estils visuals de la interfície.
- `app.js`: logica del joc, pistes, ubicacions, respostes, lletres i paraula final.
- `manifest.json`: dades de la PWA, nom de l'app i icones.
- `sw.js`: service worker i cache d'arxius.
- `assets/`: imatges utilitzades a les pistes i a la pantalla final.

## Adaptar el joc a un altre entorn

La configuracio principal esta a `app.js`.

### Paraula final

Canvia la constant:

```js
const FINAL_KEY = "OLIMPÍADES";
```

La paraula ha de coincidir amb les lletres que reparteixen les pistes un cop ordenades correctament.

### Pistes i ubicacions

Cada pista es defineix dins l'array `scenes`:

```js
{
  id: "pavello",
  number: 1,
  title: "Pavello",
  letter: "O",
  lat: 41.37044215762774,
  lng: 2.1502358846699834,
  image: "assets/imatge.png",
  clue: "Text de la pista",
  question: "Pregunta que cal respondre",
  answers: ["Resposta correcta"],
}
```

Camps que pots canviar:

- `id`: identificador intern unic, sense espais.
- `number`: ordre visible de la pista.
- `title`: titol de la pista.
- `letter`: lletra que s'obte quan es resol.
- `lat` i `lng`: coordenades GPS.
- `image`: imatge opcional de la pista.
- `clue`: text de la pista.
- `question`: pregunta que apareix quan s'obre el repte.
- `answers`: respostes acceptades.

Les respostes no distingeixen majuscules/minuscules i ignoren accents en la validacio habitual.

### Radi de desbloqueig

El radi per poder obrir una pista esta definit a:

```js
const RADIUS_METERS = 30;
```

Augmenta'l si vols que les pistes siguin mes facils d'obrir amb GPS, o redueix-lo si vols mes precisio.

### Imatges

Guarda les imatges dins `assets/` i referencia-les a cada escena:

```js
image: "assets/nom-de-la-imatge.png",
```

Si vols que funcionin be offline o com a PWA, afegeix-les tambe a la llista `ASSETS` de `sw.js`.

## Provar en local

Des de la carpeta del projecte:

```bash
python3 -m http.server 8000
```

Obre:

```text
http://localhost:8000/
```

Per reiniciar el progres guardat:

```text
http://localhost:8000/?reset=1
```

Per jugar sense GPS en mode de prova:

```text
http://localhost:8000/?test=1
```

En mode de prova apareix un boto `Localitzar en prova` que permet obrir cada pista desbloquejada sense haver d'estar fisicament a la ubicacio.

Per provar el final amb totes les pistes completades:

```text
http://localhost:8000/?test=1&complete=1
```

## Publicar a GitHub Pages

1. Puja el projecte a un repositori de GitHub.
2. Ves a `Settings > Pages`.
3. A `Build and deployment`, selecciona `Deploy from a branch`.
4. Tria la branca principal (`main`) i la carpeta `/`.
5. Desa la configuracio.

GitHub Pages publicara l'aplicacio amb una URL semblant a:

```text
https://usuari.github.io/nom-del-repositori/
```

## Recomanacions per reutilitzar-lo

- Comprova totes les coordenades sobre el terreny abans del dia del joc.
- Escriu pistes curtes i concretes.
- Afegeix mes d'una resposta valida quan pugui haver-hi variants.
- Prova el joc en mobil, amb dades i GPS activats.
- Usa `?test=1` per revisar el flux sense haver de visitar totes les ubicacions.
- Canvia el nom a `manifest.json`, `index.html` i `README.md` si reutilitzes la plantilla per un altre joc.
