import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  private url = 'http://task.soft-zone.net/api/Employees';

  getAllEmployees(): Observable<any> {
    return this.http.get(this.url+'/getAllEmployees')
  }
  postEmployee(data : any): Observable<any>{
    return this.http.post<any>(this.url+"/addEmployee", data)
  }
  deleteEmployee(id:number): Observable<any>{
    console.log(id , "from ser");

    return this.http.get<any>(`${this.url}/deleteEmpByID/${id}`)
  }

  putEmployee(data:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(this.url, data, { headers });

    return this.http.post<any>(this.url+'/editEmployee', data, { headers });
  }


}
