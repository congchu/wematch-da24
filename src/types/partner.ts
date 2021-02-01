export type Level = 'S' | 'A' | 'B' | 'C' | 'NEW';
export type Grade = 'verygood' | 'good' | 'normal' | 'bad' | 'verybad';

export type IPartnerList = {
  description: string;
  experience: number;
  id: number;
  status: 'selected' | 'available' | 'unavailable';
  keywords: string[];
  level: Level;
  other_img: string
  pick_cnt: number
  profile_img: string;
  feedback_cnt: number;
  title: string;
  username: string;
  adminname: string;
  addition?: string;
  adminid?: string;
}

export type IPartnerDetail = {
    description: string;
    experience: number;
    id: number;
    status: 'selected' | 'available' | 'unavailable';
    keywords: string[];
    level: Level;
    other_img: string
    pick_cnt: number
    profile_img: string;
    feedback_cnt: number;
    title: string;
    username: string;
    adminname: string;
    addition?: string;
    adminid?: string;
    level_text?: string;
}

export type IReview = {
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

export type IRecommendedList = {
  adminname: string;
  adminid: string;
  experience: number;
  pick_cnt: number;
  feedback_cnt: number;
  level: Level;
  meta: boolean;
  id: number;
  title: string;
  description: string;
  addition: string;
  profile_img: string;
  keywords: string[];
  level_text: string;
}


export enum LevelText {
    NEW = "평균 이상 수준",
    S = "고객평가 상위 10%",
    A = "고객평가 상위 38%",
    B = "평균 수준",
    C = "평균 수준",
}
