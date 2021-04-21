export interface SubmittedForm {
    'result': ESubmittedFormResult;
    'match_list': {
        'adminname': string;
        'adminid': string;
        'experience': string;
        'pick_cnt' : number;
        'feedback_cnt': number;
        'level': string;
        'level_text': string;
        'status': string;
    }[];
    'inquiry_idx': string;
}


export enum ESubmittedFormResult {
    Success = 'success',
    NoPartner = 'no partner',
    NoService = 'no service'
}