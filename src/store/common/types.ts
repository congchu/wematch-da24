
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

export interface RequestUserInfoInsert {
    movingType: '가정' | '원룸' | '사무실' | undefined
    movingDate: string;
    sido: string;
    gugun: string;
    dong: string;
    floor: string;
    detailAddr: string;
    sido2: string;
    gugun2: string;
    dong2: string;
    floor2: string;
    detailAddr2: string;
    distance: string;
    name: string;
    phone1: string;
    phone2: string;
    phone3: string;
    keepMove: boolean;
    mktAgree: boolean;
    agentId: string | string[] | null | undefined;
}

export interface RequestUserInfoInsertProps {
    move_idx: string;
    message: string;
}

export enum MovingType {
    house = '가정',
    oneroom = '원룸',
    office = '사무실'
}