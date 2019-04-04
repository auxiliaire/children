export interface IDaughter {
    id?: number;
    hairColor?: string;
}

export class Daughter implements IDaughter {
    constructor(public id?: number, public hairColor?: string) {}
}
