import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { WechatGroupFormComponent } from './wechatgroup-form/wechatgroup-form.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
@NgModule({
   imports:[
      CommonModule,
      FormsModule,
      RouterModule,
      HttpClientModule
   ],
   exports:[WechatGroupListComponent,WechatGroupFormComponent,SubscriptionListComponent,SubscriptionFormComponent],
   declarations:[WechatGroupListComponent,WechatGroupFormComponent,SubscriptionListComponent,SubscriptionFormComponent]
})
export class CommerceModule { }
