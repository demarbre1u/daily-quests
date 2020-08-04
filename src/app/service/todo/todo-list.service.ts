import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UUID } from 'angular2-uuid';

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
    let id = UUID.UUID();

    let newTask = {
      id: id,
      value: value, 
      done: false
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

  changeTaskState(id, state) 
  {
    let todolist = this.getTodoList()

    todolist.forEach(element => {
      if(element.id === id)
        element.done = state
    })

    this.saveTodoList(todolist)
    this.listChangedSource.next(todolist)
  }

  deleteTask(id) 
  {
    let todolist = this.getTodoList()

    let newList = todolist.filter(elem => elem.id !== id)

    this.saveTodoList(newList)
    this.listChangedSource.next(newList)
  }
}
