import { NgModule } from '@angular/core';

import { ChildrenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [ChildrenSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [ChildrenSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ChildrenSharedCommonModule {}
