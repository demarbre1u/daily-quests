import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoListService } from 'src/app/service/todo/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  list = []

  @ViewChild('newTask')
  newTask: ElementRef

  constructor(private todolist: TodoListService) { }

  ngOnInit() {
    this.todolist.listChanged$.subscribe(todolist => {
      this.list = todolist
      console.log(todolist)
    })

    this.todolist.setTodoList()
  }

  addNewTask() 
  {
    let value = this.newTask.nativeElement.value

    if(!value)
      return false

    this.todolist.addNewTask(value)

    this.newTask.nativeElement.value = ''

    return false
  }

}
