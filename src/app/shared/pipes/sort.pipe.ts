import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(
        value: { key: string, value: { [key: string]: any } }[],
        ascending = true
    ): { key: string, value: { [key: string]: any } }[] {
        const sorted = value.sort((val, next) => {
            if (val.key > next.key)
                return 1;
            if (val.key < next.key)
                return -1;
            return 0;
        });
        if (ascending)
            return sorted;
        return sorted.reverse();
    }

}
