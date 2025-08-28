import React from 'react';

const Templates = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Document Templates</h1>
            <p className="mb-2">Choose from the following templates to get started:</p>
            <ul className="list-disc pl-5">
                <li className="mb-2">
                    <strong>Meeting Notes:</strong> A structured format for documenting meeting discussions and action items.
                </li>
                <li className="mb-2">
                    <strong>Project Documentation:</strong> A template for outlining project goals, timelines, and deliverables.
                </li>
                <li className="mb-2">
                    <strong>Research Summary:</strong> A format for summarizing research findings and insights.
                </li>
                <li className="mb-2">
                    <strong>Report Template:</strong> A general-purpose report format for various use cases.
                </li>
            </ul>
            <p className="mt-4">Select a template to start editing!</p>
        </div>
    );
};

export default Templates;