import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IChild } from 'app/shared/model/child.model';
import { ChildService } from './child.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-child-update',
    templateUrl: './child-update.component.html'
})
export class ChildUpdateComponent implements OnInit {
    child: IChild;
    isSaving: boolean;

    people: IPerson[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected childService: ChildService,
        protected personService: PersonService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ child }) => {
            this.child = child;
        });
        this.personService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPerson[]>) => response.body)
            )
            .subscribe((res: IPerson[]) => (this.people = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.child.id !== undefined) {
            this.subscribeToSaveResponse(this.childService.update(this.child));
        } else {
            this.subscribeToSaveResponse(this.childService.create(this.child));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IChild>>) {
        result.subscribe((res: HttpResponse<IChild>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPersonById(index: number, item: IPerson) {
        return item.id;
    }
}
