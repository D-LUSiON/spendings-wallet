import { Pipe, PipeTransform } from '@angular/core';
import { Tools } from '..';
import { Entry } from '../classes';

@Pipe({
    name: 'entriesByDate'
})
export class EntriesByDatePipe implements PipeTransform {

    transform(entries: Entry[], ...args: unknown[]): { [key: string]: Entry[]} {
        return Tools.entriesByDate(entries);
    }

}
