type FloatingLayerProps = {
    className?: string;
};

function FloatingLayer({
    className = "",
}: FloatingLayerProps) {
    return (
        <div
            aria-hidden="true"
            className={`floating-layer ${className}`}
        />
    );
}

export default FloatingLayer;