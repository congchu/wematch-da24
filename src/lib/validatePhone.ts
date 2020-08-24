export default (phone: string) => {
    let splitPhone = '';
    for (let i = 0; i < phone.length; ++i) {
        if ('0123456789'.indexOf(phone[i]) !== -1) {
            splitPhone += phone[i];
        }
    }

    let phone1 = splitPhone.substring(0, 3);
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
        phone1, phone2, phone3
    }
}