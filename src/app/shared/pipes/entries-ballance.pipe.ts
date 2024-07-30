import { Pipe, PipeTransform } from '@angular/core';
import { Entry } from '../classes';

@Pipe({
    name: 'entriesBallance'
})
export class EntriesBallancePipe implements PipeTransform {

    transform(entries: Entry[]): number {
        return entries.map(entry => entry.type === 'income' ? entry.value : (entry.type === 'expence' ? -entry.value : 0)).reduce((acc, next) => acc + next);
    }

}
