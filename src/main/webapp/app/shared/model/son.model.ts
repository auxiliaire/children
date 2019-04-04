export interface ISon {
    id?: number;
    bicycleColor?: string;
}

export class Son implements ISon {
    constructor(public id?: number, public bicycleColor?: string) {}
}
