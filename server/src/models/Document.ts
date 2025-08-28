import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class Document extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public authorId!: number;
}

Document.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
  }
);

export default Document;