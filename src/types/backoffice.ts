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

export interface ContactFormData {
    // 문의하기
    contact_type: string;
    name: string;
    tel: string;
    contents: string;
    ip_address: string;
    service_type: string;
    // + 파트너
    company_name?: string;
    created_at?: string;
    is_partner?: boolean;
    refer_form?: string;
    area?: string;
}
