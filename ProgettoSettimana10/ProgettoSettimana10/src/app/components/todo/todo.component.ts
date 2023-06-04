import { Component, OnInit } from '@angular/core';

import { Todo } from 'src/app/models/todo.interface';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todo_singolo!: Todo;
  newTodoTitle: string = '';
  todoArray: Todo[] = [];
  todoArrayCompleted: Todo[] = [];
  noTaskString: string = '';
  opacity: boolean = true;
  index: number = 0;

  constructor(private todos: TodosService) {}

  ngOnInit(): void {

    setTimeout(() => {
      this.opacity = !this.opacity;
    }, 2000)
    this.newTodoTitle = '';
    this.todoArray = this.todos.getTodoArray()
    if (this.todoArray.length > 0) {
      this.index = this.todoArray[this.todoArray.length - 1].id + 1;
    } else {
      this.index = this.index;
      this.noTaskString = 'Ops, non ci sono Tasks...';
    }
  }

  recuperaTodo() {
    if (this.newTodoTitle === '') {
      alert('Riempire Input!');
    } else {
      this.noTaskString = '';
      this.todo_singolo = {
        id: this.index,
        title: this.newTodoTitle,
        completed: false,
      };
      this.todoArray =  this.todos.recuperaTodo(this.todo_singolo);
      this.index++;

      localStorage.setItem('TodoArray', JSON.stringify(this.todoArray));
    }
    this.newTodoTitle = '';

  }

  aggiornaTodo(todo: Todo) {

    setTimeout(() => {


      todo.completed = true;
      const index2 = this.todoArray.indexOf(todo);
      this.todoArrayCompleted=this.todos.aggiornaTodo(todo);
      this.todoArray.splice(index2, 1);
      console.log(this.todoArray)
      console.log(this.todoArrayCompleted)
      localStorage.setItem('TodoArray', JSON.stringify(this.todoArray));
      localStorage.setItem('TodoArrayCompleted',JSON.stringify(this.todoArrayCompleted)
      );
    }, 2000);
  }
}
