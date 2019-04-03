import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { House } from 'app/shared/model/house.model';
import { HouseService } from './house.service';
import { HouseComponent } from './house.component';
import { HouseDetailComponent } from './house-detail.component';
import { HouseUpdateComponent } from './house-update.component';
import { HouseDeletePopupComponent } from './house-delete-dialog.component';
import { IHouse } from 'app/shared/model/house.model';

@Injectable({ providedIn: 'root' })
export class HouseResolve implements Resolve<IHouse> {
    constructor(private service: HouseService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHouse> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<House>) => response.ok),
                map((house: HttpResponse<House>) => house.body)
            );
        }
        return of(new House());
    }
}

export const houseRoute: Routes = [
    {
        path: '',
        component: HouseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: HouseDetailComponent,
        resolve: {
            house: HouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: HouseUpdateComponent,
        resolve: {
            house: HouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: HouseUpdateComponent,
        resolve: {
            house: HouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const housePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: HouseDeletePopupComponent,
        resolve: {
            house: HouseResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Houses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
