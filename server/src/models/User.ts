import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: string;
  public nom!: string;
  public prenom!: string;
  public email!: string;
  public mot_de_passe!: string;
  public role!: string;
  public province_id!: string | null;
  public station_id!: string | null;
  public bergerie_id!: string | null;
  public est_actif!: boolean;

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.mot_de_passe);
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  mot_de_passe: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  province_id: { type: DataTypes.UUID, allowNull: true },
  station_id: { type: DataTypes.UUID, allowNull: true },
  bergerie_id: { type: DataTypes.UUID, allowNull: true },
  est_actif: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  hooks: {
    beforeCreate: async (user: any) => {
      user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, 12);
    },
    beforeUpdate: async (user: any) => {
      if (user.changed('mot_de_passe')) {
        user.mot_de_passe = await bcrypt.hash(user.mot_de_passe, 12);
      }
    }
  }
});

export default User;
