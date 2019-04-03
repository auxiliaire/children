import { IPerson } from 'app/shared/model/person.model';

export const enum HouseType {
    FLAT = 'FLAT',
    HOUSE = 'HOUSE',
    ESTATE = 'ESTATE'
}

export interface IHouse {
    id?: number;
    address?: string;
    zipCode?: string;
    type?: HouseType;
    person?: IPerson;
}

export class House implements IHouse {
    constructor(public id?: number, public address?: string, public zipCode?: string, public type?: HouseType, public person?: IPerson) {}
}
