import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    SonComponent,
    SonDetailComponent,
    SonUpdateComponent,
    SonDeletePopupComponent,
    SonDeleteDialogComponent,
    sonRoute,
    sonPopupRoute
} from './';

const ENTITY_STATES = [...sonRoute, ...sonPopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SonComponent, SonDetailComponent, SonUpdateComponent, SonDeleteDialogComponent, SonDeletePopupComponent],
    entryComponents: [SonComponent, SonUpdateComponent, SonDeleteDialogComponent, SonDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenSonModule {}
