import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHouse } from 'app/shared/model/house.model';
import { HouseService } from './house.service';

@Component({
    selector: 'jhi-house-delete-dialog',
    templateUrl: './house-delete-dialog.component.html'
})
export class HouseDeleteDialogComponent {
    house: IHouse;

    constructor(protected houseService: HouseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.houseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'houseListModification',
                content: 'Deleted an house'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-house-delete-popup',
    template: ''
})
export class HouseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ house }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HouseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.house = house;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/house', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/house', { outlets: { popup: null } }]);
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
