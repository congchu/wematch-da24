import { IPartnerDetail } from "types/partner";



export interface IOrder {
    idx: number,
    type: string, // 타입 종류 알아서 나중에 수정 요망.
    submit_date: string;
    moving_date: string;
    name: string;
    phone_number: string; 
    start_address: string;
    end_address: string;
    stuff: string;
    memo: string;
    partners: IPartnerDetail[];
}

export interface RequestSignUpProps {
    tel: string;
    name: string;
    device_id?: string;
    email?: string;
    init_service: '가정이사' | '원룸' | '사무실' | undefined;
    referer?: string;
    user_agent?: string;
    agreed_marketing?: string; // datetime
    agent?: string;
}

export interface ResponseSignUpProps {
}

export interface RequestSignInProps {
    token: string;
}

export interface ResponseSignInProps {
    uuid: string;
    tel: string;
    name: string;
    agreed_marketing?: string;
}
