import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { IHouse } from 'app/shared/model/house.model';
import { HouseService } from 'app/entities/house';

@Component({
    selector: 'jhi-person-update',
    templateUrl: './person-update.component.html'
})
export class PersonUpdateComponent implements OnInit {
    person: IPerson;
    isSaving: boolean;

    houses: IHouse[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected personService: PersonService,
        protected houseService: HouseService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ person }) => {
            this.person = person;
        });
        this.houseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IHouse[]>) => mayBeOk.ok),
                map((response: HttpResponse<IHouse[]>) => response.body)
            )
            .subscribe((res: IHouse[]) => (this.houses = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.person.id !== undefined) {
            this.subscribeToSaveResponse(this.personService.update(this.person));
        } else {
            this.subscribeToSaveResponse(this.personService.create(this.person));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>) {
        result.subscribe((res: HttpResponse<IPerson>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackHouseById(index: number, item: IHouse) {
        return item.id;
    }
}
