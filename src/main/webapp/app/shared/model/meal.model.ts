import { Moment } from 'moment';

export interface IMeal {
    id?: number;
    name?: string;
    invented?: Moment;
}

export class Meal implements IMeal {
    constructor(public id?: number, public name?: string, public invented?: Moment) {}
}
