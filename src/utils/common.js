import { getProjectId } from '@/utils/auth'

export function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  //bits12-15ofthetime_hi_and_versionfieldto0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  //bits6-7oftheclock_seq_hi_and_reservedto01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}

export function getBasePath() {
    let prev = '/web/#/prev?pid=' + getProjectId()
    return prev
}