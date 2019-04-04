import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDaughter } from 'app/shared/model/daughter.model';
import { DaughterService } from './daughter.service';

@Component({
    selector: 'jhi-daughter-update',
    templateUrl: './daughter-update.component.html'
})
export class DaughterUpdateComponent implements OnInit {
    daughter: IDaughter;
    isSaving: boolean;

    constructor(protected daughterService: DaughterService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ daughter }) => {
            this.daughter = daughter;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.daughter.id !== undefined) {
            this.subscribeToSaveResponse(this.daughterService.update(this.daughter));
        } else {
            this.subscribeToSaveResponse(this.daughterService.create(this.daughter));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDaughter>>) {
        result.subscribe((res: HttpResponse<IDaughter>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
