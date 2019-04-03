import { IPreference } from 'app/shared/model/preference.model';
import { IPerson } from 'app/shared/model/person.model';

export interface IChild {
    id?: number;
    name?: string;
    age?: number;
    preferences?: IPreference[];
    parent?: IPerson;
}

export class Child implements IChild {
    constructor(
        public id?: number,
        public name?: string,
        public age?: number,
        public preferences?: IPreference[],
        public parent?: IPerson
    ) {}
}
