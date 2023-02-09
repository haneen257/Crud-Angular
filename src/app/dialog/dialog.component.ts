import { Component, Inject } from '@angular/core';
import { FormGroup ,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  employeeForm !: FormGroup
  actionBtn : string = 'Add'

  constructor(
    private formBuilder : FormBuilder ,
    private api : ApiService ,
    @Inject(MAT_DIALOG_DATA) public editData : any ,
    private dialogRef : MatDialogRef<DialogComponent>){

  }

  ngOnInit(): void{
    this.employeeForm = new FormGroup({
      empName:new FormControl(null ,[ Validators.required]),
      empEmail:new FormControl(null ,[Validators.email , Validators.required]),
      empAddress:new FormControl(null ,[ Validators.required]),
      empPhone:new FormControl(null ,[ Validators.required]),

      })
    if(this.editData){
      this.actionBtn = "Update"
      this.employeeForm.controls['empName'].setValue(this.editData.empName)
      this.employeeForm.controls['empEmail'].setValue(this.editData.empEmail)
      this.employeeForm.controls['empAddress'].setValue(this.editData.empAddress)
      this.employeeForm.controls['empPhone'].setValue(this.editData.empPhone)

    }
  }
  get employeeFormd() { return this.employeeForm.controls; }
  addEmployee(): void{
   if(!this.editData){
    if(this.employeeForm.valid){
      this.api.postEmployee(this.employeeForm.value)
      .subscribe({
        next:(_res)=>{
          // alert("Employee Add Successfully")
          this.employeeForm.reset()
          this.dialogRef.close('Add')
        },
        error:()=>{
          // alert("Erorr While Adding Employee")
        }

      })
    }
   }else{
    this.updateEmployee()
   }

  }
  updateEmployee(): void{
    this.api.putEmployee(this.employeeForm.value)
    .subscribe({
      next:(res): void=>{
        // alert("Employee Updated")
        this.employeeForm.reset()
        this.dialogRef.close('update')
      },
      error:()=>{
        // alert("Erorr While Updating Employee")
      }
    })
  }


}
