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
    memo: string;
    partners: IPartnerDetail[];
}