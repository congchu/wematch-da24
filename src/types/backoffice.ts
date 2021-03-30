import * as React from 'react'
import {faqCategory} from 'pages/faq'

export interface INotice{
    id: number;
    title: string;
    contents: string;
    created_at: string;
    has_previous: boolean;
    has_next: boolean;
    num_pages: number;
    count: number;

}

export interface IFaq extends INotice {
    service_type: faqCategory;
}


export interface ContactFormData {
    id?: number | null;
    service_type: string;
    contact_type: string;
    name: string;
    tel: string;
    contents: string;
    created_at?: string
}

export interface PartnerFormData {
    id?: number | null,
    service_type: string;
    area: string;
    company_name: string;
    tel: string;
    reason: string;
    contents: string;
    created_at?: string;
}