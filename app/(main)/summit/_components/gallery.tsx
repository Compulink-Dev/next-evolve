import GalleryPad from "./gallery-pad";

const images = [
    { id: '1', src: '/collab.jpg', alt: 'Picture 1' },
];

export default function GalleryPage() {
    return (
        <main className="container mx-auto">
            <h1 className="text-4xl font-bold mb-6">Gallery</h1>
            <GalleryPad images={images} />
        </main>
    );
}
