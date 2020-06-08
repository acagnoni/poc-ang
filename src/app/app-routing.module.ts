import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeTreeComponent } from './code-tree/code-tree.component';
import { AppComponent } from './app.component';
import { ComponentTreeComponent } from './component-tree/component-tree.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: AppComponent },
  { path: 'CodeTree', component: CodeTreeComponent },
  { path: 'ComponentTree', component: ComponentTreeComponent },
  { path: 'NavigationBar', component: NavigationBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
