import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatIconName'
})
export class FormatIconNamePipe implements PipeTransform {

    transform(value: string): unknown {
        return value.split(/[\-_]/).map(word => `${word.charAt(0).toUpperCase()}${word.substr(1)}`).join(' ');
    }

}
