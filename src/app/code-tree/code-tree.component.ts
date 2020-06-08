import { Component, ViewEncapsulation, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import {TreeNode, MenuItem} from 'primeng/api';

import { ComponentTreeInfo, VarDescription } from '../model/knowledgedata';
import { EventEmitter } from '@angular/core';
import { BackendService} from '../services/backend.service';


@Component({
  selector: 'app-code-tree',
  templateUrl: './code-tree.component.html',
  styleUrls: ['./code-tree.component.css']
})

export class CodeTreeComponent implements OnInit, OnChanges {

  codelines: TreeNode[];
  selectedLine: TreeNode;

  selectedModel: string;

  model: String = 'collapsed';

  items: MenuItem[];

  @Input() public currentItem: ComponentTreeInfo;
  @Output() private toggleComponentToTree: EventEmitter<ComponentTreeInfo>;
  @Output() private toggleInitComponentToTree: EventEmitter<ComponentTreeInfo>;
  @Output() private toggleDetailToPane: EventEmitter<any>;
  @Output() private toggleDescriptionToPane: EventEmitter<VarDescription>;

  constructor(private backendService: BackendService) {
    this.toggleComponentToTree = new EventEmitter<ComponentTreeInfo>();
    this.toggleInitComponentToTree = new EventEmitter<ComponentTreeInfo>();
    this.toggleDetailToPane = new EventEmitter<any>();
    this.toggleDescriptionToPane = new EventEmitter<VarDescription>();

    this.items = [
      {label: 'View', icon: 'pi pi-search', command: (event) => console.log('search') },
      {label: 'Unselect', icon: 'pi pi-close', command: (event) => console.log('unselect')}
    ];

  }

  setModel(e: string): void {
    console.log('CodeTreeComponent:setModel');
    this.model = e;
    this.currentItem = new ComponentTreeInfo (
      true,
      e,
      'NPSTM1010:PRC_NP723:NPP66B',
      'MAIN'
    );
    this.reload();
    this.toggleInitComponentToTree.emit(this.currentItem);
  }

  addItemsToDetail(detail) {
    console.log('CodeTreeComponent:addItemsToDetail');
    this.toggleDetailToPane.emit(detail);
  }

  addItemsToDescription(data) {
    console.log('CodeTreeComponent:addItemsToDetail');
    this.toggleDescriptionToPane.emit(data);
  }

  addComponentToTree(isTop, model, unit, procName) {
    console.log('CodeTreeComponent:addComponentToTree');
    this.currentItem = new ComponentTreeInfo(
      isTop,
      model,
      unit,
      procName
    );
    this.toggleComponentToTree.emit(this.currentItem);
  }


  ngOnInit(): void {
    console.log('CodeTreeComponent:ngOnInit');
    this.backendService.get_attributes_expanded(this.currentItem.unit, this.currentItem.procName).then((data) => {
      this.codelines = data;
    });
    this.selectedModel = 'collapsed';
  }

  reload() {
    console.log('CodeTreeComponent:reload');
    this.backendService.get_attributes_expanded(this.currentItem.unit, this.currentItem.procName).then((data) => {
      this.codelines = data;
    });
  }

  nodeSelect(event) {
    console.log('CodeTreeComponent:nodeSelect');
    console.log(event);
    if(event.originalEvent.detail === 2) {
      if (event.node.unit !== undefined) {
        this.currentItem.unit = event.node.unit;
        this.currentItem.procName = event.node.procname;
        this.reload();

        console.log('CodeTreeComponent:nodeSelect adding '+ event.node.unit, event.node.procname);
        this.addComponentToTree(
          false,
          this.model,
          event.node.unit,
          event.node.procname);
      }
    }

    console.log(event.node)
    this.addItemsToDetail(event.node.detail);
    this.addItemsToDescription(event.node.description);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CodeTreeComponentApp:ngOnChanges ', changes);
    if (changes.currentItem.firstChange === false) {
      this.reload();
    }
  }


}