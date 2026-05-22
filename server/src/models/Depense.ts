import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Depense extends Model {}
Depense.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  libelle: { type: DataTypes.STRING, allowNull: false },
  montant: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  devise: { type: DataTypes.STRING, defaultValue: 'CDF' },
  categorie: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  date_depense: { type: DataTypes.DATEONLY, allowNull: false },
  niveau: { type: DataTypes.STRING, allowNull: false }, // NATIONAL, PROVINCIAL, STATION, BERGERIE
  province_id: { type: DataTypes.UUID },
  station_id: { type: DataTypes.UUID },
  bergerie_id: { type: DataTypes.UUID },
  enregistre_par: { type: DataTypes.UUID, allowNull: false },
  justificatif_url: { type: DataTypes.STRING },
  statut: { type: DataTypes.STRING, defaultValue: 'EN_ATTENTE' },
  valide_par: { type: DataTypes.UUID },
}, { sequelize, modelName: 'Depense', tableName: 'depenses' });
