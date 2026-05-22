-- Script d'initialisation pour PostgreSQL (EUJC Manager)

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tables de structure ecclésiastique
CREATE TABLE provinces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(150) NOT NULL,
    region VARCHAR(150),
    pays VARCHAR(100) DEFAULT 'RDC',
    responsable_id UUID,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(150) NOT NULL,
    adresse VARCHAR(255),
    province_id UUID NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
    apotre_id UUID,
    telephone VARCHAR(20),
    capacite INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bergeries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(150) NOT NULL,
    adresse VARCHAR(255),
    province_id UUID NOT NULL REFERENCES provinces(id) ON DELETE CASCADE,
    berger_id UUID,
    telephone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    mot_de_pass VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'PROVINCIAL_REP', 'APOTRE', 'BERGER')),
    province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
    station_id UUID REFERENCES stations(id) ON DELETE SET NULL,
    bergerie_id UUID REFERENCES bergeries(id) ON DELETE SET NULL,
    est_actif BOOLEAN DEFAULT TRUE,
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tables des membres
CREATE TABLE disciples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE,
    sexe VARCHAR(10) CHECK (sexe IN ('Masculin', 'Féminin', 'Autre')),
    telephone VARCHAR(20),
    adresse VARCHAR(255),
    station_id UUID NOT NULL REFERENCES stations(id) ON DELETE CASCADE,
    date_adhesion DATE DEFAULT CURRENT_DATE,
    photo_url VARCHAR(255),
    est_actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chretians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE,
    sexe VARCHAR(10) CHECK (sexe IN ('Masculin', 'Féminin', 'Autre')),
    telephone VARCHAR(20),
    adresse VARCHAR(255),
    bergerie_id UUID NOT NULL REFERENCES bergeries(id) ON DELETE CASCADE,
    date_adhesion DATE DEFAULT CURRENT_DATE,
    photo_url VARCHAR(255),
    est_actif BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des dépenses
CREATE TABLE depenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    libelle VARCHAR(255) NOT NULL,
    montant DECIMAL(15,2) NOT NULL,
    devise VARCHAR(10) DEFAULT 'CDF',
    categorie VARCHAR(100),
    description TEXT,
    date_depense DATE NOT NULL,
    niveau VARCHAR(30) CHECK (niveau IN ('NATIONAL', 'PROVINCIAL', 'STATION', 'BERGERIE')),
    province_id UUID REFERENCES provinces(id) ON DELETE SET NULL,
    station_id UUID REFERENCES stations(id) ON DELETE SET NULL,
    bergerie_id UUID REFERENCES bergeries(id) ON DELETE SET NULL,
    enregistre_par UUID NOT NULL REFERENCES users(id),
    justificatif_url VARCHAR(255),
    statut VARCHAR(20) DEFAULT 'EN_ATTENTE' CHECK (statut IN ('EN_ATTENTE', 'VALIDÉ', 'REJETÉ')),
    valide_par UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des rapports
CREATE TABLE rapports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('MENSUEL', 'TRIMESTRIEL', 'ANNUEL', 'PONCTUEL')),
    niveau VARCHAR(30) CHECK (niveau IN ('NATIONAL', 'PROVINCIAL', 'STATION', 'BERGERIE')),
    periode_debut DATE,
    periode_fin DATE,
    contenu_json JSONB,
    genere_par UUID NOT NULL REFERENCES users(id),
    province_id UUID REFERENCES provinces(id),
    station_id UUID REFERENCES stations(id),
    bergerie_id UUID REFERENCES bergeries(id),
    fichier_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des annonces
CREATE TABLE annonces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    auteur_id UUID NOT NULL REFERENCES users(id),
    cible VARCHAR(30) CHECK (cible IN ('TOUS', 'PROVINCE', 'STATION', 'BERGERIE')),
    province_id UUID REFERENCES provinces(id),
    station_id UUID REFERENCES stations(id),
    bergerie_id UUID REFERENCES bergeries(id),
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    est_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table d'audit
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entite VARCHAR(100),
    entite_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
