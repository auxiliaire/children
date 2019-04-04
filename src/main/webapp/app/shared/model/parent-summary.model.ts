export interface IParentSummary {
    id?: number;
    amountOfPersons?: number;
    amountOfChildren?: number;
}

export class ParentSummary implements IParentSummary {
    constructor(public id?: number, public amountOfPersons?: number, public amountOfChildren?: number) {}
}
