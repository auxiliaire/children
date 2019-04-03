import { IChild } from 'app/shared/model/child.model';
import { IHouse } from 'app/shared/model/house.model';

export interface IPerson {
    id?: number;
    name?: string;
    age?: number;
    children?: IChild[];
    house?: IHouse;
}

export class Person implements IPerson {
    constructor(public id?: number, public name?: string, public age?: number, public children?: IChild[], public house?: IHouse) {}
}
