import { EInitService, IUser } from "types/auth";
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
    init_service: EInitService;
    code: string;
    device_id?: string;
    email?: string;
    referer?: string;
    user_agent?: string;
    agreed_marketing?: string; // datetime
    agent?: string;
}
export interface ResponseSignUpProps {
    token: string;
    user: IUser;
}

export interface RequestSignInProps {
    phone: string;
    code: string;
}

export interface ResponseSignInProps {
    token: string;
    user: IUser;
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
    isVerified: boolean | null;
}

export enum ESignInCase {
    FORM = 'form',
    NONE = ''
}