import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

    transform(value: number, ...args: unknown[]): unknown {
        if (typeof value === 'string')
            return value;
        const fixed = (value || 0).toFixed(2);
        const fixed_arr = fixed.split('').reverse();
        const fixed_arr_formatted = fixed_arr.slice(0, 3);
        for (let idx = 3; idx < fixed_arr.length; idx++) {
            fixed_arr_formatted.push(fixed_arr[idx]);
            if (idx % 3 === 2 && idx < fixed_arr.length - (fixed_arr[fixed_arr.length - 1] === '-' ? 2 : 1))
                fixed_arr_formatted.push(`'`);
        }
        return fixed_arr_formatted.reverse().join('');
    }

}
