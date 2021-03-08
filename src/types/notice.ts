import * as React from 'react'

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
