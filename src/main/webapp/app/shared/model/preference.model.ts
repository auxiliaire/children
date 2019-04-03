import { IMeal } from 'app/shared/model/meal.model';
import { IChild } from 'app/shared/model/child.model';

export interface IPreference {
    id?: number;
    weight?: number;
    meal?: IMeal;
    child?: IChild;
}

export class Preference implements IPreference {
    constructor(public id?: number, public weight?: number, public meal?: IMeal, public child?: IChild) {}
}
