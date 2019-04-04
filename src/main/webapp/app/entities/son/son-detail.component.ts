import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISon } from 'app/shared/model/son.model';

@Component({
    selector: 'jhi-son-detail',
    templateUrl: './son-detail.component.html'
})
export class SonDetailComponent implements OnInit {
    son: ISon;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ son }) => {
            this.son = son;
        });
    }

    previousState() {
        window.history.back();
    }
}
