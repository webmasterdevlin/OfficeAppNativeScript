import { Component, OnInit } from "@angular/core";
import { IDepartment } from "~/models/department";
import { DepartmentService } from "~/services/department.service";
import { Observable } from "rxjs";
import * as applicationSettings from "tns-core-modules/application-settings";
import {User} from "~/models/user.model";

@Component({
  selector: "Main",
  moduleId: module.id,
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  departments: IDepartment[] = [];

  constructor(private departmentService: DepartmentService) {}
  ngOnInit() {
    this.departmentService
      .loadDepartments()
      .subscribe(data => (this.departments = data));
  }
}
