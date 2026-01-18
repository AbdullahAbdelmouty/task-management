import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { Flex, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { Column } from './Column';
import AppLayout from '../Layout/Layout';
import { useTasks } from '../../Hooks/useTasks';
import { useEffect, useState } from 'react';
import type { Task, TaskPriority } from '../../types/task';
import dayjs from 'dayjs';

export const Board = () => {
    const { tasks, loading, createTask, updateTask, updateTaskStatus, removeTask, fetchTasks } = useTasks();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTasks();
    }, []);

    const onDragEnd = async (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const newStatus = destination.droppableId as typeof tasks[number]['status'];
        await updateTaskStatus(draggableId, newStatus);
    };

    const handleAddTask = async (task: Omit<Task, 'id'>) => {
        await createTask(task);
    };

    const handleEditClick = (task: Task) => {
        setCurrentTask(task);
        form.setFieldsValue({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate ? dayjs(task.dueDate) : null,
        });
        setEditModalOpen(true);
    };

    const handleDeleteClick = async (taskId: string) => {
        Modal.confirm({
            title: 'Delete Task',
            content: 'Are you sure you want to delete this task?',
            okText: 'Delete',
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    await removeTask(taskId);
                    message.success('Task deleted');
                } catch {
                    message.error('Failed to delete task');
                }
            },
        });
    };

    const handleEditSubmit = async () => {
        if (!currentTask) return;
        const values = await form.validateFields();
        try {
            await updateTask(currentTask.id, {
                title: values.title,
                description: values.description,
                priority: values.priority,
                dueDate: values.dueDate ? values.dueDate.toISOString() : undefined,
            });
            setEditModalOpen(false);
            setCurrentTask(null);
            message.success('Task updated');
        } catch {
            message.error('Failed to update task');
        }
    };

    return (
        <AppLayout>
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex gap={24} justify="center" style={{ marginTop: '5rem' }}>
                    {(['TODO', 'IN_PROGRESS', 'DONE'] as const).map((status) => {
                        const titleMap = { TODO: 'To Do', IN_PROGRESS: 'In Progress', DONE: 'Completed' };
                        return (
                            <Column
                                key={status}
                                title={titleMap[status]}
                                status={status}
                                tasks={tasks.filter((t) => t.status === status)}
                                onAddTask={handleAddTask}
                                loading={loading}
                                onEdit={handleEditClick}      // Pass edit handler
                                onDelete={handleDeleteClick}  // Pass delete handler
                            />
                        );
                    })}
                </Flex>
            </DragDropContext>

            <Modal
                title={currentTask ? `Edit Task: ${currentTask.title}` : ''}
                open={editModalOpen}
                onOk={handleEditSubmit}
                onCancel={() => setEditModalOpen(false)}
                okText="Update"
                destroyOnClose
            >
                <Form form={form} layout="vertical" initialValues={{ priority: 'MEDIUM' }}>
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Task title" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={3} placeholder="Optional description" />
                    </Form.Item>
                    <Form.Item name="priority" label="Priority">
                        <Select
                            options={[
                                { value: 'LOW', label: 'Low' },
                                { value: 'MEDIUM', label: 'Medium' },
                                { value: 'HIGH', label: 'High' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item name="dueDate" label="Due Date">
                        <DatePicker style={{ width: '100%' }} showTime />
                    </Form.Item>
                </Form>
            </Modal>
        </AppLayout>
    );
};
