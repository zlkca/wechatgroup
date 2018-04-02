import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

import { AdminLoginComponent } from './login/login.component';
import { AdminCategoryListComponent } from './category-list/category-list.component';
import { AdminCategoryFormComponent } from './category-form/category-form.component';
import { AdminWechatGroupListComponent } from './wechatgroup-list/wechatgroup-list.component';
import { AdminWechatGroupFormComponent } from './wechatgroup-form/wechatgroup-form.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';


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
  ],
  declarations: [AdminLoginComponent, AdminCategoryListComponent, AdminCategoryFormComponent, AdminWechatGroupListComponent, AdminWechatGroupFormComponent, AdminDashboardComponent]
})
export class AdminModule { }
