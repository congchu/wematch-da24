import { middlewareApi } from 'lib/api';



//TODO: 쿼리스트링 변경 예정(API 수정)
export const getUserConsult = async (name:string, phone: string[]) => {

    //TODO: API 변경 시 삭제
    const query = `?name=${name}&phone1=${phone[0]}&phone2=${phone[1]}&phone3=${phone[2]}`;

    const { data } = await middlewareApi.request({
        method: 'GET',
        url: `/user/orders${query}`
    })

    return data;
}