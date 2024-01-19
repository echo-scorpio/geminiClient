export function dateFormat(date:Date | string, format:string) {
    const d = new Date()
    format = format || 'yyyy/MM/dd hh:mm:ss';
    if (date !== 'Invalid Date') {
      let o = {
        'M+': (date as Date).getMonth() + 1, //month
        'd+': (date as Date).getDate(), //day
        'h+': (date as Date).getHours(), //hour
        'm+': (date as Date).getMinutes(), //minute
        's+': (date as Date).getSeconds(), //second
        'q+': Math.floor(((date as Date).getMonth() + 3) / 3), //quarter
        S: (date as Date).getMilliseconds(), //millisecond
      };
      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          ((date as Date).getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp('(' + k + ')').test(format))
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length === 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
      return format;
    }
    return '';
  }