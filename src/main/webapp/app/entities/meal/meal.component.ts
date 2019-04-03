import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMeal } from 'app/shared/model/meal.model';
import { AccountService } from 'app/core';
import { MealService } from './meal.service';

@Component({
    selector: 'jhi-meal',
    templateUrl: './meal.component.html'
})
export class MealComponent implements OnInit, OnDestroy {
    meals: IMeal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected mealService: MealService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.mealService
            .query()
            .pipe(
                filter((res: HttpResponse<IMeal[]>) => res.ok),
                map((res: HttpResponse<IMeal[]>) => res.body)
            )
            .subscribe(
                (res: IMeal[]) => {
                    this.meals = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMeals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMeal) {
        return item.id;
    }

    registerChangeInMeals() {
        this.eventSubscriber = this.eventManager.subscribe('mealListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
