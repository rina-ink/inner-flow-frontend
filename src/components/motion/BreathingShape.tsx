type BreathingShapeProps = {
    className?: string;
};

function BreathingShape({
    className = "",
}: BreathingShapeProps) {
    return (
        <div
            aria-hidden="true"
            className={`breathing-shape ${className}`}
        />
    );
}

export default BreathingShape;