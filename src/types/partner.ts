export type Level = 'S' | 'A' | 'B' | 'C' | 'NEW';
export type Grade = 'verygood' | 'good' | 'normal' | 'bad' | 'verybad';

export type IPartnerList = {
    description: string;
    experience: number;
    has_next: boolean;
    has_previous: boolean;
    id: number;
    status: 'selected' | 'available' | 'unavailable';
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

/*[{
  "adminname": "대영익스프레스(강남)",
  "adminid": "a6348",
  "experience": "16",
  "pick_cnt": 998,
  "feedback_cnt": 82,
  "level": "S",
  "level_text": "감동적인 서비스 기대",
  "meta": true,
  "id": 98,
  "title": "정성과 마음을 다 하는 이사 후회없는 선택 해보세요!",
  "description": "견적에서 이사까지 손수 직접 이사 해드립니다.\n\n최고의 서비스로 고객만족에 최선을 다 하고있습니다.\n\n믿고 맡겨주세요!",
  "addition": "에어컨 탈착/설치",
  "profile_img": "https://api.typeform.com/responses/files/c11df3474d99074583aee067270a4fc6e30530ced5d9cf4fb1a6ae7bbcfdad13/1591168028436.jpg",
  "keywords": ["시간", "주방", "추천 추천", "견적", "친절하고"]
}, {
  "adminname": "CJ대한통운",
  "adminid": "a8992",
  "experience": "20",
  "pick_cnt": 311,
  "feedback_cnt": 10,
  "level": "A",
  "level_text": "기분좋은 서비스 기대",
  "meta": false
}]*/

export enum LevelText {
    NEW = "평균 이상 수준",
    S = "고객평가 상위 10%",
    A = "고객평가 상위 38%",
    B = "평균 수준",
    C = "평균 수준",
}
