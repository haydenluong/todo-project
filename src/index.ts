import * as fs from 'fs';


const args = process.argv.slice(2);
const [command, ...rest] = args;


console.log(command);
console.log(rest);

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
    const data = JSON.strin
}