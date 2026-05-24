# CAHIER DES CHARGES

## Plateforme Web et Mobile de Gestion et Traçabilité des Dépenses
### Église Universelle de Jésus Christ (EUJC)

---

**Version :** 1.0  
**Date :** 24 Mai 2026  
**Auteur :** EUJC Management Team  
**Statut :** En cours de développement

---

## Table des matières

1. [Introduction](#1-introduction)
2. [Fonctionnalités Détaillées](#2-fonctionnalités-détaillées)
3. [Architecture Technique](#3-architecture-technique)
4. [Conception de la Base de Données](#4-conception-de-la-base-de-données)
5. [Gestion des Utilisateurs et Rôles](#5-gestion-des-utilisateurs-et-rôles)
6. [Sécurité](#6-sécurité)
7. [Livrables](#7-livrables)
8. [Critères d'Acceptation](#8-critères-dacceptation)

---

## 1. INTRODUCTION

### 1.1 Contexte et Objectifs

L'Église Universelle de Jésus Christ (EUJC) connaît une croissance significative avec une présence en plusieurs provinces. Cette expansion crée un besoin critique de **modernisation, automatisation et sécurisation** de la gestion administrative, financière et communicationnelle.

**Objectifs principaux :**

- ✅ **Moderniser** la gestion des ressources et des activités
- ✅ **Automatiser** les processus administratifs et financiers
- ✅ **Sécuriser** les données sensibles de l'église
- ✅ **Tracer** intégralement les flux financiers
- ✅ **Centraliser** l'information pour une meilleure gouvernance

### 1.2 Périmètre du Projet

La plateforme EUJC Manager couvrira trois axes majeurs :

#### 1. Gestion Administrative
- Structure hiérarchique ecclésiastique
- Gestion des provinces, stations et bergeries
- Gestion des utilisateurs par rôles

#### 2. Gestion Financière
- Saisie et suivi des dépenses
- Catégorisation et budgétisation
- Flux de validation multi-niveaux
- Rapports financiers détaillés

#### 3. Gestion Communicationnelle
- Notifications automatiques
- Alertes de validation
- Rapports et communications

### 1.3 Public Cible

| Rôle | Responsabilités |
|------|-----------------|
| **SuperAdmin (Coordinateur)** | Supervision globale, gestion des représentants provinciaux, validation des dépenses stratégiques |
| **Représentants Provinciaux** | Gestion des apôtres, suivi des dépenses provinciales |
| **Apôtres Missionnaires** | Gestion des bergers, supervision des stations |
| **Bergers** | Gestion des disciples/chrétiens, suivi des dépenses locales |
| **Disciples/Chrétiens** | Soumission et suivi de leurs demandes |

### 1.4 Technologies Utilisées

```
Frontend (Web)    : React.js + Tailwind CSS
Frontend (Mobile) : React Native
Communication API : Axios
Backend           : Node.js + Express.js
Base de Données   : PostgreSQL
Authentification  : JWT
Déploiement       : Docker + Nginx
```

---

## 2. FONCTIONNALITÉS DÉTAILLÉES

### 2.1 Gestion des Dépenses

#### 2.1.1 Saisie et Enregistrement

**Champs obligatoires :**
- Montant
- Date de la dépense
- Description détaillée
- Catégorie de dépense
- Responsable (auto-identifié)
- Justificatif (upload: facture, reçu, bon de commande)

**Fonctionnalités :**
- Identification automatique de l'utilisateur
- Notes additionnelles
- Association à un projet/événement
- Statut de saisie (brouillon, soumis)

#### 2.1.2 Catégorisation

**Catégories prédéfinies :**
- Loyer / Bâtiment
- Salaires et honoraires
- Fournitures et matériel
- Missions évangéliques
- Transport et déplacements
- Culte et célébrations
- Formation et études bibliques
- Autres

**Gestion par SuperAdmin :**
- Ajouter de nouvelles catégories
- Modifier les catégories existantes
- Supprimer les catégories inutilisées
- Créer des sous-catégories

#### 2.1.3 Flux de Validation Hiérarchique

```
Disciple/Chrétien (Saisie)
        ↓
    Berger (Validation L1)
        ↓
Apôtre Missionnaire / Représentant Provincial (Validation L2)
        ↓
    SuperAdmin (Validation L3)
        ↓
    Approuvé / Rejeté
```

**À chaque niveau :**
- Possibilité de rejeter avec motif obligatoire
- Notification immédiate au demandeur
- Commentaires internes
- Historique complet

#### 2.1.4 Suivi et Tableau de Bord

**Fonctionnalités :**
- Tableau de bord centralisé
- Filtres avancés :
  - Par statut (en attente, approuvé, rejeté)
  - Par date (intervalle personnalisé)
  - Par catégorie
  - Par zone géographique
  - Par responsable
- Recherche rapide par montant ou description
- Affichage détaillé d'une dépense avec historique complet

### 2.2 Gestion Hiérarchique et Organisationnelle

#### 2.2.1 Structure Ecclésiastique

```
Coordinateur Général (SuperAdmin)
    ├── Province 1
    │   ├── Apôtre Missionnaire 1
    │   │   ├── Berger 1
    │   │   │   ├── Disciples/Chrétiens
    │   │   └── Berger 2
    │   │       └── Disciples/Chrétiens
    │   └── Apôtre Missionnaire 2
    │       └── ...
    ├── Province 2
    │   └── ...
```

#### 2.2.2 Gestion des Provinces

**Représentant Provincial peut :**
- Ajouter de nouveaux apôtres missionnaires
- Modifier les informations des apôtres
- Supprimer des apôtres (avec justification)
- Consulter les dépenses de sa province
- Valider les dépenses

#### 2.2.3 Gestion des Stations et Bergeries

**Stations (Management Apôtres) :**
- Nombre total de disciples
- Liste complète des disciples avec identifiants
- Historique des ajouts/suppressions
- Localisation géographique

**Bergeries (Management Bergers) :**
- Nombre total de chrétiens
- Liste complète des chrétiens avec identifiants
- Historique des ajouts/suppressions
- Localisation géographique

### 2.3 Reporting et Analyse

#### 2.3.1 Rapports Financiers Hiérarchiques

**SuperAdmin reçoit :**
- Rapport global complet
- Dépenses par province
- Dépenses par apôtre
- Dépenses par berger

**Représentant Provincial reçoit :**
- Rapport provincial détaillé
- Dépenses par apôtre de sa province
- Dépenses par berger de sa province

**Apôtre Missionnaire reçoit :**
- Rapport de sa mission
- Dépenses par berger de sa mission

**Berger reçoit :**
- Rapport de sa paroisse
- Dépenses soumises par ses disciples

#### 2.3.2 Formats d'Export

- **PDF :** Rapports formels avec en-tête et logo
- **CSV :** Données brutes pour analyses ultérieures
- **Excel :** Tableaux avec formules de calcul

#### 2.3.3 Visualisations

- **Graphiques camembert :** Répartition par catégorie
- **Graphiques barres :** Tendances temporelles
- **Tableaux de synthèse :** Montants par période
- **Indicateurs KPI :** Montant total, nombre de transactions, etc.

### 2.4 Communication et Notifications

#### 2.4.1 Types de Notifications

| Événement | Destinataire | Type |
|-----------|--------------|------|
| Nouvelle dépense soumise | Validateurs | In-app + Email |
| Dépense approuvée | Initiateur | In-app + Email |
| Dépense rejetée | Initiateur | In-app + Email + Motif |
| Demande en attente | Validateur | In-app + Email |
| Commentaire ajouté | Concernés | In-app |

#### 2.4.2 Fonctionnalités

- Notifications in-app (centre de notifications)
- Notifications par email
- Notifications push (mobile)
- Historique des notifications
- Marquer comme lues/non lues

### 2.5 Application Mobile

#### 2.5.1 Fonctionnalités Essentielles

- Saisie de dépenses (avec photo justificatif)
- Suivi des dépenses
- Validation (pour les responsables)
- Consultation des rapports
- Notifications push en temps réel

#### 2.5.2 Spécifications

- **Plates-formes :** iOS et Android
- **Technologie :** React Native
- **Offline Mode :** Saisie hors ligne, synchro au retour
- **Capture photo :** Intégration caméra native

### 2.6 Gestion de la Sécurité

*(Voir section 6 complète)*

---

## 3. ARCHITECTURE TECHNIQUE

### 3.1 Architecture Générale

```
┌─────────────────────────────────────────┐
│       Client Web (React.js)             │
│   + Tailwind CSS + Responsive Design    │
└────────────────┬────────────────────────┘
                 │
                 │ Axios (HTTP/HTTPS)
                 │
┌────────────────▼────────────────────────┐
│   API Gateway / Load Balancer           │
│          (Nginx)                        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│   Backend API (Node.js + Express)       │
│  - Authentification (JWT)               │
│  - Validation des données               │
│  - Logique métier                       │
│  - Gestion des fichiers                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│  Base de Données (PostgreSQL)           │
│  - Utilisateurs                         │
│  - Dépenses                             │
│  - Approvals                            │
│  - Notifications                        │
│  - Audit logs                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│   Mobile App (React Native)             │
│    - iOS & Android                      │
│    - Même API Backend                   │
└─────────────────────────────────────────┘
```

### 3.2 Dépendances Principales

#### Backend
```json
{
  "express": "^4.18.0",
  "pg": "^8.8.0",
  "sequelize": "^6.28.0",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "multer": "^1.4.5",
  "nodemailer": "^6.9.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

#### Frontend Web
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.0.0",
  "axios": "^1.3.0",
  "tailwindcss": "^3.2.0",
  "react-icons": "^4.7.0"
}
```

### 3.3 Exigences de Performance

- **Temps de réponse API :** < 500 ms (95e percentile)
- **Chargement page :** < 3 secondes
- **Capacité :** Support de 10,000+ utilisateurs simultanés
- **Disponibilité :** 99.5% uptime

### 3.4 Infrastructure et Déploiement

- **Containerisation :** Docker
- **Orchestration :** Docker Compose ou Kubernetes
- **Serveur Web :** Nginx
- **Cloud :** AWS, Google Cloud, Azure, ou équivalent
- **CI/CD :** GitHub Actions ou GitLab CI

---

## 4. CONCEPTION DE LA BASE DE DONNÉES

### 4.1 Schéma PostgreSQL

#### Table: `users`
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  -- Hiérarchie: parent_id pour le superviseur direct
  parent_id INTEGER REFERENCES users(user_id),
  province_id INTEGER REFERENCES provinces(province_id),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

#### Table: `provinces`
```sql
CREATE TABLE provinces (
  province_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  representative_id INTEGER REFERENCES users(user_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `expense_categories`
```sql
CREATE TABLE expense_categories (
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES expense_categories(category_id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `expenses`
```sql
CREATE TABLE expenses (
  expense_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  amount DECIMAL(12, 2) NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES expense_categories(category_id),
  status VARCHAR(50) DEFAULT 'pending',
  justification_file_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `expense_approvals`
```sql
CREATE TABLE expense_approvals (
  approval_id SERIAL PRIMARY KEY,
  expense_id INTEGER NOT NULL REFERENCES expenses(expense_id),
  approver_id INTEGER NOT NULL REFERENCES users(user_id),
  approval_order INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  comment TEXT,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `notifications`
```sql
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  related_entity_id INTEGER,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table: `audit_logs`
```sql
CREATE TABLE audit_logs (
  log_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  old_value TEXT,
  new_value TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. GESTION DES UTILISATEURS ET RÔLES

### 5.1 Rôles et Permissions

#### 🔴 SuperAdmin (Coordinateur)

**Permissions :**
- ✅ Accès complet à toutes les données
- ✅ Ajouter, modifier, supprimer les représentants provinciaux
- ✅ Consulter toutes les dépenses
- ✅ Valider les dépenses prioritaires
- ✅ Générer tous les rapports
- ✅ Gérer les catégories de dépenses
- ✅ Gérer les utilisateurs
- ✅ Consulter les logs d'audit

#### 🟠 Représentant Provincial

**Permissions :**
- ✅ Voir les dépenses de la province
- ✅ Ajouter/modifier les apôtres missionnaires
- ✅ Supprimer les apôtres (avec approbation)
- ✅ Valider les dépenses provinciales
- ✅ Générer rapports provinciaux
- ✅ Consulter les statistiques de la province
- ❌ Modifier les autres provinces
- ❌ Gérer les utilisateurs en dehors de sa hiérarchie

#### 🟡 Apôtre Missionnaire

**Permissions :**
- ✅ Voir les dépenses de sa mission
- ✅ Ajouter/modifier les bergers
- ✅ Supprimer les bergers (avec justification)
- ✅ Valider les dépenses de sa mission
- ✅ Générer rapports de mission
- ✅ Gérer les stations
- ❌ Valider les dépenses d'autres missions
- ❌ Ajouter des provinces

#### 🟢 Berger

**Permissions :**
- ✅ Voir les dépenses de la paroisse
- ✅ Ajouter/modifier les chrétiens
- ✅ Valider les dépenses des disciples
- ✅ Générer rapports paroissiaux
- ✅ Soumettre des dépenses pour la paroisse
- ❌ Valider les dépenses d'autres paroisses
- ❌ Ajouter des apôtres

#### 🔵 Disciple / Chrétien

**Permissions :**
- ✅ Soumettre des demandes de dépenses
- ✅ Consulter ses propres dépenses
- ✅ Recevoir les notifications
- ❌ Valider les dépenses
- ❌ Voir les dépenses des autres

### 5.2 Contrôle d'Accès Basé sur les Rôles (RBAC)

```
┌──────────────────────────────────────┐
│    Authentification (JWT Token)      │
└──────────────────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│    Extraction Rôle et Permissions    │
└───────────��──────┬───────────────────┘
                   │
┌──────────────────▼───────────────────┐
│    Vérification des Permissions      │
│    pour l'accès à la ressource       │
└──────────────────┬───────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    ✅ Autorisé        ❌ Refusé
         │                   │
     Accès OK         Erreur 403
```

---

## 6. SÉCURITÉ

### 6.1 Authentification

- **Système :** JWT (JSON Web Tokens)
- **Hachage des mots de passe :** bcryptjs avec salt rounds 10
- **Tokens :**
  - Access Token : 1 heure d'expiration
  - Refresh Token : 7 jours d'expiration
- **Future améliorations :** 2FA (Two-Factor Authentication)

### 6.2 Chiffrement des Données

- **En transit :** HTTPS/TLS 1.2+
- **Au repos :** Chiffrement des données sensibles (mots de passe, numéros de compte)
- **Backups :** Chiffrement des backups

### 6.3 Contrôle d'Accès

- **RBAC :** Rôles et permissions définis par rôle
- **Niveau de données :** Filtrage au niveau des requêtes SQL
- **Audit :** Journalisation de toutes les actions critiques

### 6.4 Protection Contre les Vulnérabilités

- **SQL Injection :** Utilisation de paramètres préparés
- **XSS (Cross-Site Scripting) :** Sanitization des entrées
- **CSRF :** Tokens CSRF sur les formulaires
- **Rate Limiting :** Limitation des requêtes par IP/utilisateur
- **CORS :** Configuration stricte des origines autorisées

### 6.5 Gestion des Sessions

- **Stockage :** Cookies httpOnly et secure
- **Invalidation :** Logout détruit le token
- **Vérification :** Validation du token à chaque requête

### 6.6 Journalisation et Audit

**Événements loggés :**
- Connexions/déconnexions
- Modifications de dépenses
- Validations/rejets
- Téléchargements de rapports
- Modifications d'utilisateurs
- Suppressions d'entités

**Format :** `user_id | action | entity_type | timestamp | ip_address`

---

## 7. LIVRABLES

### 7.1 Code Source

- ✅ Code source complet du backend (Node.js + Express)
- ✅ Code source complet du frontend (React.js)
- ✅ Code source complet du mobile (React Native)
- ✅ Fichiers de configuration Docker
- ✅ Scripts de base de données (migrations)

### 7.2 Documentation

- ✅ Documentation technique (architecture, API)
- ✅ Documentation API (endpoints, paramètres, exemples)
- ✅ Manuel utilisateur par rôle
- ✅ Guide d'administration
- ✅ Guide de déploiement

### 7.3 Tests et Qualité

- ✅ Tests unitaires (backend)
- ✅ Tests d'intégration
- ✅ Tests end-to-end critiques
- ✅ Rapport de couverture de tests

### 7.4 Déploiement

- ✅ Application web déployée et fonctionnelle
- ✅ Application mobile (iOS + Android) déployée
- ✅ Base de données en production
- ✅ Pipeline CI/CD configuré

---

## 8. CRITÈRES D'ACCEPTATION

### 8.1 Fonctionnalités

- ✅ Toutes les fonctionnalités du cahier des charges implémentées
- ✅ Flux de validation hiérarchique fonctionnels
- ✅ Rapports générés avec exactitude
- ✅ Notifications envoyées correctement
- ✅ Gestion des rôles strictement appliquée

### 8.2 Performance

- ✅ Temps de réponse API < 500 ms
- ✅ Chargement des pages < 3 secondes
- ✅ Support de 10,000+ utilisateurs simultanés
- ✅ Pas de fuites mémoire

### 8.3 Sécurité

- ✅ Authentification fonctionnelle
- ✅ Contrôle d'accès par rôle appliqué
- ✅ Données sensibles chiffrées
- ✅ Audit logs complets
- ✅ Pas de vulnérabilités critiques (OWASP Top 10)

### 8.4 Qualité de Code

- ✅ Code bien structuré et documenté
- ✅ Tests automatisés > 80% de couverture
- ✅ Pas de warnings critiques
- ✅ Respecte les standards ES6+ (frontend) et Node.js (backend)

### 8.5 Documentation

- ✅ Documentation technique complète
- ✅ API documentée (Swagger/OpenAPI)
- ✅ Manuels utilisateur clairs
- ✅ Processus de déploiement documenté

### 8.6 Validation Métier

- ✅ Validation par la Coordination générale de l'EUJC
- ✅ Test en environnement réel
- ✅ Feedback incorporé et corrigé
- ✅ Formation des utilisateurs complétée

---

## 9. CALENDRIER (À DÉFINIR)

| Phase | Durée | Livrables |
|-------|-------|-----------|
| **Analyse et Design** | 2-3 semaines | Architecture, Maquettes |
| **Development Backend** | 6-8 semaines | API, Base de données |
| **Development Frontend** | 6-8 semaines | Interface web |
| **Development Mobile** | 4-6 semaines | Application mobile |
| **Tests et QA** | 3-4 semaines | Tests, rapports bugs |
| **Déploiement** | 1-2 semaines | Mise en production |
| **Formation** | 1 semaine | Manuels, support |

---

## 10. BUDGET (À DÉFINIR)

À calculer en fonction :
- Coûts de développement (équipe)
- Infrastructure cloud (serveurs, domaine, certificats SSL)
- Outils de développement et licences
- Support et maintenance post-lancement

---

## 11. SUPPORT ET MAINTENANCE

### 11.1 Support Technique

- Support utilisateur (email, téléphone, chat)
- Correction des bugs critiques sous 24h
- Support des mises à jour et évolutions

### 11.2 Maintenance

- Mises à jour de sécurité régulières
- Backups quotidiens
- Monitoring 24/7 de la disponibilité
- Optimisation des performances

---

## 12. CONTACT ET VALIDATION

**Document à valider par :**
- [ ] Coordination générale de l'EUJC
- [ ] Responsable IT
- [ ] Représentants provinciaux (consultés)
- [ ] Équipe de développement

**Date de validation :** _______________

**Signatures :**

| Rôle | Nom | Signature | Date |
|------|-----|-----------|------|
| Coordinateur | _____ | _____ | _____ |
| Lead Tech | _____ | _____ | _____ |
| Project Manager | _____ | _____ | _____ |

---

**Document évolutif – Soumis à révision et validation périodique**

*Dernière mise à jour : 24 mai 2026*
