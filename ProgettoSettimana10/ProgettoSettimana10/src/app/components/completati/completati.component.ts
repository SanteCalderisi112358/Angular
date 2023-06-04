import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.interface';
import { TodosService } from 'src/app/service/todos.service';

@Component({
  selector: 'app-completati',
  templateUrl: './completati.component.html',
  styleUrls: ['./completati.component.scss'],
})
export class CompletatiComponent implements OnInit {
  todoArrayCompleted: Todo[] = [];
  opacity: boolean = true;
  todo_singolo!: Todo;
  constructor(private todos: TodosService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.opacity = !this.opacity;
    }, 2000);


    this.todoArrayCompleted = this.todos.aggiornaTodo(this.todo_singolo);

  }

}
