export enum CurrencyPosition {
    after,
    before,
}

export class Currency {

    id: number;
    name: string;
    position: CurrencyPosition = CurrencyPosition.after;
    sign: string;

    constructor(data?: object) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('name')) this.name = data['name'];
            if (data.hasOwnProperty('position')) this.position = data['position'];
            if (data.hasOwnProperty('sign')) this.sign = data['sign'];
        }
    }

}
