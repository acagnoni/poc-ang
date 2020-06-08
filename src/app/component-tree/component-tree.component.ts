import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ComponentTreeInfo } from '../model/knowledgedata';
import { SelectItem } from 'primeng/api';


interface singleComponent {
  unit: string,
  procName: string
}

@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTreeComponent {

  selectedTreeItems: ComponentTreeInfo;

  @Input() public treeItems: ComponentTreeInfo[];
  @Input() public syncTime: Date;
  @Output() private toggleItemToCode: EventEmitter<ComponentTreeInfo>;

  showDialog() {

  }

  constructor() {
    this.toggleItemToCode = new EventEmitter<ComponentTreeInfo>();
  }

  clearItemList() {
    console.log('ComponentTreeComponent:clearItemList');
  }

  addItemInList(data: ComponentTreeInfo) {
    console.log('ComponentTreeComponent:addItemInList ' + data);

  }

  updateCodeTree(event) {
    console.log('ComponentTreeComponent:updateCodeTree ' + JSON.stringify(event));
    let newCurrentItemObj: ComponentTreeInfo;

    newCurrentItemObj = new ComponentTreeInfo(
      event.value.isTop,
      event.value.model,
      event.value.unit,
      event.value.procName
    );

    this.toggleItemToCode.emit(newCurrentItemObj);
  }

  updateDetail(event) {
    console.log('ComponentTreeComponent:updateDetail ' + JSON.stringify(event));
  }
  deleteFromCodeTree(i) {
    console.log('ComponentTreeComponent:deleteFromCodeTree');

  }
}

