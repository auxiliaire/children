import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISon } from 'app/shared/model/son.model';
import { AccountService } from 'app/core';
import { SonService } from './son.service';

@Component({
    selector: 'jhi-son',
    templateUrl: './son.component.html'
})
export class SonComponent implements OnInit, OnDestroy {
    sons: ISon[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sonService: SonService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sonService
            .query()
            .pipe(
                filter((res: HttpResponse<ISon[]>) => res.ok),
                map((res: HttpResponse<ISon[]>) => res.body)
            )
            .subscribe(
                (res: ISon[]) => {
                    this.sons = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSons();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISon) {
        return item.id;
    }

    registerChangeInSons() {
        this.eventSubscriber = this.eventManager.subscribe('sonListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
