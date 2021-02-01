import { IUser } from "types/auth";

export interface RequestAddressProps {
    dong: string;
}

export interface ResponseAddressProps {
    sido: string;
    gugun: string;
    dong: string;
}

export interface RequestVerifySendMessageProps {
    phone: string;
}

export interface ResponseVerifySendMessageProps {
    message: string;
}

export interface RequestVerifyAuthCodeProps {
    phone: string;
    code: string;
}

export interface RequestVerifyCodeProps {
    phone: string;
    code: string;
}

export interface ResponseVerifyCodeProps {
    "is_verified": boolean | undefined;
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
    tel: string;
    name: string;
    agreed_marketing?: string;
}

export interface RequestUserInfoInsert {
    moving_type: '가정' | '원룸' | '사무실' | undefined;
    moving_date: string;
    sido: string;
    gugun: string;
    dong: string;
    floor: string;
    detail_addr: string;
    sido2: string;
    gugun2: string;
    dong2: string;
    floor2: string;
    detail_addr2: string;
    distance: number;
    name: string;
    phone1: string;
    phone2: string;
    phone3: string;
    keep_move: boolean;
    mkt_agree: boolean;
    agent_id: string | string[] | null | undefined;
    legacy?: boolean;
}

export interface RequestUserInfoInsertProps {
    idx: string;
}

export enum MovingType {
    house = '가정',
    oneroom = '원룸',
    office = '사무실'
}
