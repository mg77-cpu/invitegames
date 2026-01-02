export interface Plan {
    id: string;
    name: string;
    price: number; // in cents
    durationMonths: number;
}

export const PLANS: Record<string, Plan> = {
    SINGLE_SEASON: {
        id: "single-season",
        name: "Single Season Membership",
        price: 39500,
        durationMonths: 3,
    },
    ANNUAL_PASS: {
        id: "annual-pass",
        name: "Multi-Sport Pass (Annual)",
        price: 55000,
        durationMonths: 12,
    },
};

export const getPlanByName = (name: string): Plan | undefined => {
    return Object.values(PLANS).find(plan => plan.name === name);
};
