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
    console.log(this.opacity)
    setTimeout(() => {
      this.opacity = !this.opacity;
    }, 2000);
     this.newTodoTitle = '';
    const todo_LocalStorage = localStorage.getItem('TodoArray');

      if (todo_LocalStorage) {
        this.todoArray = JSON.parse(todo_LocalStorage);
}


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
      this.todoArray.push(this.todo_singolo);
      this.index++;

      localStorage.setItem('TodoArray', JSON.stringify(this.todoArray));
    }
    this.newTodoTitle = '';
  }

  aggiornaTodo(todo: Todo) {

    setTimeout(()=>{

    const index2 = this.todoArray.indexOf(todo);
    todo.completed = true;
    this.todoArrayCompleted.push(todo);
    this.todoArray.splice(index2, 1);
    localStorage.setItem('TodoArray', JSON.stringify(this.todoArray));
    localStorage.setItem('TodoArrayCompleted',JSON.stringify(this.todoArrayCompleted));
    console.log(this.todoArray);
    console.log(this.todoArrayCompleted);
    this.todos.aggiornaTodo(todo)

    },2000)

  }
}
