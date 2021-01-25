import { middlewareApi } from 'lib/api';



//TODO: 쿼리스트링 변경 예정(API 수정)
export const getUserConsult = async () => {

    //TODO: API 변경 시 삭제
    const query = `?name=강혜림&phone1=010&phone2=2666&phone3=3903`;

    const { data } = await middlewareApi.request({
        method: 'GET',
        url: `/user/orders${query}`
    })

    return data;
}