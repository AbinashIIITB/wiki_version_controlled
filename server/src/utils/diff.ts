import { diff as diffStrings } from 'diff';

export const calculateDiff = (oldText: string, newText: string) => {
    const diff = diffStrings(oldText, newText);
    return diff.map(part => ({
        value: part.value,
        added: part.added,
        removed: part.removed,
    }));
};