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
  public varDescription: TreeNode[];

  constructor(
    private http: HttpClient,
    private backendService: BackendService)
    { }

  ngOnInit() {
    console.log("OnInit varDescription id: ", this.varDescriptionId);
    this.backendService.get_descriptions(this.varDescriptionId).then((data) => {
      this.varDescription = <TreeNode[]>[data];
      console.log(data);
    });

  }

  onRowEditInit(varDescription: VarDescription, index: number) {
    console.log('Row edit initialized' + index.toString());
  }

  onRowEditSave(varDescription: VarDescription, index: number) {
    console.log('Row edit saved' + index.toString());

    console.log(varDescription);

    let propagateStructure: PropagateStructure;
    propagateStructure = new PropagateStructure();

    propagateStructure.attr_id = varDescription.attr_id;
    propagateStructure.orig_id = varDescription.orig_id;
    propagateStructure.name = varDescription.name;
    propagateStructure.variabileName = varDescription.variabileName;
    propagateStructure.start = varDescription.start;
    propagateStructure.length = varDescription.length;
    propagateStructure.shortDescription = varDescription.shortDescription;
    propagateStructure.longDescription = varDescription.longDescription;

    this.backendService.propagate_variables(propagateStructure);
  }

  onRowEditCancel(varDescription: VarDescription, index: number) {
    console.log('Row edit cancelled' + index.toString());
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



