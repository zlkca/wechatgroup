import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
// import { HeaderComponent } from './header/header.component';
// import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from './main/home/home.component';
// import { ContactComponent } from './main/contact/contact.component';
// import { LoginComponent } from './users/login/login.component';
// import { SignupComponent } from './users/signup/signup.component';
// import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';

// import { ShoppingCartComponent } from './products/shopping-cart/shopping-cart.component';
// import { ProfileComponent } from './users/profile/profile.component';
// import { ProfileEditComponent } from './users/profile-edit/profile-edit.component';
// import { ChangePasswordComponent } from './users/change-password/change-password.component';
// import { PaymentComponent } from './products/payment/payment.component';
//import { BusinessDetailComponent } from './business/business-detail/business-detail.component';

import { AdminLoginComponent } from './admin/login/login.component';
import { AdminWechatGroupListComponent } from './admin/wechatgroup-list/wechatgroup-list.component';
import { AdminWechatGroupFormComponent } from './admin/wechatgroup-form/wechatgroup-form.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { CoreModule }    from './core/core.module';

// import { MainModule } from './main/main.module';
// import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

//import { MsgService } from './main/shared/main.service';

const appRoutes: Routes = [
  // { path: 'login', component:LoginComponent },
  // { path: 'signup', component:SignupComponent },
  // { path: 'contact-us', component:ContactComponent },
  // //{ path: 'product-list', component:ProductListComponent },
  // { path: 'product/:id', component:ProductDetailComponent },
  // { path: 'business/:id', component:BusinessDetailComponent },
  // { path: 'shopping-cart', component:ShoppingCartComponent },
  // { path: 'forget-password', component:ForgetPasswordComponent },
  // { path: 'profiles', component:ProfileComponent },
  // { path: 'profile-edit', component:ProfileEditComponent },
  // { path: 'change-password', component:ChangePasswordComponent },
  // { path: 'payment', component:PaymentComponent },

  { path: 'admin/login', component:AdminLoginComponent },
  { path: 'admin/wechatgroup-list', component:AdminWechatGroupListComponent },
  { path: 'admin/wechatgroup-form', component:AdminWechatGroupFormComponent }
  // { path: '', component:HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // FooterComponent,
  ],
  imports: [
    BrowserModule,
    // CoreModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    //Module,
    // ProductsModule,
    AdminModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  //providers: [MsgService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
