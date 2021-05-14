import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VarDescription, PropagateStructure } from '../model/knowledgedata';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  @Input() public detail: any;
  @Input() public varDescription: VarDescription[];
  savedVarDescription: VarDescription[];
  clonedCars: { [s: string]: VarDescription; } = {};

  constructor(
    private http: HttpClient,
    private backendService: BackendService) 
    { }

  ngOnInit() {

  }

  onRowEditInit(varDescription: VarDescription, index: number) {
    console.log('Row edit initialized' + index.toString());
    this.clonedCars[varDescription.key] = {...varDescription};
  }

  onRowEditSave(varDescription: VarDescription, index: number) {
    console.log('Row edit saved' + index.toString());

    let propagateStructure: PropagateStructure;
    propagateStructure = new PropagateStructure();

    propagateStructure.key = varDescription.key;
    propagateStructure.name = varDescription.name;
    propagateStructure.variabile = varDescription.variableName;
    propagateStructure.idCall = varDescription.idCall;
    propagateStructure.type = varDescription.type;
    propagateStructure.id = varDescription.id;
    propagateStructure.programId = varDescription.programId;
    propagateStructure.shortDescription = varDescription.shortDescription;
    propagateStructure.longDescription = varDescription.longDescription;

    this.backendService.propagate_variables(propagateStructure);
  }

  onRowEditCancel(varDescription: VarDescription, index: number) {
    console.log('Row edit cancelled' + index.toString());
    this.varDescription[index] = this.clonedCars[varDescription.key];
    delete this.clonedCars[varDescription.key];
  }

}



