import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Child } from 'app/shared/model/child.model';
import { ChildService } from './child.service';
import { ChildComponent } from './child.component';
import { ChildDetailComponent } from './child-detail.component';
import { ChildUpdateComponent } from './child-update.component';
import { ChildDeletePopupComponent } from './child-delete-dialog.component';
import { IChild } from 'app/shared/model/child.model';

@Injectable({ providedIn: 'root' })
export class ChildResolve implements Resolve<IChild> {
    constructor(private service: ChildService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChild> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Child>) => response.ok),
                map((child: HttpResponse<Child>) => child.body)
            );
        }
        return of(new Child());
    }
}

export const childRoute: Routes = [
    {
        path: '',
        component: ChildComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Children'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ChildDetailComponent,
        resolve: {
            child: ChildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Children'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ChildUpdateComponent,
        resolve: {
            child: ChildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Children'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ChildUpdateComponent,
        resolve: {
            child: ChildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Children'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const childPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ChildDeletePopupComponent,
        resolve: {
            child: ChildResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Children'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
