import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Version extends Model {
  public id!: number;
  public documentId!: number;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public authorId!: number;
  public commitMessage!: string;
}

Version.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    commitMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'versions',
    timestamps: true,
  }
);

export default Version;