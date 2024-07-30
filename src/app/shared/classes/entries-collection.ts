import { Entry } from '.';

export class EntriesCollection extends Array<Entry> {

    constructor(entries: (Entry | { [key: string]: any })[]) {
        super(...(entries || []).map(x => new Entry(x)));
    }

    getByDate(): { [key: string]: Entry[] } {
        const by_date = {};
        this.sort((a, b) => -(a.date.getTime() - b.date.getTime())).forEach(entry => {
            const date_string = `${entry.date.getFullYear()}-0${entry.date.getMonth()}-0${entry.date.getDate()}`.replace(/\-00/g, '-0');
            if (!by_date[date_string])
                by_date[date_string] = [];
            by_date[date_string].push(entry);
        });
        return by_date;
    }
}
