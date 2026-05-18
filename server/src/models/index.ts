import sequelize from '../config/db';
import User from './User';
import Role from './Role';
import Document from './Document';
import Version from './Version';
import Comment from './Comment';
import Tag from './Tag';
import DocumentLink from './DocumentLink';
import Notification from './Notification';
import Analytics from './Analytics';
import AuditLog from './AuditLog';

// User <-> Role (One-to-Many)
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

// Document <-> User (Author) (One-to-Many)
Document.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Document, { foreignKey: 'authorId' });

// Comment <-> User & Document (One-to-Many)
Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(Document, { foreignKey: 'documentId' });
Document.hasMany(Comment, { foreignKey: 'documentId' });

// Version <-> User & Document (One-to-Many)
Version.belongsTo(User, { as: 'author', foreignKey: 'authorId' });
User.hasMany(Version, { foreignKey: 'authorId' });
Version.belongsTo(Document, { foreignKey: 'documentId' });
Document.hasMany(Version, { foreignKey: 'documentId' });

// Document <-> Tag (Many-to-Many)
Document.belongsToMany(Tag, { through: 'DocumentTags', foreignKey: 'documentId' });
Tag.belongsToMany(Document, { through: 'DocumentTags', foreignKey: 'tagId' });

// DocumentLink <-> Document (One-to-Many)
DocumentLink.belongsTo(Document, { as: 'document', foreignKey: 'documentId' });
DocumentLink.belongsTo(Document, { as: 'linkedDocument', foreignKey: 'linkedDocumentId' });

// Analytics <-> Document (One-to-One)
Analytics.belongsTo(Document, { foreignKey: 'documentId' });
Document.hasOne(Analytics, { foreignKey: 'documentId' });

// Notification <-> User (One-to-Many)
Notification.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

// AuditLog <-> User (One-to-Many)
AuditLog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(AuditLog, { foreignKey: 'userId' });

export {
  sequelize,
  User,
  Role,
  Document,
  Version,
  Comment,
  Tag,
  DocumentLink,
  Notification,
  Analytics,
  AuditLog,
};
