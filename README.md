# EUJC_GESTION - Plateforme de Gestion Ecclésiastique

La plateforme EUJC Manager est une solution numérique complète destinée à moderniser, automatiser et sécuriser la gestion de l'Église Universelle de Jésus-Christ. Elle couvre les dimensions administratives, financières et communicationnelles de la communauté ecclésiastique.

## 🚀 Fonctionnalités
- **Gestion Hiérarchique** : Provinces, Stations, Bergeries.
- **Gestion des Membres** : Suivi des Disciples et Chrétiens.
- **Traçabilité Financière** : Gestion des dépenses par niveau.
- **Sécurité** : Authentification JWT et accès basés sur les rôles (RBAC).
- **Interface Moderne** : Design professionnel sous design 50/50 pour le login.

## 🛠️ Stack Technique
- **Frontend** : React 18, Vite, Tailwind CSS, Lucide React.
- **Backend** : Node.js, Express, TypeScript.
- **Base de données** : PostgreSQL avec Sequelize ORM.
- **DevOps** : Docker, Docker Compose.

## 📦 Installation & Lancement

### Pré-requis
- Node.js (v18+)
- Docker & Docker Compose (optionnel pour le mode conteneurisé)

### Mode Docker (Recommandé)
1. Clonez le dépôt.
2. Lancez :
   ```bash
   docker-compose up --build
   ```
3. L'application est accessible sur `http://localhost:3000`.

### Mode Développement Local
1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Configurez votre `.env` (voir `.env.example`).
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## 🔐 Identifiants par défaut (Seed)
- **Email** : `admin@eujc.org`
- **Mot de passe** : `admin123`

## 📄 Licence
Propriété exclusive de l'Église Universelle de Jésus-Christ (EUJC).
