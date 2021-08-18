// 중간이름 * 처리
export const maskingName = (strName: string) => {
  if (strName.length > 2) {
    const originName = strName.split('');
    originName.forEach(function(name, i) {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    const joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    const pattern = /.$/;
    return strName.replace(pattern, '*');
  }
};

// 앞에 두 자리만 ** 처리
export const maskingPhone = (phone: string) => {
  if (phone.length === 4) {
    return '**' + phone.substring(2, 4);
  } else if (phone.length === 3) {
    return '*' + phone.substring(2, 1) + '*';
  }
  return ''
};
