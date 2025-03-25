import { FC } from 'react';
import GalleryItem from './gallery-item';


interface Image {
    id: string;
    src: string;
    alt: string;
}

interface GalleryProps {
    images: Image[];
}

const GalleryPad: FC<GalleryProps> = ({ images }) => {
    return (
        <div className="gallery-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <GalleryItem key={image.id} image={image} />
            ))}
        </div>
    );
};

export default GalleryPad;
