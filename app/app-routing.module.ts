import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {MainComponent} from "~/main/main.component";
import {LoginComponent} from "~/login/login.component";
import {SignupComponent} from "~/signup/signup.component";
import {EditDepartmentComponent} from "~/edit-department/edit-department.component";
import {NewDepartmentComponent} from "~/new-department/new-department.component";
import {AuthGuard} from "~/auth/auth.guard";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    {path: "main", component: MainComponent, canActivate: [AuthGuard]},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    {path: "new", component: NewDepartmentComponent},
    {path: "edit/:id", component: EditDepartmentComponent},
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})

export class AppRoutingModule { }
