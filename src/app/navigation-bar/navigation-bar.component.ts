import { Component, OnInit, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BackendService } from '../services/backend.service';
import { Table, Module, ComponentTreeInfo, PropagateStructure } from '../model/knowledgedata';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() private toggleItemToCode: EventEmitter<ComponentTreeInfo>;
  @Output() private toggleComponentToTree: EventEmitter<ComponentTreeInfo>;

  displayInitialPropagation = false;
  displayInitialModules = false;

  tables: Table[];
  modules: Module[];
  savedTables: Table[];
  clonedCars: { [s: string]: Table; } = {};

  constructor(private http: HttpClient, private backendService: BackendService) { 
        this.toggleComponentToTree = new EventEmitter<ComponentTreeInfo>();
        this.toggleItemToCode = new EventEmitter<ComponentTreeInfo>();

      }

  ngOnInit() {
    this.backendService.get_mobules().then((data) => {
      console.log(data);
      this.modules = data;
    });

  }

  showModules() {
    this.displayInitialModules = true;
    this.backendService.get_mobules().then((data) => {
      console.log(data);
      this.modules = data;
    });
  }


  showTables() {
    this.displayInitialPropagation = true;
    this.backendService.get_variables('TABLE').then((data) => {
      console.log(data);
      this.tables = data;
      this.savedTables = data;
    });
  }

  onGotoModules(modules: Module, index: number) {
    console.log('Goto ' + modules[index]);
    this.displayInitialModules = false;
    let newCurrentItemObj: ComponentTreeInfo;

    newCurrentItemObj = new ComponentTreeInfo(
      true,
      'collapsed',
      modules.name,
      'INIZIO-PGM::'
    );

    this.toggleComponentToTree.emit(newCurrentItemObj);

    this.toggleItemToCode.emit(newCurrentItemObj);
  }

  onRowEditInit(table: Table, index: number) {
    console.log('Row edit initialized' + index.toString());
    this.clonedCars[table.key] = {...table};
  }

  onRowEditSave(table: Table, index: number) {
    console.log('Row edit saved' + index.toString());

    let propagateStructure: PropagateStructure;
    propagateStructure = new PropagateStructure();

    /*
    propagateStructure.key = table.key;
    propagateStructure.name = table.tableName;
    propagateStructure.variabile = table.columnName;
    propagateStructure.idCall = '-1';
    propagateStructure.type = 'TABLE';
    propagateStructure.id = -1;
    propagateStructure.programId = '@ALLTABLES';
    propagateStructure.shortDescription = table.shortDescription;
    propagateStructure.longDescription = table.longDescription;
    */
    this.backendService.propagate_variables(propagateStructure);
  }

  onRowEditCancel(table: Table, index: number) {
    console.log('Row edit cancelled' + index.toString());
    this.tables[index] = this.clonedCars[table.key];
    delete this.clonedCars[table.key];
  }


}
