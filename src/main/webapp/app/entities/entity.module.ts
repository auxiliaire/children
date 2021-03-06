import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'person',
                loadChildren: './person/person.module#ChildrenPersonModule'
            },
            {
                path: 'child',
                loadChildren: './child/child.module#ChildrenChildModule'
            },
            {
                path: 'preference',
                loadChildren: './preference/preference.module#ChildrenPreferenceModule'
            },
            {
                path: 'meal',
                loadChildren: './meal/meal.module#ChildrenMealModule'
            },
            {
                path: 'house',
                loadChildren: './house/house.module#ChildrenHouseModule'
            },
            {
                path: 'person',
                loadChildren: './person/person.module#ChildrenPersonModule'
            },
            {
                path: 'child',
                loadChildren: './child/child.module#ChildrenChildModule'
            },
            {
                path: 'daughter',
                loadChildren: './daughter/daughter.module#ChildrenDaughterModule'
            },
            {
                path: 'son',
                loadChildren: './son/son.module#ChildrenSonModule'
            },
            {
                path: 'parent-summary',
                loadChildren: './parent-summary/parent-summary.module#ChildrenParentSummaryModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChildrenEntityModule {}
