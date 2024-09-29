import React from "react";

function DirPanel({ dir }) {
    return (
        <div>
            
        </div>
    );
};


function ListPanel({ dir }) {
    return (
        <div className="w-1/4 bg-blue-100">
            <div>
                <h2>Explorer</h2>
            </div>
            <DirPanel dir={dir} />
        </div>
    );
};

function ContentPanel() {
    return (
        <div className="w-3/4">
            ContentPanel
        </div>
    );
};

export default function Explorer({ dir }) {
    return (
        <div className="w-screen h-screen flex">
            <ListPanel dir={dir} />
            <ContentPanel />
        </div>
    );
};
