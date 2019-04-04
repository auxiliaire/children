import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IParentSummary } from 'app/shared/model/parent-summary.model';
import { AccountService } from 'app/core';
import { ParentSummaryService } from './parent-summary.service';

@Component({
    selector: 'jhi-parent-summary',
    templateUrl: './parent-summary.component.html'
})
export class ParentSummaryComponent implements OnInit, OnDestroy {
    parentSummaries: IParentSummary[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected parentSummaryService: ParentSummaryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.parentSummaryService
            .query()
            .pipe(
                filter((res: HttpResponse<IParentSummary[]>) => res.ok),
                map((res: HttpResponse<IParentSummary[]>) => res.body)
            )
            .subscribe(
                (res: IParentSummary[]) => {
                    this.parentSummaries = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInParentSummaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParentSummary) {
        return item.id;
    }

    registerChangeInParentSummaries() {
        this.eventSubscriber = this.eventManager.subscribe('parentSummaryListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
