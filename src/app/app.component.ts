import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud';
  Data:any[] = []
  displayedColumns: string[] = ['empName', 'empEmail', 'empAddress', 'empPhone' , 'action'];
  dataSource !: MatTableDataSource<any[]>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog , private api : ApiService) {
  }
  ngOnInit():void{
    this.getAllEmployee()

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
       width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'Add'){
        this.getAllEmployee()
      }
    })
  }
  getAllEmployee(){
    this.api.getAllEmployees().subscribe({
      next:(res)=>{
        // this.allPosts = res
        // console.log(this.allPosts);
        this.dataSource = new MatTableDataSource(res)
      },
    })
  }
  editEmployee(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllEmployee()
      }
    })
  }
  deleteEmployee(id:number){
    console.log(id , "iddddddddddddddddddddddd");
    this.api.deleteEmployee(id)
    .subscribe({
      next:(res)=>{
        this.getAllEmployee()
      },
      error:(res)=>{
        console.log(res);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}




