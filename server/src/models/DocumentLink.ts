import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class DocumentLink extends Model {}

DocumentLink.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'documents',
      key: 'id',
    },
  },
  linkedDocumentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'documents',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'DocumentLink',
  tableName: 'document_links',
  timestamps: true,
});

export default DocumentLink;