<br />
<div align="center">
<h3 align="center">🍴 [GLO-3102] - UFOOD </h3>

<p align="center">
🥨 UFood est une plateforme en ligne novatrice et conviviale dédiée à la découverte gastronomique, conçue spécifiquement pour le cours de GLO-3102. Elle permet à l'utilisateur d'explorer, d'évaluer et de suivre des restaurants, offrant une interface interactive et épurée pour une expérience optimale.

  <br />
  <br />

  </p>
</div>

## ⚙️ Prérequis

- Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
- [Node.js](https://nodejs.org/en/) (version LTS recommandée)
  @@ -19,28 +28,45 @@ Vérifier que Node est installé avec la commande:
  npm -v

````


## 📦 Configuration et utilisation

### 1. Installer les dépendances

```bash
npm install
````

### 2. Développement

```bash
npm run serve
```

## 👨‍💻 Informations de connexion

Nous avons créé deux utilisateurs pour tester toutes nos fonctionnalités dès la livraison 2.

```
email : clemou.abergel@gmail.com
password : Clemou123
name : Clemou Abergel
```

```
email :
password :
name :
```

---

## 🍷 Livrable 1

## 🍹 Livrable 2

### Connexion

*Archive*

## 🍸 Livrable 3

### Consignes générales

- ☑️ Toutes les sections devront être responsives (supporter les différents formats d'écran).
- ☑️ Le livrable 3 utilisera la version sécurisée de l'API.
- ☑️ Tous les formulaires doivent être validés via JavaScript **avant** d’être soumis au serveur.


## Pages - urls 

Voici un shéma simplifié des urls de notre application. 
```
const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/restaurant/:id",
        name: "Restaurant",
    },
    {
        path: "/profile/:id",
        name: "Profile",
    },
    {
        path: "/list/:id",
        name: "List",
    },
]
```
- `/` : La page d'accueil. La barre de navigation permet à l'utilisateur de se connecter ou de se créer un compte. 

- `/restaurant/:id`  : La page d'un restaurant.

- `/profile/:id` : La page d'un utilisateur. 

- `/list/:id` : La page d'une liste, seulement disponible à partir du profil de l'utilisateur connecté. 

## Informations supplémentaires sur certaines fonctionalités

### Connection à l'application 
À partir de la page d'accueil, l'utilisteur peut ouvrir le modal de connection à partir de *(1)* la barre de navigation supérieur et du bouton *Log in* ou *(2)* en cliquant sur le message du paywall *Create your free account or log in to continue*.

### Informations de l'utilisateur
- <ins>Permettre d'afficher la liste des followers/following dans la page profil utilisateur</ins> : *(1)* Accéder au profil de l'utilsateur à partir de la barre de navigation, en cliquant sur le nom de l'utilisateur connecté ou en cherchant un utilisateur à l'aide de la barre de recherche. *(2)* CLiquer la section following ou followers du profil de l'utilisateur.
<img width="674" height="290" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/b3f15ade-1e36-4066-a859-8592bc4f10b6"><img width="292" height="290" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/fc1f9268-06ed-4210-85f0-4efe4ed0601b">
d6b5130bdb48">

- <ins>Permettre de voir le profil d'un usager en mode connecté</ins>: *(1)* Rechercher l'usager dans la barre de recherche et cliquer sur son nom. *(2)* Dans la page d'un usager, on peut accéder au profil d'un autre usager en accédant à ses listes de *Following* ou *Followers*.  L'option de suivre un autre utilisateur sera proche du nom de l'utilisateur, sur sa page respective.
- 
### Les visites 
- <ins>Ajouter une visite à partir de la page d'accueil</ins>: Un utilisateur peut ajouter une visite en cliquant sur le *+* à droite dans l'image du restaurant.
<p align="center"><img width="290" height="290" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/d6007e67-7577-4666-91cd-e5f9120bfe65"><img width="400" height="290" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/75847b11-c914-41e7-b230-fa608b527509">
</p>

- <ins></ins>


### Fonctionnalités avancées
Nous avons choisi d'implémenter **Gravatar** et l'**autocomplétion**.

### Nice to notice
Voici une petite liste non exhaustive de quelques détails que nous avons implémentés dans le projet afin d'améliorer l'expérience utilisateur dont nous sommes très fiers.
- <ins>La suppression d'un restaurant dans une liste</ins> : Lorsqu'un utilisateur désire supprimer un restaurant d'une liste, il peut cliquer sur la poubelle se qui déclanche un *toast*. Si l'utilsateur ne fait rien, le restaurant disparaît de la liste. Si l'utilisateur clique sur *Cancel*, la suppression du restaurant sera annulée et le restaurant sera toujours visible. 
<p align="center"><img width="400" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/5bbb8e5f-e60d-4480-808c-e2175ade8149"></p>

- <ins>Voir les visites d'un utilisateur</ins> : Peu importe l'ordre d'ajout des visites, elles vont toujours apparaitrent en ordre chronologique croissant.
<p align="center"><img width="352" alt="image" src="https://github.com/GLO3102/ufood-h2024-team-16/assets/94695568/40a8337e-ad6f-4349-aadf-acbc77c614df"></p>





## 📜 Responsables

- Marylie Forgues
- Félix-Antoine Diamond
- Antoine Gamache
- Félix-Olivier Noël
