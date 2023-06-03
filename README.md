# Calculateur de taille de soutien gorge

Ce projet est développé sur mesure et intégré dans un site client.
Il correspond aux tailles spécifiques de ce fabriquant de sous vetements.

Ce projet a été créé avec [Create React App](https://github.com/facebook/create-react-app), plus d'informations dans le fichier `README-create-react-app.md`.

## Commencer à travailler sur le pojet

Il est nécessaire de cloner le projet localement pour travailler dessus.

Une fois dans le répertoire de travail, lancer

```
git clone git@github.com:himaku/clement-bra-size-simulation.git
```

cela va créer un nouveau dossier appelé `clement-bra-size-simulation` avec le
contenu du projet.

Se rendre dans ce dossier et lancer l'installation des dépendances:

```
npm install
```

## Lancer le projet en développement

Il suffit de se rendre dans le dossier du projet et de lancer

```
npm start
```

Dans le navigateur le projet est visible à l'adresse
[http://localhost:3000](http://localhost:3000). Tant que `npm start` s'execute,
lorsque le code est modifié, les modification sont visibles immédiatements.
Si ce n'est pas le cas, il suffit de recharger la page.

## Créer le package de livraison

Il y a un script node pour créer le widget, pour l'exécuter il faut lancer la
commande:

```
./bin/build
```

Le widget sera créé dans `build-widget`.

Note: Si l'executer directement ne fonctionne pas, il faut le lancer via `node bin/build`.

## Déployer la nouvelle version

Pour rendre visible à tous la nouvelle version, il faut publier le package en
tant que `gh-page`.

Il y a également un script pour cela, écrit en bash:

```
./bin/release
```

## Intégrer dans le site client

Le widget ens disponible à l'adresse
[https://himakuweb.github.io/clement-bra-size-simulation/](https://himakuweb.github.io/clement-bra-size-simulation/)

Il se compose de 2 fichiers:

- `https://himakuweb.github.io/clement-bra-size-simulation/main.js`
- `https://himakuweb.github.io/clement-bra-size-simulation/main.css`

Pour initialiser le widget, il faut appeler le script suivant:

```
BraSizeWidget.init("ID-du-div-ou-afficher")
```

Il y a un exemple d'initialisation dans `public/widget-sample.html`.
