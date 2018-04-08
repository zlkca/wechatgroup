import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { UiModule } from '../ui/ui.module';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { WechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { WechatGroupDetailComponent } from './wechatgroup-detail/wechatgroup-detail.component';

import { UiService } from '../ui/ui.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './commerce.service';



@NgModule({
   imports:[
      CommonModule,
      FormsModule,
      RouterModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
      //UiModule
   ],
   providers: [UiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
   exports:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupDetailComponent],
   declarations:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupDetailComponent]
})
export class CommerceModule { }
