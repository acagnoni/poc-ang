import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ComponentTreeInfo, VarDescription } from './model/knowledgedata';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Functional Retrival Platform';

  treeItemsObj: SelectItem[];
  selectedCities: string[];

  public currentItemObj: ComponentTreeInfo;
  public detailObj: any;
  public varDescriptionObj: any;

  ngOnInit(): void {
    console.log('AppComponent:ngOnInit');
    this.detailObj = undefined;

    this.currentItemObj = new ComponentTreeInfo(
      true,
      'collapsed',
      'NPSTM1010',
      'NPSTM1010'
    );

    this.treeItemsObj = [{
      'label': this.currentItemObj.procName + ' ' + '(' + this.currentItemObj.unit + ')',
      'value': {
        'unit': this.currentItemObj.unit,
        'procName': this.currentItemObj.procName,
        'model': this.currentItemObj.model,
        'isTop': this.currentItemObj.isTop
      }
    }];

  }

  onToggleComponentToTree(data: ComponentTreeInfo) {
    console.log('AppComponent:onToggleComponentToTree ' + JSON.stringify(data));
    console.log(JSON.stringify(this.treeItemsObj));
    let isPresent: boolean;

    isPresent = false;

    this.treeItemsObj.forEach(element => {
      if(element.label === data.procName + ' ' + '(' + data.unit + ')') {
        console.log('AppComponent:onToggleComponentToTree already present');
        isPresent = true;
      }
    })

    if (isPresent === false ){

      this.treeItemsObj.push({
        'label': data.procName + ' ' + '(' + data.unit + ')',
        'value': {
          'unit': data.unit,
          'procName': data.procName,
          'model': data.model,
          'isTop': data.isTop
        }
      });

      this.treeItemsObj = JSON.parse(JSON.stringify(this.treeItemsObj));
    }

    console.log(JSON.stringify(this.treeItemsObj));
  }

  onToggleInitComponentToTree(data: ComponentTreeInfo) {
    console.log('AppComponent:onInitToggleComponentToTree ' + JSON.stringify(data));
    console.log(JSON.stringify(this.treeItemsObj));

    this.treeItemsObj.splice(0, this.treeItemsObj.length);
    this.treeItemsObj = [{
      'label': data.procName + ' ' + '(' + data.unit + ')',
      'value': {
        'unit': data.unit,
        'procName': data.procName,
        'model': data.model,
        'isTop': data.isTop
      }
    }];
    this.treeItemsObj = JSON.parse(JSON.stringify(this.treeItemsObj));

    console.log(JSON.stringify(this.treeItemsObj));
  }

  onToggleItemToCode(data: ComponentTreeInfo) {
    console.log('AppComponent:onToggleItemToCode' + JSON.stringify(data));
    this.currentItemObj = JSON.parse(JSON.stringify(data));
  }

  onToggleDetailToPane(data: any) {
    console.log('AppComponent:onToggleDetailToPane');
    this.detailObj = data;
  }

  onToggleDescriptionToPane(data: VarDescription[]) {
    console.log('AppComponent:onToggleDetailToPane');
    this.varDescriptionObj = data;
  }
}
