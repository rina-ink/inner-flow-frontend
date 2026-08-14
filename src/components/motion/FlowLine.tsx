type FlowLineProps = {
    className?: string;
};

function FlowLine({
    className = "",
}: FlowLineProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 800 220"
            className={`flow-line ${className}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="flow-line-path"
                d="
                    M 20 120
                    C 120 40, 210 190, 320 115
                    C 430 40, 520 185, 620 105
                    C 690 55, 740 85, 780 120
                "
            />
        </svg>
    );
}

export default FlowLine;