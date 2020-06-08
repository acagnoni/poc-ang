import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription'; 
import { ComponentTreeInfo }  from './component-tree-info';

@Injectable({
  providedIn: 'root'
})

export class EventEmitterService {

  invokeCodeTreeFunction = new EventEmitter();    
  invokeComponentTreeFunction = new EventEmitter();
  invokeCodeItemDetailFunction = new EventEmitter();    
  subCodeTreeLinkClick: Subscription;    
  subCodeItemDetailClick: Subscription;    
  subComponentTreeLinkClick: Subscription;    
    
  constructor() { }    
    
  onCodeTreeLinkClick(data:ComponentTreeInfo) {    
    console.log('onCodeTreeLinkClick');
    this.invokeCodeTreeFunction.emit(data);    
  }    

  onCodeItemDetailClick(detail) {    
    console.log('onCodeItemDetailClick');
    this.invokeCodeItemDetailFunction.emit(detail);
  }    

  onComponentTreeLinkClick(data:ComponentTreeInfo) {
    console.log('onComponentTreeLinkClick');
    this.invokeComponentTreeFunction.emit(data);
  }
}
