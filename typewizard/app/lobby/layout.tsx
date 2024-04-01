
export default function Layout({ children }: { children: React.ReactNode }) {
    const aspectRatio = 16 / 9; // Your desired aspect ratio

    // Calculate width and height based on aspect ratio
    const width = 450;
    const height = width / aspectRatio;

    return (
        <div className="w-[450px]">
        </div>
    );
}

