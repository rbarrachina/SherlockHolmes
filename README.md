# Sherlock Holmes

Aplicació web estàtica per crear una ruta de pistes geolocalitzades. El joc proposa una sèrie d’enigmes repartits en un mapa: quan la persona jugadora s’acosta a cada ubicació, pot obrir la pista, respondre el repte i recuperar una lletra. Un cop completades totes les pistes, cal ordenar les lletres per descobrir la paraula clau final.

El projecte està pensat per poder-se reutilitzar en qualsevol entorn: un barri, un parc, una escola, una ciutat, un museu, una excursió o una gimcana. Per adaptar-lo, només cal canviar les ubicacions, les pistes, les preguntes, les respostes, les imatges i la paraula final.

## Com funciona

- Mostra un mapa amb una ruta de 10 enigmes.
- Cada enigma té coordenades GPS, una pista, una pregunta i una o més respostes vàlides.
- Les pistes es desbloquegen progressivament.
- Quan la persona jugadora és dins del radi definit, pot resoldre l’enigma.
- Cada enigma resolt proporciona una lletra.
- Amb totes les lletres, cal ordenar la paraula clau i validar-la.
- Es pot instal·lar com a PWA en dispositius compatibles.

## Fitxers principals

- `index.html`: estructura de la pantalla inicial i càrrega de l’aplicació.
- `styles.css`: estils visuals de la interfície.
- `app.js`: lògica del joc, pistes, ubicacions, respostes, lletres i paraula final.
- `manifest.json`: dades de la PWA, nom de l’aplicació i icones.
- `sw.js`: service worker i memòria cau dels fitxers.
- `assets/`: imatges utilitzades a les pistes i a la pantalla final.

## Adaptar el joc a un altre entorn

La configuració principal és a `app.js`.

### Paraula final

Canvia la constant:

```js
const FINAL_KEY = "PARAULA_FINAL";
```

La paraula ha de coincidir amb les lletres que reparteixen les pistes un cop ordenades correctament.

### Pistes i ubicacions

Cada pista es defineix dins l’array `scenes`:

```js
{
  id: "punt-1",
  number: 1,
  title: "Títol de la pista",
  letter: "A",
  lat: 0.000000,
  lng: 0.000000,
  image: "assets/imatge.png",
  clue: "Text de la pista",
  question: "Pregunta que cal respondre",
  answers: ["Resposta acceptada"],
}
```

Camps que pots canviar:

- `id`: identificador intern únic, sense espais.
- `number`: ordre visible de la pista.
- `title`: títol de la pista.
- `letter`: lletra que s’obté quan es resol l’enigma.
- `lat` i `lng`: coordenades GPS.
- `image`: imatge opcional de la pista.
- `clue`: text de la pista.
- `question`: pregunta que apareix quan s’obre el repte.
- `answers`: respostes acceptades.

Les respostes no distingeixen majúscules i minúscules i, en la validació habitual, ignoren els accents.

### Radi de desbloqueig

El radi per poder obrir una pista està definit a:

```js
const RADIUS_METERS = 30;
```

Augmenta’l si vols que les pistes siguin més fàcils d’obrir amb GPS, o redueix-lo si vols més precisió.

### Imatges

Desa les imatges dins `assets/` i referencia-les a cada escena:

```js
image: "assets/nom-de-la-imatge.png",
```

Si vols que funcionin bé fora de línia o com a PWA, afegeix-les també a la llista `ASSETS` de `sw.js`.

## Provar en local

Des de la carpeta del projecte:

```bash
python3 -m http.server 8000
```

Obre:

```text
http://localhost:8000/
```

Per reiniciar el progrés guardat:

```text
http://localhost:8000/?reset=1
```

Per jugar sense GPS en mode de prova:

```text
http://localhost:8000/?test=1
```

En mode de prova apareix el botó `Localitzar en prova`, que permet obrir cada pista desbloquejada sense haver d’estar físicament a la ubicació.

## Publicar a GitHub Pages

1. Puja el projecte a un repositori de GitHub.
2. Ves a `Settings > Pages`.
3. A `Build and deployment`, selecciona `Deploy from a branch`.
4. Tria la branca principal (`main`) i la carpeta `/`.
5. Desa la configuració.

GitHub Pages publicarà l’aplicació amb una URL semblant a:

```text
https://usuari.github.io/nom-del-repositori/
```

## Recomanacions per reutilitzar-lo

- Comprova totes les coordenades sobre el terreny abans del dia del joc.
- Escriu pistes curtes i concretes.
- Afegeix més d’una resposta vàlida quan hi pugui haver variants.
- Prova el joc en un mòbil, amb dades i GPS activats.
- Fes servir `?test=1` per revisar el flux sense haver de visitar totes les ubicacions.
- Canvia el nom a `manifest.json`, `index.html` i `README.md` si reutilitzes la plantilla per a un altre joc.
