import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ChildrenSharedModule } from 'app/shared';
import {
    MealComponent,
    MealDetailComponent,
    MealUpdateComponent,
    MealDeletePopupComponent,
    MealDeleteDialogComponent,
    mealRoute,
    mealPopupRoute
} from './';

const ENTITY_STATES = [...mealRoute, ...mealPopupRoute];

@NgModule({
    imports: [ChildrenSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MealComponent, MealDetailComponent, MealUpdateComponent, MealDeleteDialogComponent, MealDeletePopupComponent],
    entryComponents: [MealComponent, MealUpdateComponent, MealDeleteDialogComponent, MealDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenMealModule {}
