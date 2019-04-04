import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDaughter } from 'app/shared/model/daughter.model';

@Component({
    selector: 'jhi-daughter-detail',
    templateUrl: './daughter-detail.component.html'
})
export class DaughterDetailComponent implements OnInit {
    daughter: IDaughter;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ daughter }) => {
            this.daughter = daughter;
        });
    }

    previousState() {
        window.history.back();
    }
}
