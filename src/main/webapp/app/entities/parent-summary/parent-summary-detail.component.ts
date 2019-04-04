import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParentSummary } from 'app/shared/model/parent-summary.model';

@Component({
    selector: 'jhi-parent-summary-detail',
    templateUrl: './parent-summary-detail.component.html'
})
export class ParentSummaryDetailComponent implements OnInit {
    parentSummary: IParentSummary;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parentSummary }) => {
            this.parentSummary = parentSummary;
        });
    }

    previousState() {
        window.history.back();
    }
}
