import { diffChars } from 'diff';

export const calculateDiff = (oldText: string, newText: string) => {
    const diff = diffChars(oldText, newText);
    return diff.map((part: any) => ({
        value: part.value,
        added: part.added,
        removed: part.removed,
    }));
};