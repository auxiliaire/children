import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDaughter } from 'app/shared/model/daughter.model';
import { AccountService } from 'app/core';
import { DaughterService } from './daughter.service';

@Component({
    selector: 'jhi-daughter',
    templateUrl: './daughter.component.html'
})
export class DaughterComponent implements OnInit, OnDestroy {
    daughters: IDaughter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected daughterService: DaughterService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.daughterService
            .query()
            .pipe(
                filter((res: HttpResponse<IDaughter[]>) => res.ok),
                map((res: HttpResponse<IDaughter[]>) => res.body)
            )
            .subscribe(
                (res: IDaughter[]) => {
                    this.daughters = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDaughters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDaughter) {
        return item.id;
    }

    registerChangeInDaughters() {
        this.eventSubscriber = this.eventManager.subscribe('daughterListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
