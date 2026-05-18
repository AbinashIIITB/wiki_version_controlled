import React from 'react';

interface DiffViewerProps {
    originalContent?: string;
    editedContent?: string;
    version?: {
        id: number;
        versionNumber: number;
        title: string;
        content: string;
        createdAt?: string;
        author?: { username: string };
    };
}

const DiffViewer: React.FC<DiffViewerProps> = ({ originalContent, editedContent, version }) => {
    if (version) {
        return (
            <div className="version-card p-4 my-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-indigo-400">Version #{version.versionNumber}</span>
                    <span className="text-xs text-slate-400">
                        {version.createdAt ? new Date(version.createdAt).toLocaleString() : ''}
                    </span>
                </div>
                <h4 className="text-md font-semibold text-white mb-2">{version.title}</h4>
                <div className="text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-white/5 font-mono whitespace-pre-wrap">
                    {version.content}
                </div>
            </div>
        );
    }

    return (
        <div className="diff-viewer mt-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Live Changes Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 backdrop-blur-md">
                    <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">Original Content</h4>
                    <div className="text-sm font-mono text-slate-300 h-64 overflow-y-auto whitespace-pre-wrap bg-slate-950/40 p-3 rounded-lg border border-white/5">
                        {originalContent || ''}
                    </div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-md">
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">Edited Content</h4>
                    <div className="text-sm font-mono text-slate-300 h-64 overflow-y-auto whitespace-pre-wrap bg-slate-950/40 p-3 rounded-lg border border-white/5">
                        {editedContent || ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiffViewer;