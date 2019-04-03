import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    ChildComponent,
    ChildDetailComponent,
    ChildUpdateComponent,
    ChildDeletePopupComponent,
    ChildDeleteDialogComponent,
    childRoute,
    childPopupRoute
} from './';

const ENTITY_STATES = [...childRoute, ...childPopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ChildComponent, ChildDetailComponent, ChildUpdateComponent, ChildDeleteDialogComponent, ChildDeletePopupComponent],
    entryComponents: [ChildComponent, ChildUpdateComponent, ChildDeleteDialogComponent, ChildDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenChildModule {}
