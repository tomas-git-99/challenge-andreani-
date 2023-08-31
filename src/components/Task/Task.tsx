import { ITask } from "../../interfaces/Task";
import './Task.css'

interface Props {
    task: ITask;
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, dataID: number) => void;

}

export default function Task({ task, handleDragStart }: Props) {

    return (
        <div
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            key={task.id}
            className="task">
            {task.content}
        </div>
    )
}