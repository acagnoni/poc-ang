import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TreeNode } from 'primeng/api/treenode';
import { Attributes_request, Variables_request, Table, Module } from '../model/knowledgedata';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private get_attributes_expandedURL: string;
  private get_variablesURL: string;
  private get_propagateURL: string;
  private get_modulesURL: string;
  private controllerURL: string;


  constructor(private http: HttpClient) {
    this.get_attributes_expandedURL = 'http://localhost:8080/get_attributes_expanded';
    this.get_variablesURL = 'http://localhost:8080/get_variables';
    this.get_propagateURL = 'http://localhost:8080/propagate_variables';
    this.get_modulesURL = 'http://localhost:8080/get_modules';
    this.controllerURL = 'http://localhost:8080/controller';

  }

  public get_attributes_expanded(unit: string, proc: string) {

    console.log('Calling get_attributes_expanded using ' + unit + ' - ' + proc);
    let a: Attributes_request;

    a = new Attributes_request();
    a.UnitName = unit;
    a.ProcName = proc;

    return this.http.post(this.get_attributes_expandedURL, a).toPromise().then(res => res['data'] as TreeNode[]);

  }

  public get_variables(type: string) {

    console.log('Calling get_variables using ' + type);
    let a: Variables_request;

    a = new Variables_request();
    a.type = type;

    return this.http.post(this.get_variablesURL, a).toPromise().then(res => res as Table[]);

  }

  public get_mobules() {

    console.log('Calling get_variables get_mobules.');

    return this.http.post(this.get_modulesURL, {}).toPromise().then(res => res as Module[]);
  }
  

  public propagate_variables(a: Table) {

    console.log('Calling propagate_variables using ' + a.key);

    return this.http.post(this.get_propagateURL, a).toPromise().then(res => res as any);

  }
}


