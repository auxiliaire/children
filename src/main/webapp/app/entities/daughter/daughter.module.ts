import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    DaughterComponent,
    DaughterDetailComponent,
    DaughterUpdateComponent,
    DaughterDeletePopupComponent,
    DaughterDeleteDialogComponent,
    daughterRoute,
    daughterPopupRoute
} from './';

const ENTITY_STATES = [...daughterRoute, ...daughterPopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DaughterComponent,
        DaughterDetailComponent,
        DaughterUpdateComponent,
        DaughterDeleteDialogComponent,
        DaughterDeletePopupComponent
    ],
    entryComponents: [DaughterComponent, DaughterUpdateComponent, DaughterDeleteDialogComponent, DaughterDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenDaughterModule {}
