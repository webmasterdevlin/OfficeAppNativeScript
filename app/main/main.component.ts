import { Component, OnInit } from "@angular/core";

import { DepartmentService } from "~/services/department.service";


@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  department$;
  processing: boolean = false;

  constructor(
    private _departmentService: DepartmentService,
  ) {
    this.refresh();
  }
  ngOnInit() {
    this.department$.refresh();
  }

  refresh(): void {
    this.processing = true;
    this._departmentService
      .loadDepartments()
      .pipe(data => (this.department$ = data))
      .subscribe(() => (this.processing = false));
  }
}
