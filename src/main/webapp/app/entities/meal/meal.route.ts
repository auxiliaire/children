import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Meal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';
import { MealComponent } from './meal.component';
import { MealDetailComponent } from './meal-detail.component';
import { MealUpdateComponent } from './meal-update.component';
import { MealDeletePopupComponent } from './meal-delete-dialog.component';
import { IMeal } from 'app/shared/model/meal.model';

@Injectable({ providedIn: 'root' })
export class MealResolve implements Resolve<IMeal> {
    constructor(private service: MealService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMeal> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Meal>) => response.ok),
                map((meal: HttpResponse<Meal>) => meal.body)
            );
        }
        return of(new Meal());
    }
}

export const mealRoute: Routes = [
    {
        path: '',
        component: MealComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MealDetailComponent,
        resolve: {
            meal: MealResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MealUpdateComponent,
        resolve: {
            meal: MealResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MealUpdateComponent,
        resolve: {
            meal: MealResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mealPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MealDeletePopupComponent,
        resolve: {
            meal: MealResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Meals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
