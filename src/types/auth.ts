export interface IUser {
    uuid: string;
    tel: string;
    name: string;
    agreed_marketing?: string;
}

export enum EInitService {
    MOVE_HOUSE = '가정이사',
    MOVE_ONEROOM = '원룸이사',
    MOVE_OFFICE = '사무실이사',
    CLEAN_MOVE = '입주청소',
    CLEAN_HOUSE = '거주청소',
    CLEAN_OFFICE = '사무실청소',
}