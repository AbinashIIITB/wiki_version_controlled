# Version-Controlled Wiki for Teams

## Overview
This project is a collaborative wiki application that features Git-style version control, allowing teams to create, edit, and manage documents efficiently. It supports Markdown editing, inline comments, and real-time collaboration, making it an ideal tool for team documentation and knowledge sharing.

## Core Features
- **Markdown-based Wiki Editor**: A user-friendly editor with syntax highlighting, live preview, and formatting shortcuts.
- **Git-style Version Control**: Tracks every edit with commit messages, timestamps, and author details.
- **Inline Diff Comparisons**: Highlights differences between document versions for easy review.
- **Role-based Access Control**: Supports Admin, Editor, and Viewer roles with granular permissions.
- **Threaded Comments**: Enables inline discussions at the section or line level.
- **MySQL Integration**: Efficiently stores documents, history, permissions, and comments.

## Additional Features
- **Dashboard & Organized Module Home Page**: Displays documents, collaborators, recent activity, and shortcuts.
- **Full-Text Search & Filters**: Search across document titles, content, comments, and revisions.
- **Tags & Categories**: Organizes wiki pages into categories with tag-based filtering.
- **Document Linking & Backlinks**: Auto-detects links between pages, creating a knowledge graph.
- **Document Templates**: Provides pre-built templates for meeting notes, project docs, etc.
- **Real-Time Collaboration**: Allows multiple users to edit simultaneously using WebSockets.
- **Autosave & Drafts**: Saves work-in-progress edits without committing.
- **Notifications System**: In-app and email notifications for mentions, edits, or comments.
- **Export & Import**: Export documents as PDF/Markdown and import existing markdown files.
- **Document Analytics**: Tracks views, edits, top contributors, and engagement insights.
- **Dark Mode & Custom Themes**: Personalizes the workspace for user comfort.
- **Audit Logs & Admin Panel**: Tracks activity logs and manages users, roles, and system settings.

## Technology Stack
- **Frontend**: React, Tailwind CSS, React Router, Markdown editor (Slate.js/TipTap/React-Markdown).
- **Backend**: Express.js with REST APIs, JWT authentication, role middleware, WebSockets for real-time sync.
- **Database**: MySQL for storing users, roles, documents, versions, comments, tags, notifications, and analytics.

## Deployment
The application can be deployed using Docker with an Nginx reverse proxy, ensuring a scalable architecture. A CI/CD pipeline is set up for continuous integration and deployment.

## Getting Started
1. Clone the repository.
2. Install dependencies for both client and server.
3. Set up the MySQL database and configure environment variables.
4. Run the application using Docker or locally.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.