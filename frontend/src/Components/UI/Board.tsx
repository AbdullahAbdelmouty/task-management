import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Flex } from 'antd';
import { Column } from './Column';
import AppLayout from '../Layout/Layout';
import { useTasks } from '../../Hooks/useTasks';

export const Board = () => {
    const { tasks, loading, createTask, updateTaskStatus, setTasks } = useTasks();

    const onDragEnd = async (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const newStatus = destination.droppableId as typeof tasks[number]['status'];

        // Optimistic UI handled inside hook
        await updateTaskStatus(draggableId, newStatus);
    };

    const handleAddTask = async (task: Omit<typeof tasks[number], 'id'>) => {
        await createTask(task);
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
                        loading={loading}
                    />
                    <Column
                        title="In Progress"
                        status="IN_PROGRESS"
                        tasks={tasks.filter((t) => t.status === 'IN_PROGRESS')}
                        onAddTask={handleAddTask}
                        loading={loading}
                    />
                    <Column
                        title="Completed"
                        status="DONE"
                        tasks={tasks.filter((t) => t.status === 'DONE')}
                        onAddTask={handleAddTask}
                        loading={loading}
                    />
                </Flex>
            </DragDropContext>
        </AppLayout>
    );
};
