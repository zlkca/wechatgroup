import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { WechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { WechatGroupComponent } from './wechatgroup/wechatgroup.component';
import { QRListComponent } from './qr-list/qr-list.component';
import { QRFormComponent } from './qr-form/qr-form.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
@NgModule({
   imports:[
      CommonModule,
      FormsModule,
      RouterModule,
      HttpClientModule
   ],
   exports:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupComponent,QRListComponent,QRFormComponent,SubscriptionListComponent,SubscriptionFormComponent],
   declarations:[CategoryListComponent,CategoryFormComponent,WechatGroupListComponent,WechatGroupComponent,QRListComponent,QRFormComponent,SubscriptionListComponent,SubscriptionFormComponent]
})
export class CommerceModule { }
