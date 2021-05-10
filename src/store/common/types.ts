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
    isVerified: boolean | undefined;
}
export interface RequestUserInfoInsert {
    uuid?: string;
    moving_type: '가정' | '원룸' | '사무실' | undefined;
    moving_date: string;
    sido: string;
    gugun: string;
    dong: string;
    floor: string;
    detail_addr: string;
    sido2: string;
    gugun2: string;
    dong2: string;
    floor2: string;
    detail_addr2: string;
    distance: number;
    name: string;
    phone1: string;
    phone2: string;
    phone3: string;
    keep_move: boolean;
    mkt_agree: boolean;
    agent_id: string | string[] | null | undefined;
    memo: string;
}

export interface RequestUserInfoInsertProps {
    idx: string;
}

export enum MovingType {
    house = '가정',
    oneroom = '원룸',
    office = '사무실'
}

export interface RequestCompletedMoveIdxProps {
    inquiry_idx: string;
}

export type JusoType = 'road' | 'jibun'

export interface Juso {
    detBdNmList: string;
    engAddr: string;
    rn: string;
    emdNm: string;
    zipNo: string;
    roadAddrPart2: string;
    emdNo: string;
    sggNm: string;
    jibunAddr: string;
    siNm: string;
    roadAddrPart1: string;
    bdNm: string;
    admCd: string;
    udrtYn: string;
    lnbrMnnm: string;
    roadAddr: string;
    lnbrSlno: string;
    buldMnnm: string;
    bdKdcd: string;
    liNm: string;
    rnMgtSn: string;
    mtYn: string;
    bdMgtSn: string;
    buldSlno: string;
}

export interface RequestAddressProps {
    keyword: string;
    currPage: number;
    cntPerPage: number;
}

export interface ResponseAddressProps {
    results: {
        common: {
            errorMessage: string;
            countPerPage: string;
            totalCount: string;
            errorCode: string;
            currentPage: string;
        }
        juso: Juso[]
    },
    error: string;
}

export interface AddressErrorType {
    code: string;
    message: string;
}

export interface RequestDistanceType {
    startZone: string;
    startRoad: string;
    startIsGf: string;
    startMainBd: string;
    startSubBd: string;
    endZone: string;
    endRoad: string;
    endIsGf: string;
    endMainBd: string;
    endSubBd: string;
}

export interface ResponseDistanceType {
    data: string;
    error: string;
}
