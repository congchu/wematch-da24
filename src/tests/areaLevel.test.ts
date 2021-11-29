import { sendPixelAreaAvgPrice } from 'lib/facebookPixel'
import { sendGAdsAreaAvgPrice } from 'lib/googleAds'
import { Juso } from 'store/common/types'
const gangnam: Juso = {
  detBdNmList: '',
  engAddr: '328, Gangnam-daero, Gangnam-gu, Seoul',
  rn: '강남대로',
  emdNm: '역삼동',
  zipNo: '06252',
  roadAddrPart2: '(역삼동)',
  emdNo: '01',
  sggNm: '강남구',
  jibunAddr: '서울특별시 강남구 역삼동 832-3 강남역 쉐르빌',
  siNm: '서울특별시',
  roadAddrPart1: '서울특별시 강남구 강남대로 328',
  bdNm: '강남역 쉐르빌',
  admCd: '1168010100',
  udrtYn: '0',
  lnbrMnnm: '832',
  roadAddr: '서울특별시 강남구 강남대로 328(역삼동)',
  lnbrSlno: '3',
  buldMnnm: '328',
  bdKdcd: '0',
  liNm: '',
  rnMgtSn: '116802102001',
  mtYn: '0',
  bdMgtSn: '1168010100108320003025902',
  buldSlno: '0',
}

const mapo: Juso = {
  detBdNmList: '',
  engAddr: '14, Donggyo-ro 38-gil, Mapo-gu, Seoul',
  rn: '동교로38길',
  emdNm: '연남동',
  zipNo: '03982',
  roadAddrPart2: '(연남동)',
  emdNo: '01',
  sggNm: '마포구',
  jibunAddr: '서울특별시 마포구 연남동 390-95 Giddy mansion',
  siNm: '서울특별시',
  roadAddrPart1: '서울특별시 마포구 동교로38길 14',
  bdNm: 'Giddy mansion',
  admCd: '1144012400',
  udrtYn: '0',
  lnbrMnnm: '390',
  roadAddr: '서울특별시 마포구 동교로38길 14(연남동)',
  lnbrSlno: '95',
  buldMnnm: '14',
  bdKdcd: '0',
  liNm: '',
  rnMgtSn: '114404139118',
  mtYn: '0',
  bdMgtSn: '1144012400103900095020016',
  buldSlno: '0',
}

it('페이스북 픽셀', () => {
  sendPixelAreaAvgPrice('사무실', '서울특별시','마포구')
  sendPixelAreaAvgPrice('사무실', "서울특별시",'강남구')
})

it('구글 애드워즈', () => {
  sendGAdsAreaAvgPrice('사무실', '서울특별시','마포구')
  sendGAdsAreaAvgPrice('가정', "서울특별시",'강남구')
})
