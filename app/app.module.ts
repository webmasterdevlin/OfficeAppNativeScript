import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MainComponent } from "./main/main.component";
import { LoginComponent } from "~/login/login.component";
import { SignupComponent } from "~/signup/signup.component";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import {
  NativeScriptFormsModule,
  NativeScriptRouterModule
} from "nativescript-angular";
import { AuthService } from "~/services/auth.service";
import { DepartmentService } from "~/services/department.service";
import { EditDepartmentComponent } from "~/edit-department/edit-department.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { HttpInterceptorModule } from "~/auth/http-interceptor.module";
import { NewDepartmentComponent } from "~/new-department/new-department.component";

import {registerElement} from "nativescript-angular/element-registry";
import {AuthGuard} from "~/auth/auth.guard";

registerElement('PullToRefresh', () => require ('nativescript-pulltorefresh').PullToRefresh);

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    FormsModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    HttpClientModule,
    NativeScriptRouterModule,
    RouterModule,
    HttpInterceptorModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    NewDepartmentComponent,
    EditDepartmentComponent
  ],
  providers: [ AuthService, DepartmentService, AuthGuard],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
