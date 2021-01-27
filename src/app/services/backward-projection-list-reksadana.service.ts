import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../models/Constants'
import { Observable } from 'rxjs';

const httpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, PUT',
    'Access-Control-Allow-Origin': '*',
  })
}
@Injectable({
  providedIn: 'root'
})

export class BackwardProjectionListReksadanaService {
  cons:Constants;
  constructor(private http:HttpClient) { }

  ngOnInit() {

  }

  getListJenis():Observable<any> {
    this.cons = new Constants();
    return this.http.get(this.cons.BACKWARD_PROJECTION_URL+"/reksadana",httpOptions);
  }
}
