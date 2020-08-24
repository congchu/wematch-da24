export const addressSplit = (address: string) => {
 let result = address.split(' ');
 if(result.length === 4) {
   return {
     sido: result[0],
     gugun: `${result[1]} ${result[2]}`,
     dong: result[3],
   }
 } else {
   return {
     sido: result[0],
     gugun: result[1],
     dong: result[2]
   }
 }
}

export const phoneSplit = (phone: string) => {
  let phone1 = phone.substring(0, 3);
  let phone2 = '';
  let phone3 = '';

  if (phone.length === 10) {
    phone2 = phone.substring(3, 6);
    phone3 = phone.substring(6, 10);
  } else if (phone.length === 11) {
    phone2 = phone.substring(3, 7);
    phone3 = phone.substring(7, 11);
  }

  return {
    phone1,
    phone2,
    phone3
  }
}

export const translateMovingType = (type?: string) => {
  switch (type) {
    case 'house':
      return '가정'
    case 'oneroom':
      return '원룸'
    case 'office':
      return '사무실'
  }
}