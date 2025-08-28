import { Document } from '../models/Document';
import { Tag } from '../models/Tag';

export const searchDocuments = async (query: string) => {
    const documents = await Document.findAll({
        where: {
            title: {
                [Op.like]: `%${query}%`
            }
        },
        include: [{
            model: Tag,
            through: { attributes: [] } // Exclude join table attributes
        }]
    });
    return documents;
};

export const searchTags = async (query: string) => {
    const tags = await Tag.findAll({
        where: {
            name: {
                [Op.like]: `%${query}%`
            }
        }
    });
    return tags;
};