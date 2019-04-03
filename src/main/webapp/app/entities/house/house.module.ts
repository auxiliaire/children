import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    HouseComponent,
    HouseDetailComponent,
    HouseUpdateComponent,
    HouseDeletePopupComponent,
    HouseDeleteDialogComponent,
    houseRoute,
    housePopupRoute
} from './';

const ENTITY_STATES = [...houseRoute, ...housePopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HouseComponent, HouseDetailComponent, HouseUpdateComponent, HouseDeleteDialogComponent, HouseDeletePopupComponent],
    entryComponents: [HouseComponent, HouseUpdateComponent, HouseDeleteDialogComponent, HouseDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenHouseModule {}
