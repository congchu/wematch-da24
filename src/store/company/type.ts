import {Grade, Level} from 'types/partner'

export type ICompanyDetail = {
    adminname: string;
    adminid: string
    experience: number;
    pick_cnt: number;
    feedback_cnt: number;
    level: Level;
    level_text: string;
    meta: boolean;
    id: number | null;
    title: string;
    description: string;
    addition?: string;
    profile_img: string;
    keywords: string[];
}


export type ICompanyReview = {
    id: number;
    created_at: string;
    partner: string;
    user: string;
    price: Grade;
    kind: Grade;
    professional: Grade;
    memo: string;
    reply: string | null;
    star: number;
    has_previous: boolean;
    has_next: boolean;
    num_pages: number;
    count: number;
}
