import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMeal } from 'app/shared/model/meal.model';

@Component({
    selector: 'jhi-meal-detail',
    templateUrl: './meal-detail.component.html'
})
export class MealDetailComponent implements OnInit {
    meal: IMeal;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meal }) => {
            this.meal = meal;
        });
    }

    previousState() {
        window.history.back();
    }
}
