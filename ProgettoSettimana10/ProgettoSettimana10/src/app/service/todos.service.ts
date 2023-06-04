import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.interface';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

todoArrayCompleted:Todo[] = []
todoArray:Todo[] = []

  constructor() {

  }

  getTodoArray(){
    const todo_LocalStorage = localStorage.getItem('TodoArray');

    if (todo_LocalStorage) {
      this.todoArray = JSON.parse(todo_LocalStorage);

    }
    else{
       this.todoArray = []

    }
    return this.todoArray

  }


  recuperaTodo(todo:Todo){
    this.todoArray.push(todo)
    return this.todoArray;
  }

  aggiornaTodo(todo: Todo){

    this.todoArrayCompleted.push(todo);
    return this.todoArrayCompleted;
  }



  }

