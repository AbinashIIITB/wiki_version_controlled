import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Analytics extends Model {
  public id!: number;
  public documentId!: number;
  public views!: number;
  public edits!: number;
  public topContributors!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Analytics.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Documents',
        key: 'id',
      },
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    edits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    topContributors: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'Analytics',
    timestamps: true,
  }
);

export default Analytics;