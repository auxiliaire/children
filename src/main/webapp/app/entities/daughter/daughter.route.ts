import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Daughter } from 'app/shared/model/daughter.model';
import { DaughterService } from './daughter.service';
import { DaughterComponent } from './daughter.component';
import { DaughterDetailComponent } from './daughter-detail.component';
import { DaughterUpdateComponent } from './daughter-update.component';
import { DaughterDeletePopupComponent } from './daughter-delete-dialog.component';
import { IDaughter } from 'app/shared/model/daughter.model';

@Injectable({ providedIn: 'root' })
export class DaughterResolve implements Resolve<IDaughter> {
    constructor(private service: DaughterService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDaughter> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Daughter>) => response.ok),
                map((daughter: HttpResponse<Daughter>) => daughter.body)
            );
        }
        return of(new Daughter());
    }
}

export const daughterRoute: Routes = [
    {
        path: '',
        component: DaughterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Daughters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DaughterDetailComponent,
        resolve: {
            daughter: DaughterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Daughters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DaughterUpdateComponent,
        resolve: {
            daughter: DaughterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Daughters'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DaughterUpdateComponent,
        resolve: {
            daughter: DaughterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Daughters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const daughterPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DaughterDeletePopupComponent,
        resolve: {
            daughter: DaughterResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Daughters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
