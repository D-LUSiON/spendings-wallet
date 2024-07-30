import { environment } from '@env/environment';
import { Entry } from './classes';

export class Tools {
    static formatDate(date, format) {
        if (!date)
            return '';

        if (typeof date === 'string') {
            date = new Date(date);
        }

        const date_elements = {
            YYYY: date.getFullYear(),
            yyyy: date.getFullYear(),
            yy: date.getFullYear(),
            YY: date.getFullYear().toString().substr(2, 2),
            MM: ((date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)),
            M: date.getMonth() + 1,
            DD: ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()),
            dd: ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()),
            D: date.getDate(),
            HH: ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()),
            H: date.getHours(),
            mm: ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()),
            m: date.getMinutes(),
            ss: ((date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds()),
            s: date.getSeconds(),
            mss: ((date.getMilliseconds() / 1000).toFixed(3)).split('.').pop(),
        };

        let formatted = format.split('').join('');
        for (const key in date_elements) {
            if (date_elements.hasOwnProperty(key))
                formatted = formatted.replace(new RegExp(key, 'g'), date_elements[key]);
        }

        return formatted;
    }

    /**
     * Date string parser intended to be used with PrimeNG's Calendar input
     * @param date_string {string} Date to be parsed
     * @param format {string} that's used for the date
     * @param show_error {boolean} ...if you want to log errors
     */
    static stringToDate(date_string: string, format: string, show_error?: boolean): Date {
        const date_string_array = date_string.split(/[\s \.\-\\\/]/gi);
        const format_array = format.split(/[\s \.\-\\\/]/gi);
        const index = {
            YYYY: format_array.indexOf('YYYY'),
            yyyy: format_array.indexOf('yyyy'),
            yy: format_array.indexOf('yy'),
            YY: format_array.indexOf('YY'),
            MM: format_array.indexOf('MM'),
            M: format_array.indexOf('M'),
            mm: format_array.indexOf('mm'),
            m: format_array.indexOf('m'),
            DD: format_array.indexOf('DD'),
            dd: format_array.indexOf('dd'),
            D: format_array.indexOf('D'),
            d: format_array.indexOf('d'),
            // HH: format_array.indexOf('HH'),
            // H: format_array.indexOf('H'),
            // mm: format_array.indexOf('mm'),
            // m: format_array.indexOf('m'),
            // ss: format_array.indexOf('ss'),
            // s: format_array.indexOf('s'),
            // mss: format_array.indexOf('mss'),
        };

        const year = index.YYYY > -1 ?
            date_string_array[index.YYYY] :
            (index.yyyy > -1 ?
                date_string_array[index.yyyy] :
                (index.YY > -1 ?
                    date_string_array[index.YY] :
                    (index.yy > -1 ?
                        date_string_array[index.yy] :
                        ''
                    )
                )
            );

        const month = index.MM > -1 ?
            date_string_array[index.MM] :
            (index.M > -1 ?
                date_string_array[index.M] :
                (index.mm > -1 ?
                    date_string_array[index.mm] :
                    (index.m > -1 ?
                        date_string_array[index.m] :
                        ''
                    )
                )
            );

        const day = index.DD > -1 ?
            date_string_array[index.DD] :
            (index.D > -1 ?
                date_string_array[index.D] :
                (index.dd > -1 ?
                    date_string_array[index.dd] :
                    (index.d > -1 ?
                        date_string_array[index.d] :
                        ''
                    )
                )
            );

        if (year && month && day)
            return new Date(Date.parse(`${year}-${month}-${day}`));
        else {
            if (show_error) console.error('Please, provide valid date AND format!', date_string, format);
            return null;
        }
    }

    static makeUid(length?: number) {
        if (!length) length = 5;
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    static resolveObjValue(object, path: string) {
        let obj = {...object};
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        const path_arr = path.split('.');
        for (let i = 0, max = path_arr.length; i < max; i++) {
            const k = path_arr[i];
            if (k in obj) {
                obj = obj[k] || '';
            } else {
                return;
            }
        }
        return obj;
    }

    static formatCurrency(value: string | number, decimals?: boolean, separator?: string) {
        if (typeof value === 'number')
            value = value.toFixed(2);
        if (separator === undefined)
            separator = ' ';
        const value_arr = value.split('.');
        const sum_inv = value_arr[0].split('').reverse().join('');
        let sum_int = '';
        for (let i = 0; i < sum_inv.length; i++) {
            sum_int += (i > 0 && !(i % 3)) ? separator + sum_inv[i] : sum_inv[i];
        }
        sum_int = sum_int.split('').reverse().join('');

        return sum_int + ((decimals === undefined || decimals === false) ? '' : '.' + value_arr[1]);
    }

    static asObject(data, formatted?: any) {
        formatted = (!formatted) ? {} : formatted;

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] instanceof Date) {
                    formatted[key] = Tools.formatDate(data[key], 'yyyy-MM-ddTHH:mm:ss.mssZ');
                } else if (data[key] instanceof Array) {
                    if (!formatted[key]) formatted[key] = [];

                    data[key].forEach((x, i) => {
                        if (['string', 'number'].indexOf(typeof x) > -1)
                            formatted[key][i] = x;
                        else
                            formatted[key][i] = this.asObject(x);
                    });

                } else if (data[key] === null) {
                    formatted[key] = null;
                } else if (typeof data[key] === 'object') {
                    if (!formatted[key]) formatted[key] = {};

                    this.asObject(data[key], formatted[key]);
                } else {
                    formatted[key] = data[key];
                }
            }
        }
        return formatted;
    }

    static entriesByDate(entries: Entry[]): { [key: string]: Entry[] } {
        const by_date = {};
        const sorted_entries = entries.sort((a, b) => -(a.date.getTime() - b.date.getTime()));
        sorted_entries.forEach(entry => {
            const year = entry.date.getFullYear();
            const month = entry.date.getMonth() + 1;
            const date = entry.date.getDate();
            const date_string = `${year}-${month > 9 ? month : ('0' + month)}-${date > 9 ? date : '0' + date}`;
            if (!by_date[date_string])
                by_date[date_string] = [];
            by_date[date_string].push(entry);
        });
        return by_date;
    }


}
