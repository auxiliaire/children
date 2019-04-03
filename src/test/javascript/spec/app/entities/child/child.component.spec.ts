/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { ChildComponent } from 'app/entities/child/child.component';
import { ChildService } from 'app/entities/child/child.service';
import { Child } from 'app/shared/model/child.model';

describe('Component Tests', () => {
    describe('Child Management Component', () => {
        let comp: ChildComponent;
        let fixture: ComponentFixture<ChildComponent>;
        let service: ChildService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [ChildComponent],
                providers: []
            })
                .overrideTemplate(ChildComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChildComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChildService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Child(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.children[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
