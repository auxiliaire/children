import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParentSummary } from 'app/shared/model/parent-summary.model';
import { ParentSummaryService } from './parent-summary.service';

@Component({
    selector: 'jhi-parent-summary-delete-dialog',
    templateUrl: './parent-summary-delete-dialog.component.html'
})
export class ParentSummaryDeleteDialogComponent {
    parentSummary: IParentSummary;

    constructor(
        protected parentSummaryService: ParentSummaryService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parentSummaryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parentSummaryListModification',
                content: 'Deleted an parentSummary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parent-summary-delete-popup',
    template: ''
})
export class ParentSummaryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parentSummary }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParentSummaryDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.parentSummary = parentSummary;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/parent-summary', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/parent-summary', { outlets: { popup: null } }]);
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
