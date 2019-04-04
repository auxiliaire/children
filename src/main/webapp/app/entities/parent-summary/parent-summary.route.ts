import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParentSummary } from 'app/shared/model/parent-summary.model';
import { ParentSummaryService } from './parent-summary.service';
import { ParentSummaryComponent } from './parent-summary.component';
import { ParentSummaryDetailComponent } from './parent-summary-detail.component';
import { ParentSummaryUpdateComponent } from './parent-summary-update.component';
import { ParentSummaryDeletePopupComponent } from './parent-summary-delete-dialog.component';
import { IParentSummary } from 'app/shared/model/parent-summary.model';

@Injectable({ providedIn: 'root' })
export class ParentSummaryResolve implements Resolve<IParentSummary> {
    constructor(private service: ParentSummaryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParentSummary> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ParentSummary>) => response.ok),
                map((parentSummary: HttpResponse<ParentSummary>) => parentSummary.body)
            );
        }
        return of(new ParentSummary());
    }
}

export const parentSummaryRoute: Routes = [
    {
        path: '',
        component: ParentSummaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParentSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ParentSummaryDetailComponent,
        resolve: {
            parentSummary: ParentSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParentSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ParentSummaryUpdateComponent,
        resolve: {
            parentSummary: ParentSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParentSummaries'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ParentSummaryUpdateComponent,
        resolve: {
            parentSummary: ParentSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParentSummaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentSummaryPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ParentSummaryDeletePopupComponent,
        resolve: {
            parentSummary: ParentSummaryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ParentSummaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
