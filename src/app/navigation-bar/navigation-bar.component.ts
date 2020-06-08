import { Component, OnInit, Output, Input } from '@angular/core';
import { NgNeo4jD3Options, NgNeo4jd3Service } from 'ng-neo4jd3';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { BackendService } from '../services/backend.service';
import { Table, Module, ComponentTreeInfo } from '../model/knowledgedata';
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

  constructor(public ngNeo4jD3Service: NgNeo4jd3Service,
      private http: HttpClient,
      private backendService: BackendService) { 
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
    this.backendService.get_variables("TABLE").then((data) => {
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
    this.backendService.propagate_variables(table);
  }

  onRowEditCancel(table: Table, index: number) {
    console.log('Row edit cancelled' + index.toString());
    this.tables[index] = this.clonedCars[table.key];
    delete this.clonedCars[table.key];
  }

  drawGraph(name) {
      const url = 'http://localhost:7474/db/neo4j/tx/commit';

      let options: NgNeo4jD3Options = this.ngNeo4jD3Service.getOptionsPresentation();

      const requestData = JSON.stringify({
        statements:
          [{

            'statement': 'MATCH(n:LINK)-[r]-(m:LINK) return n, r, m',
            'resultDataContents': ['graph']
          }
          ]
      });

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8 ',
          'Authorization': "Basic " + btoa('neo4j:admin')
        })
      };

      options.icons = {
        'LINK': 'gear'
      };



      options.minCollision = 60;
      options.nodeRadius= 20;
      options.graphContainerHeight = "450px";

      options.onNodeDoubleClick = (node: any) => {

        console.log('Double clicked on ' + node.id)
        const requestData = JSON.stringify({
          statements:
            [{

              'statement': 'MATCH(n:LINK)-[r]-(m:LINK) where ID(m) = ' + node.id + ' return n, r, m',
              'resultDataContents': ['graph']
            }
            ]
        });

        this.http.post(url, requestData, httpOptions).subscribe((res) => {
          const newdata: any = res;
          console.log(newdata);
          options.neo4jData = newdata;

          this.ngNeo4jD3Service.setValues('#neo4jd3', options);
          this.ngNeo4jD3Service.init();
        });
      };


      this.http.post(url, requestData, httpOptions).subscribe((res) => {
        const newdata: any = res;
        console.log(newdata);
        options.neo4jData = newdata;
        this.ngNeo4jD3Service.setValues('#neo4jd3', options);
        this.ngNeo4jD3Service.init();

      });


  }



}
