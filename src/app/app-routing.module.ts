import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'todolist', component: TodoListComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
