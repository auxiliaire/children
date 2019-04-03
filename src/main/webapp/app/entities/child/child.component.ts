import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChild } from 'app/shared/model/child.model';
import { AccountService } from 'app/core';
import { ChildService } from './child.service';

@Component({
    selector: 'jhi-child',
    templateUrl: './child.component.html'
})
export class ChildComponent implements OnInit, OnDestroy {
    children: IChild[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected childService: ChildService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.childService
            .query()
            .pipe(
                filter((res: HttpResponse<IChild[]>) => res.ok),
                map((res: HttpResponse<IChild[]>) => res.body)
            )
            .subscribe(
                (res: IChild[]) => {
                    this.children = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChildren();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChild) {
        return item.id;
    }

    registerChangeInChildren() {
        this.eventSubscriber = this.eventManager.subscribe('childListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
