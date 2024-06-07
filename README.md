# Snake Game

### Description

*Snake Game* est une version moderne du jeu classique **[Snake](https://fr.wikipedia.org/wiki/Snake_%28genre_de_jeu_vid%C3%A9o%29)**, où le joueur contrôle un serpent pour manger des fruits et éviter les obstacles. 

### Fonctionnalités 

 1. *Déplacement du serpent*, Le serpent se déplace sur un plateau de jeu en suivant la direction de sa tête. Le joueur peut changer la direction du serpent en utilisant les touches directionnelles (haut, bas, gauche, droite). 
 2. *Mécanique de jeu*, Le joueur gagne des points en mangeant des fruits. Le serpent grandit d'un segment à chaque fois qu'il mange un fruit. Si la tête du serpent entre en collision avec son propre corps ou avec un obstacle, la partie est perdue. Le plateau de jeu est un donut, ce qui signifie que le bord supérieur est connecté au bord inférieur, et le bord gauche est connecté au bord droit. Le serpent peut traverser le bord du plateau et
    réapparaître de l'autre côté. 
3. *Obstacles et bonus,* Des obstacles sont présents sur le plateau de jeu, et le serpent doit les éviter. Des bonus sont disponibles pour aider le serpent : Bonus de vitesse : Permet au serpent de se déplacer plus rapidement pendant un certain temps. 
4. *Difficulté réglable,* Le joueur peut choisir parmi trois niveaux de difficulté : facile, moyen et difficile. Chaque niveau de difficulté ajuste la vitesse du jeu. 
5. *Tableau des meilleurs scores,* Les meilleurs scores des joueurs sont enregistrés localement. Le joueur peut voir le tableau des meilleurs scores et son propre record personnel.
   

### Structure du projet 
`game.js` : *Contient la logique principale du jeu, y compris la gestion du serpent, des fruits, des obstacles, des bonus, etc.* 

`snake.js` : *Définit la classe Snake qui représente le serpent du jeu.* 

`utils.js` : *Contient des fonctions utilitaires pour générer des fruits, des obstacles et des bonus.* 

`sound.js` : *Définit la classe Sound pour gérer les sons du jeu.* 
> **Note:** Les sons proviennent de **[Mixkit](https://mixkit.co/free-sound-effects/)** 

`main.js` : *Point d'entrée du jeu, initialise et lance le jeu.* 

`index.html` : *Fichier HTML principal contenant la structure de la page du jeu.* 

`style.css` : *Fichier CSS pour styliser l'interface utilisateur du jeu.* 

> **Note:** La font ***Tiny5*** provient de **[Google font](https://fonts.google.com/specimen/Tiny5)**

### Installation et utilisation 
Clonez ce dépôt GitHub. 
Ouvrez le fichier index.html dans un navigateur web. 
Utilisez les touches directionnelles pour contrôler le serpent et jouez au jeu !

