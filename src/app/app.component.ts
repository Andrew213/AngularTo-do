import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';

export type TodoType = 'OPEN' | 'DONE';

export interface ITodo {
  id: number;
  title: string;
  description: string;
  status: TodoType;
}

const todoData: ITodo[] = [
  {
    id: 1,
    title: 'Test',
    description: 'Testing to do',
    status: 'OPEN',
  },
  {
    id: 2,
    title: 'Test',
    description: 'Testing to do',
    status: 'OPEN',
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [provideAnimations()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public dataSource = todoData;
  public todoTitle = '';
  public todoDescr = '';

  public addTodo() {
    if (this.todoTitle) {
      const newToDo: ITodo = {
        title: this.todoTitle,
        description: this.todoDescr,
        id: Math.random(),
        status: 'OPEN',
      };
      this.todoTitle = '';
      this.todoDescr = '';
      this.dataSource.push(newToDo);
    }
  }

  public removeTodo(id: number) {
    this.dataSource = this.dataSource.filter((el) => el.id !== id);
  }

  public onCheckboxChange(event: MatCheckboxChange, value: ITodo) {
    const foundIndex = this.dataSource.findIndex(
      (item) => item.id === value.id
    );
    const foundItem = this.dataSource[foundIndex];
    this.dataSource.splice(foundIndex, 1, {
      ...foundItem,
      status: event.checked ? 'DONE' : 'OPEN',
    });
  }
}
