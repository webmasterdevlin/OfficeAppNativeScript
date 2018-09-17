import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {MainComponent} from "~/main/main.component";
import {LoginComponent} from "~/login/login.component";
import {SignupComponent} from "~/signup/signup.component";
import {EditDepartmentComponent} from "~/edit/edit-department.component";
import {NewDepartmentComponent} from "~/new-department/new-department.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {path: "main", component: MainComponent},
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
