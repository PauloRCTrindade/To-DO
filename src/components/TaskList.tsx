import { useState,useEffect } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import { isIfStatement } from '@babel/types';

const { v4: uuidv4 } = require('uuid');

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  function handleCreateNewTask() {
    // Cria uma nova task com um id random, não permita criar caso o título seja vazio.

		if (newTaskTitle)  {
			var newTask:Task = {
				id: uuidv4(),
				title: newTaskTitle,
				isComplete: false,
			}
			setTasks([...tasks,newTask])		
			
		}else{
			alert('Não é possível adicionar um campo vazio !');
		}

	}

  function handleToggleTaskCompletion(id: string) {
    // Altera entre `true` ou `false` o campo `isComplete` de uma task com dado I;
		const taskChecked:Task[] = tasks.filter(item => item.id === id);

		let pos = tasks.indexOf(taskChecked[0]);
		console.log(pos);
		
		if (taskChecked[0].isComplete == false){
			var newTaskCheked:Task = {
				id: taskChecked[0].id,
				title: taskChecked[0].title,
				isComplete: true,
			}
						
  	}else{
			var newTaskCheked:Task = {
				id: taskChecked[0].id,
				title: taskChecked[0].title,
				isComplete: false,
			}
		}

		tasks.forEach(function(item,index){
			tasks[pos] = newTaskCheked;
		})

		 setTasks([...tasks]);
	}	

  function handleRemoveTask(id: string) {
    // Remove uma task da listagem pelo ID
		const taskDelete:Task[] = tasks.filter(item => item.id === id);
		let pos = tasks.indexOf(taskDelete[0]);

		tasks.splice(pos,1);

		setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}