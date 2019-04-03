import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMeal } from 'app/shared/model/meal.model';
import { MealService } from './meal.service';

@Component({
    selector: 'jhi-meal-delete-dialog',
    templateUrl: './meal-delete-dialog.component.html'
})
export class MealDeleteDialogComponent {
    meal: IMeal;

    constructor(protected mealService: MealService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mealService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'mealListModification',
                content: 'Deleted an meal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meal-delete-popup',
    template: ''
})
export class MealDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ meal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MealDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.meal = meal;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/meal', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/meal', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
