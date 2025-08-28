import React from 'react';
import { Diff } from 'react-diff-view';

interface DiffViewerProps {
    oldVersion: string;
    newVersion: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ oldVersion, newVersion }) => {
    const diff = [
        {
            oldValue: oldVersion,
            newValue: newVersion,
        },
    ];

    return (
        <div className="diff-viewer">
            <Diff
                viewType="split"
                diff={diff}
                styles={{
                    diffWrapper: { fontFamily: 'monospace' },
                    added: { backgroundColor: '#e6ffed' },
                    removed: { backgroundColor: '#ffeef0' },
                }}
            />
        </div>
    );
};

export default DiffViewer;