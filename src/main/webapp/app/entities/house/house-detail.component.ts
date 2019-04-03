import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouse } from 'app/shared/model/house.model';

@Component({
    selector: 'jhi-house-detail',
    templateUrl: './house-detail.component.html'
})
export class HouseDetailComponent implements OnInit {
    house: IHouse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ house }) => {
            this.house = house;
        });
    }

    previousState() {
        window.history.back();
    }
}
