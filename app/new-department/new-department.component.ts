import { Component } from "@angular/core";
import { DepartmentService } from "~/services/department.service";
import { DepartmentModel } from "~/models/department.model";
import { RouterExtensions } from "nativescript-angular";

@Component({
  selector: "New",
  moduleId: module.id,
  templateUrl: "./new-department.component.html",
  styleUrls: ["./new-department.component.css"]
})
export class NewDepartmentComponent {
  newDepartment: DepartmentModel;

  constructor(
    private _departmentService: DepartmentService,
    private _routerExtensions: RouterExtensions
  ) {
    this.newDepartment = new DepartmentModel();
  }

  OnSave(): void {
    this._departmentService.postDepartment(this.newDepartment).subscribe();
    this._routerExtensions.navigate(["/main"], { clearHistory: true });
  }
}
