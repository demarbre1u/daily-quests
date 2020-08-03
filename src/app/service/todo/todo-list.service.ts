import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private listChangedSource = new Subject<any>()
  listChanged$ = this.listChangedSource.asObservable()

  constructor() 
  {
    this.setTodoList()
  }

  setTodoList() 
  {
    let todolist = this.getTodoList()

    this.listChangedSource.next(todolist)
  }

  addNewTask(value)
  {
    let newTask = {
      value: value
    }

    let todolist = this.getTodoList()
    todolist.push(newTask)

    this.saveTodoList(todolist)

    this.listChangedSource.next(todolist)
  }

  getTodoList() 
  {
    let todolist = JSON.parse(localStorage.getItem('todolist')) 
    todolist = todolist ? todolist : []

    return todolist
  }

  saveTodoList(todolist) 
  {
    localStorage.setItem('todolist', JSON.stringify(todolist))
  }
}
