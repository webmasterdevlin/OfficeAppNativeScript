import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs/";
import { DepartmentService } from "~/services/department.service";
import * as applicationSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular";
import { catchError } from "rxjs/operators";
import { DepartmentModel } from "~/models/department.model";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit, OnDestroy {
  departments;
  sub: Subscription;
  processing: boolean = false;

  constructor(
    private _departmentService: DepartmentService,
    private _routerExtensions: RouterExtensions
  ) {
    this.refresh();
  }
  ngOnInit() {
    this.departments.refresh();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  refresh(): void {
    this.processing = true;
    this.sub = this._departmentService
      .loadDepartments()
      .pipe(data => (this.departments = data))
      .subscribe(() => (this.processing = false));
  }

  logout() {
    applicationSettings.remove("jwt");
    applicationSettings.clear();
    this._routerExtensions.navigate(["/login"], { clearHistory: true });
  }

  onEditDepartment(id: string) {
    this._routerExtensions.navigate(["/edit", id]);
  }

  // TODO: longPress disappear after tap
  async onDeleteDepartment(department: DepartmentModel) {
    const confirm: boolean = await dialogs.confirm(`Delete ${department.name}`);
    if (confirm) this._removeFromDatabase(department.id); // TODO: confirm not working
  }

  private _removeFromDatabase(id: string) {
    const index = this.departments.findIndex(d => d.id === id);
    const departmentToRemove = this.departments.find(d => d.id === id);
    this.departments.splice(index, 1);

    this._departmentService
      .deleteDepartment(id)
      .pipe(
        // Rolling back
        catchError(() => this.departments.splice(index, 0, departmentToRemove))
      )
      .subscribe();
  }
}
