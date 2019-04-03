import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPreference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from 'app/entities/meal';
import { IChild } from 'app/shared/model/child.model';
import { ChildService } from 'app/entities/child';

@Component({
    selector: 'jhi-preference-update',
    templateUrl: './preference-update.component.html'
})
export class PreferenceUpdateComponent implements OnInit {
    preference: IPreference;
    isSaving: boolean;

    meals: IMeal[];

    children: IChild[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected preferenceService: PreferenceService,
        protected mealService: MealService,
        protected childService: ChildService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ preference }) => {
            this.preference = preference;
        });
        this.mealService
            .query({ filter: 'preference-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IMeal[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMeal[]>) => response.body)
            )
            .subscribe(
                (res: IMeal[]) => {
                    if (!this.preference.meal || !this.preference.meal.id) {
                        this.meals = res;
                    } else {
                        this.mealService
                            .find(this.preference.meal.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IMeal>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IMeal>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IMeal) => (this.meals = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.childService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IChild[]>) => mayBeOk.ok),
                map((response: HttpResponse<IChild[]>) => response.body)
            )
            .subscribe((res: IChild[]) => (this.children = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.preference.id !== undefined) {
            this.subscribeToSaveResponse(this.preferenceService.update(this.preference));
        } else {
            this.subscribeToSaveResponse(this.preferenceService.create(this.preference));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreference>>) {
        result.subscribe((res: HttpResponse<IPreference>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackMealById(index: number, item: IMeal) {
        return item.id;
    }

    trackChildById(index: number, item: IChild) {
        return item.id;
    }
}
