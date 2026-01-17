import { Droppable } from '@hello-pangea/dnd';
import { ColumnWrapper } from '../Styles/Kanban.styles';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus, TaskPriority } from '../../types/task';
import { PlusCircleIcon } from '@phosphor-icons/react';
import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Flex,
    Typography,
    DatePicker,
} from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

const { Text } = Typography;
const { TextArea } = Input;

interface Props {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    loading?: boolean;
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
            description: values.description,
            priority: values.priority as TaskPriority,
            status,
            dueDate: values.dueDate
                ? dayjs(values.dueDate).toISOString()
                : undefined,
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
                    {/* Header */}
                    <Flex justify="space-between" align="center">
                        <Text strong>{title}</Text>
                        <Text type="secondary">{tasks.length}</Text>
                    </Flex>

                    {/* Add Button */}
                    <Button
                        icon={<PlusCircleIcon />}
                        style={{ width: '100%', marginBottom: 12 }}
                        onClick={() => setOpen(true)}
                    >
                        Add Task
                    </Button>

                    {/* Tasks */}
                    {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                    ))}

                    {provided.placeholder}

                    <Modal
                        title={`Add Task to ${title}`}
                        open={open}
                        onOk={handleSubmit}
                        onCancel={() => setOpen(false)}
                        okText="Create"
                        destroyOnClose
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            initialValues={{
                                priority: 'MEDIUM',
                            }}
                        >
                            {/* Title */}
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    { required: true, message: 'Title is required' },
                                ]}
                            >
                                <Input placeholder="Task title" />
                            </Form.Item>

                            {/* Description */}
                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </Form.Item>

                            {/* Priority */}
                            <Form.Item
                                name="priority"
                                label="Priority"
                            >
                                <Select
                                    options={[
                                        { value: 'LOW', label: 'Low' },
                                        { value: 'MEDIUM', label: 'Medium' },
                                        { value: 'HIGH', label: 'High' },
                                    ]}
                                />
                            </Form.Item>

                            {/* Due Date */}
                            <Form.Item
                                name="dueDate"
                                label="Due Date"
                            >
                                <DatePicker
                                    style={{ width: '100%' }}
                                    showTime
                                />
                            </Form.Item>
                        </Form>
                    </Modal>
                </ColumnWrapper>
            )}
        </Droppable>
    );
};
