import { Component, OnInit } from "@angular/core";
import { IDepartmentModel } from "~/models/department.model";
import { DepartmentService } from "~/services/department.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  departments: IDepartmentModel[] = [];
  processing: boolean = false;
  constructor(
    private _departmentService: DepartmentService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.loadDepartments();
  }
  ngOnInit() {
    let id: string;
    this._activatedRoute.queryParams.subscribe(p => (id = p["id"]));
    let index = this.departments.findIndex(x => x.id == id); // FIXME: departments should be not empty before findIndex
    this.departments.splice(index, 1);
  }

  loadDepartments(): void {
    this.processing = true;
    this._departmentService.loadDepartments().subscribe(data => {
      this.departments = data;
      this.processing = false;
    });
  }
  reload() {
    this.loadDepartments();
  }
}
