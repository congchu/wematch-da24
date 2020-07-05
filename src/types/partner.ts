export type Level = 'S' | 'A' | 'B' | 'C' | 'D' | 'N';
export type Grade = 'verygood' | 'good' | 'normal' | 'bad' | 'verybad';

export type PartnerList = {
    description: string;
    experience: number;
    has_next: boolean;
    has_previous: boolean;
    id: number;
    is_full: boolean;
    keywords: string[];
    level: Level;
    other_img: string;
    pick_count: number;
    profile_img: string;
    review_count: number;
    title: string;
    username: string;
}

export type PartnerDetail = {
    description: string;
    experience: number;
    id: number;
    is_full: boolean;
    keywords: string[];
    level: Level;
    other_img: string
    pick_count: number
    profile_img: string;
    review_count: number;
    title: string;
    username: string;
}

export type Review = {
    created_at: string;
    has_next: boolean;
    has_previous: boolean;
    id: number;
    kind: Grade;
    memo: string;
    partner: string;
    price: Grade;
    professional: Grade;
    reply: string | null;
    user: string;
}
