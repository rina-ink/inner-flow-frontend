function MassageFlowBackdrop() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 1200 900"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
        >
            <path
                className="massage-flow-backdrop"
                d="
                    M 40 120
                    C 180 40, 290 220, 430 140
                    C 570 60, 690 250, 830 150
                    C 950 70, 1080 140, 1160 220

                    C 980 290, 900 370, 760 340
                    C 620 310, 500 460, 350 430
                    C 210 400, 130 520, 70 610

                    C 240 690, 390 610, 520 690
                    C 660 780, 820 700, 980 760
                    C 1070 800, 1120 830, 1180 860
                "
            />
        </svg>
    );
}

export default MassageFlowBackdrop;