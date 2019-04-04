import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISon } from 'app/shared/model/son.model';
import { SonService } from './son.service';

@Component({
    selector: 'jhi-son-update',
    templateUrl: './son-update.component.html'
})
export class SonUpdateComponent implements OnInit {
    son: ISon;
    isSaving: boolean;

    constructor(protected sonService: SonService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ son }) => {
            this.son = son;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.son.id !== undefined) {
            this.subscribeToSaveResponse(this.sonService.update(this.son));
        } else {
            this.subscribeToSaveResponse(this.sonService.create(this.son));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISon>>) {
        result.subscribe((res: HttpResponse<ISon>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
