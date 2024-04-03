import React from 'react';

interface DialogProps {
    id: string;
    onCloseDialog: () => void;
}

const Dialog: React.FC<DialogProps> = ({ id, onCloseDialog }) => {
    return (
        <div className="dialog">
            <h3>Dialog for ID: {id}</h3>
            <p>Dialog content goes here...</p>
            <button onClick={onCloseDialog}>Close</button>
        </div>
    );
};

export default Dialog;
