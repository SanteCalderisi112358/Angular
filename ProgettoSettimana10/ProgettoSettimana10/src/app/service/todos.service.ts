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

  recuperaTodo(todo:Todo){
    this.todoArray.push(todo)
    return this.todoArray;
  }

  aggiornaTodo(todo: Todo){

    this.todoArrayCompleted.push(todo);
    return this.todoArrayCompleted;
  }



  }

