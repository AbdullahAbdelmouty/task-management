import { Droppable } from '@hello-pangea/dnd';
import { ColumnWrapper, ColumnHeader } from '../Styles/Kanban.styles';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types/task';
import { PlusCircleIcon } from '@phosphor-icons/react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useState } from 'react';

interface Props {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    onAddTask: (task: Omit<Task, 'id'>) => void;
}


export const Column: React.FC<Props> = ({
    title,
    status,
    tasks,
    onAddTask,
}) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        const values = await form.validateFields();

        onAddTask({
            title: values.title,
            priority: values.priority,
            status,
        });

        form.resetFields();
        setOpen(false);
    };

    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <ColumnWrapper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <ColumnHeader>
                        {title} ({tasks.length})
                    </ColumnHeader>

                    <Button
                        icon={<PlusCircleIcon />}
                        style={{ width: '100%', marginBottom: 12 }}
                        onClick={() => setOpen(true)}
                    >
                        Add Task
                    </Button>

                    {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                    ))}

                    {provided.placeholder}

                    {/* Add Task Modal */}
                    <Modal
                        title={`Add Task to ${title}`}
                        open={open}
                        onOk={handleSubmit}
                        onCancel={() => setOpen(false)}
                        okText="Create"
                    >
                        <Form form={form} layout="vertical">
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[{ required: true, message: 'Title is required' }]}
                            >
                                <Input placeholder="Task title" />
                            </Form.Item>

                            <Form.Item
                                name="priority"
                                label="Priority"
                                initialValue="MEDIUM"
                            >
                                <Select
                                    options={[
                                        { value: 'LOW', label: 'Low' },
                                        { value: 'MEDIUM', label: 'Medium' },
                                        { value: 'HIGH', label: 'High' },
                                    ]}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </ColumnWrapper>
            )}
        </Droppable>
    );
};
