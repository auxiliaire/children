import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISon } from 'app/shared/model/son.model';
import { SonService } from './son.service';

@Component({
    selector: 'jhi-son-delete-dialog',
    templateUrl: './son-delete-dialog.component.html'
})
export class SonDeleteDialogComponent {
    son: ISon;

    constructor(protected sonService: SonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sonService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sonListModification',
                content: 'Deleted an son'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-son-delete-popup',
    template: ''
})
export class SonDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ son }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SonDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.son = son;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/son', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/son', { outlets: { popup: null } }]);
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
