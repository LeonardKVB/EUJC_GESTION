import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export class Province extends Model {}
Province.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  region: { type: DataTypes.STRING },
  pays: { type: DataTypes.STRING, defaultValue: 'RDC' },
  responsable_id: { type: DataTypes.UUID },
  description: { type: DataTypes.TEXT },
}, { sequelize, modelName: 'Province', tableName: 'provinces' });

export class Station extends Model {}
Station.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.STRING },
  province_id: { type: DataTypes.UUID, allowNull: false },
  apotre_id: { type: DataTypes.UUID },
  telephone: { type: DataTypes.STRING },
  capacite: { type: DataTypes.INTEGER },
}, { sequelize, modelName: 'Station', tableName: 'stations' });

export class Bergerie extends Model {}
Bergerie.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  adresse: { type: DataTypes.STRING },
  province_id: { type: DataTypes.UUID, allowNull: false },
  berger_id: { type: DataTypes.UUID },
  telephone: { type: DataTypes.STRING },
}, { sequelize, modelName: 'Bergerie', tableName: 'bergeries' });
