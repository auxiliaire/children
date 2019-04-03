import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';

@Component({
    selector: 'jhi-meal-update',
    templateUrl: './meal-update.component.html'
})
export class MealUpdateComponent implements OnInit {
    meal: IMeal;
    isSaving: boolean;
    invented: string;

    constructor(protected mealService: MealService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ meal }) => {
            this.meal = meal;
            this.invented = this.meal.invented != null ? this.meal.invented.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.meal.invented = this.invented != null ? moment(this.invented, DATE_TIME_FORMAT) : null;
        if (this.meal.id !== undefined) {
            this.subscribeToSaveResponse(this.mealService.update(this.meal));
        } else {
            this.subscribeToSaveResponse(this.mealService.create(this.meal));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMeal>>) {
        result.subscribe((res: HttpResponse<IMeal>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
