import React from 'react';

interface CardProps {
    id: string;
    title: string;
    content: string;
    onOpenDialog: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, content, onOpenDialog }) => {
    const handleOpenDialog = () => {
        onOpenDialog(id);
    };

    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={handleOpenDialog}>Open Dialog</button>
        </div>
    );
};

export default Card;
