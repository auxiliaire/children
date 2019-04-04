import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IParentSummary } from 'app/shared/model/parent-summary.model';
import { ParentSummaryService } from './parent-summary.service';

@Component({
    selector: 'jhi-parent-summary-update',
    templateUrl: './parent-summary-update.component.html'
})
export class ParentSummaryUpdateComponent implements OnInit {
    parentSummary: IParentSummary;
    isSaving: boolean;

    constructor(protected parentSummaryService: ParentSummaryService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ parentSummary }) => {
            this.parentSummary = parentSummary;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parentSummary.id !== undefined) {
            this.subscribeToSaveResponse(this.parentSummaryService.update(this.parentSummary));
        } else {
            this.subscribeToSaveResponse(this.parentSummaryService.create(this.parentSummary));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParentSummary>>) {
        result.subscribe((res: HttpResponse<IParentSummary>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
