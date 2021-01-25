export interface SubmittedForm {
    'result': 'success' | 'no partner' | 'no service';
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
}
