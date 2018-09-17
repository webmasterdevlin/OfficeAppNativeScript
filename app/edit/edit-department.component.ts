import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular";
import { DepartmentService } from "~/services/department.service";
import { IDepartmentModel } from "~/models/department.model";
import * as dialogs from "ui/dialogs";

@Component({
  selector: "Edit",
  moduleId: module.id,
  templateUrl: "./edit-department.component.html",
  styleUrls: ["./edit-department.component.css"]
})
export class EditDepartmentComponent implements OnInit {
  currentDepartment: IDepartmentModel;
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
      .subscribe((data: IDepartmentModel) => {
        this.currentDepartment = data;
      });
  }

  onUpdate() {
    this._departmentService.putDepartment(this.currentDepartment).subscribe();

    let ex: NavigationExtras = {
      queryParams: {
        id: this.deptId
      }
    };
    this._routerExtensions.navigate(["/main"], ex);
  }

  onDelete() {
    let result: boolean = false;
    dialogs.confirm("Sure you want to delete this?").then(respond => {
      result = respond;

      if (result === true) {
        this._departmentService
          .deleteDepartment(this.currentDepartment.id)
          .subscribe();

        let ex: NavigationExtras = {
          queryParams: {
            id: this.deptId
          }
        };
        this._routerExtensions.navigate(["/main"], ex);
      }
    });
  }
}