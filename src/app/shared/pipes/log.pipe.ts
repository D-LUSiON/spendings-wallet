import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'log'
})
export class ConsoleLogPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {
        console.log('%c[console.log pipe]', 'color: #bada55', ...[value, ...(args || [])]);
        return '';
    }

}
