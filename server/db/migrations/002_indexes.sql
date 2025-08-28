CREATE INDEX idx_documents_title ON Documents (title);
CREATE INDEX idx_comments_document_id ON Comments (document_id);
CREATE INDEX idx_tags_document_id ON Tags (document_id);
CREATE INDEX idx_notifications_user_id ON Notifications (user_id);
CREATE INDEX idx_audit_logs_user_id ON AuditLog (user_id);
CREATE INDEX idx_document_links_document_id ON DocumentLink (document_id);