import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    ParentSummaryComponent,
    ParentSummaryDetailComponent,
    ParentSummaryUpdateComponent,
    ParentSummaryDeletePopupComponent,
    ParentSummaryDeleteDialogComponent,
    parentSummaryRoute,
    parentSummaryPopupRoute
} from './';

const ENTITY_STATES = [...parentSummaryRoute, ...parentSummaryPopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ParentSummaryComponent,
        ParentSummaryDetailComponent,
        ParentSummaryUpdateComponent,
        ParentSummaryDeleteDialogComponent,
        ParentSummaryDeletePopupComponent
    ],
    entryComponents: [
        ParentSummaryComponent,
        ParentSummaryUpdateComponent,
        ParentSummaryDeleteDialogComponent,
        ParentSummaryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenParentSummaryModule {}
