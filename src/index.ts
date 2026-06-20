import * as fs from 'fs';


const args = process.argv.slice(2);
const [command, ...rest] = args;


interface Task {
    id: number,
    description: string,
    status: 'todo' | 'in-progress' | 'done',
// ISO string format is used for date representation
    createdAt: string,
    updatedAt: string,
}

function loadTasks(): Task[] {
    if (!fs.existsSync('tasks.json')) {
        return [];
    } else {
        const data = fs.readFileSync("tasks.json", "utf-8");
       
        // JSON.parse() is used to convert the JSON string into a JavaScript object
        const res = JSON.parse(data); 
        return res;
    }
}
// format lai later

function saveTasks(tasks: Task[]): void {
    const data = JSON.stringify(tasks, null, 2);

    // write that string to tasks.json 
    fs.writeFileSync("tasks.json", data, "utf-8");
}

switch(command) {
    case "add": {
        const description = rest.join(" ");
        const tasks = loadTasks();

        // .map(...) is used to create arrays of task IDs, and Math.max(...) is used to find the maximum ID value.
        // the ... is the spread operator, which allows the array of IDs to be passed as individual arguments to Math.max(...).
        const newID = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1; 
        const newTask: Task = {
            id: newID,
            description, 
            status: 'todo',
            // date representing right now; toISOString() converts it into a JSON string
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        tasks.push(newTask);
        saveTasks(tasks); 

        console.log(`Task added sucessfully (ID : ${newTask.id})`);
        break; 
    }
    case "list": {
        const tasks = loadTasks();
        if (tasks.length === 0) {
            console.log("Nothing has been added yet!");
            break; 
        } else {
            

        tasks.forEach((task) => {
            console.log(`${task.id}. [${task.status}] ${task.description}`);
        });
    }
        break;
    }
    case "update": {
        // update {id} {new.description}
        const newID = Number(rest[0]);
        const tasks = loadTasks(); 

        const taskFound = tasks.find((t) => t.id === newID);

        if (!taskFound) {
            console.log("Can't find the task");
        } else {
            taskFound.description = rest.slice(1).join(' ');
            taskFound.updatedAt = new Date().toISOString();
            console.log(`Task ${taskFound.id} updated!`)
        }

        saveTasks(tasks);
        break;
    }

    case "delete": {
        const tasks = loadTasks();
        const deletingID = Number(rest[0]);
        const updatedTasks = tasks.filter((task) => task.id !== deletingID);

        if (updatedTasks.length === tasks.length) {
            console.log("Delete was unsucessful!");
        }
        saveTasks(updatedTasks);
        break;
    }

    case "mark-in-progress": {
        const tasks = loadTasks(); 
        const newID = Number(rest[0]);

        // look for the action with that ID, then change its status 
        const taskFound = tasks.find((t) => t.id === newID);

        if (taskFound) {
            taskFound.status = "in-progress"; 
            taskFound.updatedAt = new Date().toISOString();
            console.log(`Task ${taskFound.id} marked in-progress!`)
        } else {
            console.log("Not found");
        }
        
        saveTasks(tasks);
        break;
    

    }
    case "mark-done": {
        const tasks = loadTasks(); 
        const newID = Number(rest[0]);

        // look for the action with that ID, then change its status 
        const taskFound = tasks.find((t) => t.id === newID);

        if (taskFound) {
            taskFound.status = "done"; 
            taskFound.updatedAt = new Date().toISOString();
            console.log(`Task ${taskFound.id} marked done!`)
        } else {
            console.log("Not found");
        }

        saveTasks(tasks);
        break;
    }
}