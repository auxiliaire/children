import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChild } from 'app/shared/model/child.model';
import { ChildService } from './child.service';

@Component({
    selector: 'jhi-child-delete-dialog',
    templateUrl: './child-delete-dialog.component.html'
})
export class ChildDeleteDialogComponent {
    child: IChild;

    constructor(protected childService: ChildService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.childService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'childListModification',
                content: 'Deleted an child'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-child-delete-popup',
    template: ''
})
export class ChildDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ child }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChildDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.child = child;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/child', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/child', { outlets: { popup: null } }]);
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
