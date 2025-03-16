# StockBuster - Gestion des stocks pour les entreprises

StockBuster est une application web conçue pour aider les entreprises à gérer leur inventaire de manière efficace. Elle permet aux utilisateurs de suivre les niveaux de stock, les produits, les employés et diverses configurations de l'entreprise via une interface intuitive et puissante.

## Architecture du projet

StockBuster est construit avec **Next.js** pour le frontend et utilise **NestJS** pour gérer le backend et l'API. L'application est conçue pour être modulaire et scalable, garantissant une gestion efficace des différentes entités de l'entreprise.

## Structure du projet

Le projet est organisé en plusieurs répertoires principaux :

```plaintext
📦 stockbuster
├── 📂 app
│   ├── 📄 page.tsx        # Vue principale (Dashboard)
│   ├── 📂 login
│   │   └── 📄 page.tsx    # Page de connexion
│   ├── 📂 companies
│   │   ├── 📄 page.tsx    # Liste des entreprises
│   │   ├── 📂 [id]
│   │   │   └── 📄 page.tsx  # Détails d'une entreprise
│   │   ├── 📂 edit
│   │   │   └── 📄 page.tsx  # Éditer une entreprise
│   ├── 📂 products
│   │   ├── 📄 page.tsx    # Liste des produits
│   │   ├── 📂 [id]
│   │   │   └── 📄 page.tsx  # Détails d'un produit
│   │   ├── 📂 edit
│   │   │   └── 📄 page.tsx  # Éditer un produit
│   ├── 📂 users
│   │   ├── 📄 page.tsx    # Liste des utilisateurs
│   │   ├── 📂 [id]
│   │   │   └── 📄 page.tsx  # Détails d'un utilisateur
│   │   ├── 📂 edit
│   │   │   └── 📄 page.tsx  # Éditer un utilisateur
│   ├── 📂 parameters
│   │   └── 📄 page.tsx    # Paramètres de l'application
│
├── 📂 components         # Composants réutilisables
├── 📂 messages          # Fichiers de traduction (fr/en)
├── 📂 public            # Images et ressources statiques
```

## 🛠 Technologies utilisées

- **Frontend** : Next.js
- **Backend** : NestJS (API et logique métier)
- **Base de données** : MySQL
- **Containerisation** : Docker & Docker compose
- **CI/CD** : GitHub Actions

## ⚙️ Installation et configuration

### 📌 Prérequis

Avant de commencer, assurez-vous que vous avez les outils suivants installés :

- **Node.js** 20.18.0
- **Docker**
- **Docker compose**
- **Make**

### 🚀 Étapes d'installation
Pour lancer le projet ça se passe sur le projet devtools
#### 1️⃣ Cloner le projet DevTools et initialiser l'environnement

Clonez le dépôt DevTools et passez dans le répertoire du projet :

```bash
git clone https://github.com/your-repo/devtools.git
cd devtools
make init
```
Cette commande installe automatiquement le frontend et le backend.

#### 2️⃣ Mettre à jour le projet
Mettez à jour le projet en vous assurant que vous êtes sur la branche develop et en installant les dépendances :
```bash
make update
```
### 3️⃣ Lancer le projet
Lancez l'application avec Docker Compose :
```bash
make start
```
Cette commande démarre l'ensemble de l'application.
### 4️⃣ Arrêter le projet
Pour arrêter les services Docker associés à l'application :
```bash
make stop
```
### 5️⃣ Exporter la base de données
Si vous souhaitez exporter la base de données MySQL :
```bash
make export-db
```
### 6️⃣ Importer une base de données
Pour importer une base de données MySQL :
```bash
make import-db
```
## 🚢 Déploiement

Le projet est configuré pour être déployé via Docker et GitHub Actions.
À chaque fois qu'un tag versionné (vX.X.X) est poussé, une image Docker est construite, envoyée sur Docker Hub, et le déploiement est lancé sur Coolify.
