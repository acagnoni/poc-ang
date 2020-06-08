import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { AppComponent } from './app.component';
import { CodeTreeComponent } from './code-tree/code-tree.component';
import { ComponentTreeComponent } from './component-tree/component-tree.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsItemComponent } from './details-item/details-item.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { HttpClientModule } from '@angular/common/http' ;
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { BackendService } from './services/backend.service';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import {ContextMenuModule} from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    CodeTreeComponent,
    ComponentTreeComponent,
    NavigationBarComponent,
    DetailsItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    TableModule,
    AngularSplitModule.forRoot(),
    AppRoutingModule,
    DialogModule,
    DynamicDialogModule,
    VirtualScrollerModule,
    HttpClientModule,
    ScrollPanelModule,
    NgxJsonViewerModule,
    MessageModule,
    MessagesModule,
    ListboxModule,
    TreeModule,
    ContextMenuModule,
    DropdownModule,
    ToolbarModule,
    SplitButtonModule,
    CardModule,
    ToastModule,
    InputTextModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }

