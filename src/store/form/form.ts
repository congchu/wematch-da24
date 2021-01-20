// submit용 폼
// 나중에 response 이걸로 처리 (?)
export interface SubmittedForm {
    // 'who': string;
    // 'when': string;
    // 'starting_point': string;
    // 'destination': string;
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

