import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VarDescription, PropagateStructure } from '../model/knowledgedata';
import { BackendService } from '../services/backend.service';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';



@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.css']
})
export class DetailsItemComponent implements OnInit {

  @Input() public detail: any;
  @Input() public varDescriptionId: any;
  public varDescription: VarDescription[];
  public mappings: any;


  public display: boolean = false;

  constructor(
    private http: HttpClient,
    private backendService: BackendService)
    { }

  ngOnInit() {
    console.log("OnInit varDescription id: ", this.varDescriptionId);
    this.backendService.get_descriptions(this.varDescriptionId).then((data) => {
      this.varDescription = <VarDescription[]> data;
      console.log(data);
    });

  }


  onPropagate(varDescription: VarDescription) {
    console.log('Row edit saved' + varDescription);

    console.log(varDescription);

    let propagateStructure: PropagateStructure;
    propagateStructure = new PropagateStructure();

    propagateStructure.descriptionId = varDescription.descriptionId;
    propagateStructure.shortDescription = varDescription.d_shortdescription;
    propagateStructure.longDescription = varDescription.d_longdescription;

    this.backendService.propagate_variables(propagateStructure);
  }

  onDetail(varDescription: VarDescription) {
    if(varDescription.mappings != null) {
      this.display = true;
      this.mappings = varDescription.mappings;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges: varDescription id: ", this.varDescriptionId);

    this.backendService.get_descriptions(this.varDescriptionId).then((data) => {

      console.log(data);
      this.varDescription = data;
      console.log(this.varDescription);
    });


  }

}



