import { Component, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import * as dialogs from "ui/dialogs";
import {DepartmentModel} from "~/models/department.model";
import {DepartmentService} from "~/services/department.service";
import * as applicationSettings from "tns-core-modules/application-settings";

@Component({
  selector: "Edit",
  moduleId: module.id,
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.css"]
})
export class EditDepartmentComponent implements OnInit {
  currentDepartment: DepartmentModel;
  deptId: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _routerExtensions: RouterExtensions,
    private _departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.deptId = this._activatedRoute.snapshot.params["id"];
    this.getDepartment(this.deptId);
  }

  getDepartment(id: string) {
    this._departmentService
      .getDepartment(id)
      .subscribe((data: DepartmentModel) => {
        this.currentDepartment = data;
      });
  }

  onUpdate() {
    this._departmentService.putDepartment(this.currentDepartment).subscribe();
    this._routerExtensions.navigate(["/main"], { clearHistory: true });
  }

  onDelete() {
    let userRespond: boolean = false;
    dialogs.confirm("Sure you want to delete this?").then(respond => {
      userRespond = respond;
      if (userRespond === true) {
        this._departmentService
          .deleteDepartment(this.currentDepartment.id)
          .subscribe();
        this._routerExtensions.navigate(["/main"], { clearHistory: true });
      }
    });
  }

    logout() {
        applicationSettings.remove("jwt");
        applicationSettings.clear();
        this._routerExtensions.navigate(["/login"], { clearHistory: true });
    }
}
