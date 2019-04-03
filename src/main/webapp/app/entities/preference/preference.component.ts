import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPreference } from 'app/shared/model/preference.model';
import { AccountService } from 'app/core';
import { PreferenceService } from './preference.service';

@Component({
    selector: 'jhi-preference',
    templateUrl: './preference.component.html'
})
export class PreferenceComponent implements OnInit, OnDestroy {
    preferences: IPreference[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected preferenceService: PreferenceService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.preferenceService
            .query()
            .pipe(
                filter((res: HttpResponse<IPreference[]>) => res.ok),
                map((res: HttpResponse<IPreference[]>) => res.body)
            )
            .subscribe(
                (res: IPreference[]) => {
                    this.preferences = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPreferences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPreference) {
        return item.id;
    }

    registerChangeInPreferences() {
        this.eventSubscriber = this.eventManager.subscribe('preferenceListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
