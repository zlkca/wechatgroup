import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { UiModule } from '../ui/ui.module';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { WechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { WechatGroupDetailComponent } from './wechatgroup-detail/wechatgroup-detail.component';

import { QRListComponent } from './qr-list/qr-list.component';
import { QRFormComponent } from './qr-form/qr-form.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';

import { UiService } from '../ui/ui.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}
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
   providers: [UiService],
   exports:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupDetailComponent,QRListComponent,QRFormComponent,SubscriptionListComponent,SubscriptionFormComponent],
   declarations:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupDetailComponent,QRListComponent,QRFormComponent,SubscriptionListComponent,SubscriptionFormComponent]
})
export class CommerceModule { }
