import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';
import { Flex } from 'antd';
import { Column } from './Column';
import type { Task } from '../../types/task';
import AppLayout from '../Layout/Layout';

const initialTasks: Task[] = [
    { id: '1', title: 'UI/UX Design', priority: 'HIGH', status: 'TODO' },
    { id: '2', title: 'Learn ML', priority: 'MEDIUM', status: 'IN_PROGRESS' },
    { id: '3', title: 'Deploy App', priority: 'LOW', status: 'DONE' },
];

export const Board = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const onDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;

        if (!destination) return;

        setTasks((prev) =>
            prev.map((task) =>
                task.id === draggableId
                    ? { ...task, status: destination.droppableId as Task['status'] }
                    : task
            )
        );
    };

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        setTasks((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                ...task,
            },
        ]);
    };


    return (
        <AppLayout>
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex gap={24} justify="center" style={{ marginTop: '5rem' }}>
                    <Column
                        title="To Do"
                        status="TODO"
                        tasks={tasks.filter((t) => t.status === 'TODO')}
                        onAddTask={handleAddTask}
                    />
                    <Column
                        title="In Progress"
                        status="IN_PROGRESS"
                        tasks={tasks.filter((t) => t.status === 'IN_PROGRESS')}
                        onAddTask={handleAddTask}

                    />
                    <Column
                        title="Completed"
                        status="DONE"
                        tasks={tasks.filter((t) => t.status === 'DONE')}
                        onAddTask={handleAddTask}
                    />
                </Flex>
            </DragDropContext>
        </AppLayout>
    );
};
