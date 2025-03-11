import { Injectable } from '@angular/core';
import {dummyTasks} from '../dummy-tasks';
import { NewTaskData } from './task/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService{
  private tasks = dummyTasks;

  constructor () {
    const tasks = localStorage.getItem('tasks'); 
    if(tasks){
     this.tasks = JSON.parse(tasks); 
    }
  }
  getUserTasks(userId: string){
    return this.tasks.filter(task => task.userId === userId);
  }

  addTask(taskData: NewTaskData, userId: string){
    this.tasks.push({
      id: Math.random().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.dueDate
    })
    this.saveTasksArray();
  }

  removeTask(taskId: string){
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasksArray();
  }

  private saveTasksArray(){
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}