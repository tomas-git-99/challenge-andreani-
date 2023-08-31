import { useState } from "react";
import Task from "../Task/Task";
import { ITask } from "../../interfaces/Task";

import { MdOutlineAdd, MdSend, MdOutlineClear } from "react-icons/md";
import './Card.css'

interface Props {
    tasks: ITask[];
    status: string;
    handleUpdateList: (id: number, status: string) => void;
    setSelectStatus: React.Dispatch<React.SetStateAction<string>>;
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
    selectStatus: string;
}

export default function Card({ tasks, setTasks, status, handleUpdateList, setSelectStatus, selectStatus }: Props) {

    const DRAG_NAME = 'text/plain';

    const [focuInput, setFocuInput] = useState(false);
    const [taskName, setTaskName] = useState('');

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleUpdateList(+e.dataTransfer.getData(DRAG_NAME), status);
    }
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, dataID: number) => { e.dataTransfer.setData(DRAG_NAME, `${dataID}`) }

    const addTask = () => {

        const id = tasks.length + 1;
        const newTask: ITask = {
            id: id,
            content: taskName,
            status: selectStatus
        }


        setTasks(prev => [...prev, newTask])

        setTaskName('')
    }
    const boolFocuInput = (): boolean => focuInput && selectStatus === status;

    return (

        <div
            onDrop={(e) => handleDrop(e)}
            onDragOver={handleDragOver}>

            <div style={{ width: "200px" }}>

                <h4 className="title-card" >{status}  <span className="count"> {tasks.filter(e => e.status == status).length} </span></h4>

                {
                    tasks.map(i => {
                        return (
                            status === i.status
                            && (
                                <Task key={i.id} handleDragStart={handleDragStart} task={i} />
                            )
                        )
                    })
                }

                <div
                    className="button-body"
                    style={{ border: (boolFocuInput() ? '1px solid  #E6E2DF' : 'none') }}>
                    <div className="input-body">
                        <div style={{ display: (boolFocuInput() ? 'none' : 'block') }}>
                            <MdOutlineAdd />
                        </div>
                        <input
                            className="input-task"
                            type="text"
                            placeholder={boolFocuInput() ? "Nombre de la tarea" : "Añadir tarea"}
                            onFocus={() => {
                                setFocuInput(true);
                                setSelectStatus(status)
                            }}
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") addTask()
                            }}
                        />
                    </div>
                    {
                        boolFocuInput() && (
                            <div>
                                <hr />
                                <div className="buttons">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            setFocuInput(false)
                                            setTaskName('')

                                        }}
                                        style={{ background: '  #E6E2DF' }}
                                    > <MdOutlineClear /></button>
                                    <button
                                        className="button"
                                        onClick={addTask}
                                        style={{ background: '#A8F48C' }} > <MdSend /></button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div >


        </div >
    )

}