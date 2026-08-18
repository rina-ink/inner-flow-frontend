export type MassageSummary = {
    _id: string;
    name: string;
    slug: string;
    shortDescription: string;
    illustrationKey: string;
};

export type MassageDetails = {
    _id: string;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;

    durationOptions: number[];

    prices: Record<string, number>;

    focus: string[];
    illustrationKey: string;
    isActive: boolean;
};