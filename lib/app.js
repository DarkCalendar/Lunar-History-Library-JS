function convertToGregorian(YY, MM, DD) {
  const jd = Math.floor((11 * YY + 3) / 30) + 354 * YY + 30 * MM - Math.floor((MM - 1) / 2) + DD + 1948440 - 385;
  
  if (jd > 2299160) {
    const l = jd + 68569;
    const n = Math.floor((4 * l) / 146097);
    l -= Math.floor((146097 * n + 3) / 4);
    const i = Math.floor((4000 * (l + 1)) / 1461001);
    l -= Math.floor((1461 * i) / 4) - 31;
    const j = Math.floor((80 * l) / 2447);
    const D = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    const M = j + 2 - 12 * l;
    const Y = 100 * (n - 49) + i + l;
    
    return `${Y}-${M}-${D}`;
  } else {
    const j = jd + 1402;
    const k = Math.floor((j - 1) / 1461);
    const l = j - 1461 * k;
    const n = Math.floor((l - 1) / 365) - Math.floor(l / 1461);
    const i = l - 365 * n + 30;
    const j = Math.floor((80 * i) / 2447);
    const D = i - Math.floor((2447 * j) / 80);
    i = Math.floor(j / 11);
    const M = j + 2 - 12 * i;
    const Y = 4 * k + n + i - 4716;
    
    return `${Y}-${M}-${D}`;
  }
}
