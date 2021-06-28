import {Component, OnInit} from '@angular/core';
import { EmployeeService } from '../employee.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  idFilter: string | undefined;
  selectedEmployee: any | undefined;
  employees: any | undefined;
  dataSource: any;
  displayedColumns: string[] = ['id', 'employee_name', 'employee_salary', 'employee_age', 'employee_anual_salary'];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        employees.data.forEach((e: any) => {
          e.employee_anual_salary = e.employee_salary * 12;
        });
        this.dataSource = new MatTableDataSource(employees.data);
        this.employees = employees.data;
      });
  }


  onSelect(employee: any): void {
    this.selectedEmployee = employee;
  }


  applyFilter(): void {
    console.log(this.idFilter);
    if (this.idFilter !== '' && this.idFilter !== undefined && this.idFilter !== null) {
      this.employeeService.getEmployeeByID(this.idFilter)
        .subscribe(employees => {
          if (employees.data !== null) {
            employees.data.employee_anual_salary = Number(employees.data.employee_salary) * 12;
            this.dataSource = new MatTableDataSource([employees.data]);
            this.employees = [employees.data];
          }else{
            this.dataSource = new MatTableDataSource([]);
            this.employees = [];
          }
        });
    }else {
      this.getEmployees();
    }
  }

}
