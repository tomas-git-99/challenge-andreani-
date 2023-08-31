import { useState } from "react";
import Card from "../Card/Card";
import "./Kanban.css"


interface props {
    tables: string[];
}


export default function Kanban({ tables }: props) {
    const [tasks, setTasks] = useState([{
        id: 1,
        content: 'Limpiar',
        status: 'sin realizar'
    },
    {
        id: 2,
        content: 'Trabajar',
        status: 'en proceso'
    },
    {
        id: 3,
        content: 'Entrenar',
        status: 'realizado'
    },
    {
        id: 4,
        content: 'Salir',
        status: 'sin realizar'
    }]);
    const [selectStatus, setSelectStatus] = useState('');

    const handleUpdateList = (id: number, status: string) => {
        let card = tasks.find(item => item.id === id);
        if (card && card.status !== status) {
            card.status = status;
            setTasks(prev => (card ? [card, ...prev.filter(item => item.id !== id)] : prev));
        }
    }

    return (

        <div className="card"  >
            {
                tables.map(status => {
                    return (

                        <Card
                            handleUpdateList={handleUpdateList}
                            status={status}
                            tasks={tasks}
                            setTasks={setTasks}
                            selectStatus={selectStatus}
                            setSelectStatus={setSelectStatus}
                            key={status}
                        />
                    )
                })
            }


        </div>

    )
}