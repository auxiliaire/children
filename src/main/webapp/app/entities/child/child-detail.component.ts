import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChild } from 'app/shared/model/child.model';

@Component({
    selector: 'jhi-child-detail',
    templateUrl: './child-detail.component.html'
})
export class ChildDetailComponent implements OnInit {
    child: IChild;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ child }) => {
            this.child = child;
        });
    }

    previousState() {
        window.history.back();
    }
}
