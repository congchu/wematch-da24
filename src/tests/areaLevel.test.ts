import { sendPixelAreaAvgPrice } from 'lib/facebookPixel'
import { sendGAdsAreaAvgPrice } from 'lib/googleAds'

it('페이스북 픽셀', () => {
  sendPixelAreaAvgPrice('사무실', '서울특별시','마포구')
  sendPixelAreaAvgPrice('사무실', "서울특별시",'강남구')
})

it('구글 애드워즈', () => {
  sendGAdsAreaAvgPrice('사무실', '서울특별시','마포구')
  sendGAdsAreaAvgPrice('가정', "서울특별시",'강남구')
})
