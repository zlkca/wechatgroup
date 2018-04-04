import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

import { AdminLoginComponent } from './login/login.component';
import { AdminCategoryListComponent } from './category-list/category-list.component';
import { AdminCategoryFormComponent } from './category-form/category-form.component';
import { AdminWechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { AdminWechatGroupFormComponent } from './wechatgroup-form/wechatgroup-form.component';
import { AdminWechatFormComponent } from './wechat-form/wechat-form.component';

import { AdminDashboardComponent } from './dashboard/dashboard.component';

const adminRoutes:Routes = [
  {
    path:'admin',
    component:AdminDashboardComponent,
    children:[
      //{ path: 'login', component:AdminLoginComponent },
      { path: 'categories', component:AdminCategoryListComponent },
      { path: 'category/:id', component:AdminCategoryFormComponent },
      { path: 'category', component:AdminCategoryFormComponent },
      { path: 'wechatgroups', component:AdminWechatGroupListComponent},
      { path: 'wechatgroup/:id', component:AdminWechatGroupFormComponent },
      { path: 'wechatgroup', component:AdminWechatGroupFormComponent},
      { path: 'wechat', component:AdminWechatFormComponent}
    ]
  }
]
@NgModule({
  imports: [
        FormsModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        RouterModule.forChild(adminRoutes)
  ],
  exports:[RouterModule],
  declarations: [AdminLoginComponent, AdminCategoryListComponent, AdminCategoryFormComponent, 
  AdminWechatGroupListComponent, AdminWechatGroupFormComponent, AdminWechatFormComponent, AdminDashboardComponent]
})
export class AdminModule { }
