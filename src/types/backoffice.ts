import * as React from 'react'

export interface INotice{
    id: number;
    title: string;
    contents: React.ReactNode;
    created_at: string;
    has_previous: boolean;
    has_next: boolean;
    num_pages: number;
    count: number;

}

/* 이게 맞는 버전 */
export interface ContactFormData {
    // 문의하기
    contact_type?: string; //파트너등록문의에서 굳이 필요없어요!
    name: string;
    tel: string;
    contents: string;
    ip_address: string;
    service_type: string; // 이사, 청소, 이사+청소
    // + 파트너
    company_name?: string;
    is_partner?: boolean;
    refer_from?: string;
    area?: string;
    // response에 붙는
    created_at?: string;
    //TODO:  아마 필요한거
    term_agreement?: boolean
}


