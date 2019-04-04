import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Son } from 'app/shared/model/son.model';
import { SonService } from './son.service';
import { SonComponent } from './son.component';
import { SonDetailComponent } from './son-detail.component';
import { SonUpdateComponent } from './son-update.component';
import { SonDeletePopupComponent } from './son-delete-dialog.component';
import { ISon } from 'app/shared/model/son.model';

@Injectable({ providedIn: 'root' })
export class SonResolve implements Resolve<ISon> {
    constructor(private service: SonService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISon> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Son>) => response.ok),
                map((son: HttpResponse<Son>) => son.body)
            );
        }
        return of(new Son());
    }
}

export const sonRoute: Routes = [
    {
        path: '',
        component: SonComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SonDetailComponent,
        resolve: {
            son: SonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SonUpdateComponent,
        resolve: {
            son: SonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sons'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SonUpdateComponent,
        resolve: {
            son: SonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sons'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sonPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SonDeletePopupComponent,
        resolve: {
            son: SonResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sons'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
