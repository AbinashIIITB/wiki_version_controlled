INSERT INTO Users (username, email, password, role_id) VALUES
('admin', 'admin@example.com', 'hashed_password', 1),
('editor', 'editor@example.com', 'hashed_password', 2),
('viewer', 'viewer@example.com', 'hashed_password', 3);

INSERT INTO Roles (name) VALUES
('Admin'),
('Editor'),
('Viewer');

INSERT INTO Documents (title, content, created_at, updated_at, author_id) VALUES
('Getting Started', '# Getting Started\nThis is the first document in the wiki.', NOW(), NOW(), 1),
('Project Documentation', '# Project Documentation\nThis document contains information about the project.', NOW(), NOW(), 2);

INSERT INTO Comments (document_id, user_id, content, created_at) VALUES
(1, 2, 'This is a comment on Getting Started.', NOW()),
(2, 3, 'This is a comment on Project Documentation.', NOW());

INSERT INTO Tags (name) VALUES
('Introduction'),
('Documentation');

INSERT INTO DocumentTags (document_id, tag_id) VALUES
(1, 1),
(2, 2);