/* 숫자사이에 , 찍어주는 함수
 *  ex) 1,000
 *  */
export const commaInNumbers = (num: number): string => {
  const addComma = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(addComma, ",");
};
