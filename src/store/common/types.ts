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
  moving_type: "가정" | "원룸" | "사무실" | undefined;
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
  auto_match: boolean;
}

export interface RequestUserInfoInsertProps {
  idx: string;
}

export enum MovingType {
  house = "가정",
  oneroom = "원룸",
  office = "사무실"
}

export interface RequestCompletedMoveIdxProps {
  inquiry_idx: string;
}

export type JusoType = "road" | "jibun";

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
    };
    juso: Juso[];
  };
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

export interface IRequestFeedbackForm {
  idx: string;
  partner_id: string; // 업체 id. 기억 안남일 시에는 "NOMEMORY" 사용
  service_type: "move" | "clean"; // 서비스 타입. 이사인 경우 "move", 청소인 경우 "clean"
  professionalism_score: number; // 전문성 점수, 매우 불만족~매우 만족(1~5)
  kindness_score: number; // 친절도 점수, 매우 불만족~매우 만족(1~5)
  price_score: number; // 가격만족도 점수, 매우 불만족~매우 만족(1~5)
  price: number; // 총 비용. 단위: 원
  extra_price: number; // 추가 발생 비용. 단위: 원
  advice_to_others: string; // 이 업체 선택을 고민하는 고객에게 한마디
  publish_agree: boolean; // 평가 공개 여부
  use_next_time: boolean; // 위매치를 다음에 이용할 의향
}
export interface EstimatePartnerForm {
  partner_id: string;
  professionalism_score: number;
  kindness_score: number;
  price_score: number;
  advice_to_others: string;
}
export interface RequestEstimateForm {
  idx: string;
  estimated_partners: EstimatePartnerForm[];
  not_estimated_partners: {
    partner_id: string;
  }[];
  use_next_time: boolean;
}
