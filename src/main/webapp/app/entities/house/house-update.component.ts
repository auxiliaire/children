import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHouse } from 'app/shared/model/house.model';
import { HouseService } from './house.service';
import { IPerson } from 'app/shared/model/person.model';
import { PersonService } from 'app/entities/person';

@Component({
    selector: 'jhi-house-update',
    templateUrl: './house-update.component.html'
})
export class HouseUpdateComponent implements OnInit {
    house: IHouse;
    isSaving: boolean;

    people: IPerson[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected houseService: HouseService,
        protected personService: PersonService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ house }) => {
            this.house = house;
        });
        this.personService
            .query({ filter: 'house-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IPerson[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPerson[]>) => response.body)
            )
            .subscribe(
                (res: IPerson[]) => {
                    if (!this.house.person || !this.house.person.id) {
                        this.people = res;
                    } else {
                        this.personService
                            .find(this.house.person.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IPerson>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IPerson>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IPerson) => (this.people = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.house.id !== undefined) {
            this.subscribeToSaveResponse(this.houseService.update(this.house));
        } else {
            this.subscribeToSaveResponse(this.houseService.create(this.house));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHouse>>) {
        result.subscribe((res: HttpResponse<IHouse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
