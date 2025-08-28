import marked from 'marked';

export const convertMarkdownToHtml = (markdown: string): string => {
    return marked(markdown);
};

export const sanitizeMarkdown = (markdown: string): string => {
    // Implement sanitization logic to prevent XSS attacks
    return markdown; // Placeholder for actual sanitization
};

export const getMarkdownPreview = (markdown: string): string => {
    const html = convertMarkdownToHtml(markdown);
    return html; // Return the HTML for live preview
};