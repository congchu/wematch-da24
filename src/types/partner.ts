export type Level = 'S' | 'A' | 'B' | 'C' | 'D' | 'NEW';
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
    pick_cnt: number;
    profile_img: string;
    feedback_cnt: number;
    title: string;
    username: string;
    adminname: string;
}

export type PartnerDetail = {
    description: string;
    experience: number;
    id: number;
    is_full: boolean;
    keywords: string[];
    level: Level;
    other_img: string
    pick_cnt: number
    profile_img: string;
    feedback_cnt: number;
    title: string;
    username: string;
    adminname: string;
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
    star: number;
}
