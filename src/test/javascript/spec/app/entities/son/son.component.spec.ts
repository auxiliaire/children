/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChildrenTestModule } from '../../../test.module';
import { SonComponent } from 'app/entities/son/son.component';
import { SonService } from 'app/entities/son/son.service';
import { Son } from 'app/shared/model/son.model';

describe('Component Tests', () => {
    describe('Son Management Component', () => {
        let comp: SonComponent;
        let fixture: ComponentFixture<SonComponent>;
        let service: SonService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ChildrenTestModule],
                declarations: [SonComponent],
                providers: []
            })
                .overrideTemplate(SonComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SonService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Son(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.sons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
