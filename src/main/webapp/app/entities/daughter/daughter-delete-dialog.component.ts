import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDaughter } from 'app/shared/model/daughter.model';
import { DaughterService } from './daughter.service';

@Component({
    selector: 'jhi-daughter-delete-dialog',
    templateUrl: './daughter-delete-dialog.component.html'
})
export class DaughterDeleteDialogComponent {
    daughter: IDaughter;

    constructor(protected daughterService: DaughterService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.daughterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'daughterListModification',
                content: 'Deleted an daughter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-daughter-delete-popup',
    template: ''
})
export class DaughterDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ daughter }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DaughterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.daughter = daughter;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/daughter', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/daughter', { outlets: { popup: null } }]);
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
