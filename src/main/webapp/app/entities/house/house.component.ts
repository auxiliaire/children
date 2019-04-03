import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHouse } from 'app/shared/model/house.model';
import { AccountService } from 'app/core';
import { HouseService } from './house.service';

@Component({
    selector: 'jhi-house',
    templateUrl: './house.component.html'
})
export class HouseComponent implements OnInit, OnDestroy {
    houses: IHouse[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected houseService: HouseService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.houseService
            .query()
            .pipe(
                filter((res: HttpResponse<IHouse[]>) => res.ok),
                map((res: HttpResponse<IHouse[]>) => res.body)
            )
            .subscribe(
                (res: IHouse[]) => {
                    this.houses = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInHouses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHouse) {
        return item.id;
    }

    registerChangeInHouses() {
        this.eventSubscriber = this.eventManager.subscribe('houseListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
