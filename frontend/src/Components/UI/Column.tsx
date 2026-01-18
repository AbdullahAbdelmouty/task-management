import { Droppable } from '@hello-pangea/dnd';
import { ColumnWrapper } from '../Styles/Kanban.styles';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus, TaskPriority } from '../../types/task';
import { FunnelIcon, PlusCircleIcon } from '@phosphor-icons/react';
import { Modal, Form, Input, Select, Button, Flex, Typography, DatePicker, Tag, Dropdown } from 'antd';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';

const { Text } = Typography;
const { TextArea } = Input;

interface Props {
    title: string;
    status: TaskStatus;
    tasks: Task[];
    loading?: boolean;
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
}

export const Column: React.FC<Props> = ({ title, status, tasks, onAddTask, loading, onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [filterPriority, setFilterPriority] = useState<TaskPriority | 'ALL'>('ALL');

    const handleSubmit = async () => {
        const values = await form.validateFields();

        onAddTask({
            title: values.title,
            description: values.description,
            priority: values.priority as TaskPriority,
            status,
            dueDate: values.dueDate ? dayjs(values.dueDate).toISOString() : undefined,
        });

        form.resetFields();
        setOpen(false);
    };

    const filteredTasks = useMemo(() => {
        return filterPriority === 'ALL' ? tasks : tasks.filter((t) => t.priority === filterPriority);
    }, [tasks, filterPriority]);

    const menuItems = [
        { key: 'all', label: 'All', onClick: () => setFilterPriority('ALL') },
        { key: 'high', label: 'High', onClick: () => setFilterPriority('HIGH') },
        { key: 'medium', label: 'Medium', onClick: () => setFilterPriority('MEDIUM') },
        { key: 'low', label: 'Low', onClick: () => setFilterPriority('LOW') },
    ];

    return (
        <Droppable droppableId={status}>
            {(provided) => (
                <ColumnWrapper ref={provided.innerRef} {...provided.droppableProps}>
                    <Flex justify="space-between" align="center">
                        <Text strong>{title}</Text>
                        <Flex gap={4} align="center">
                            <Tag color="blue">{filteredTasks.length}</Tag>
                            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                                <Button type="text" icon={<FunnelIcon size={18} />} onClick={(e) => e.stopPropagation()} />
                            </Dropdown>
                        </Flex>
                    </Flex>

                    <Button type="primary" icon={<PlusCircleIcon />} style={{ width: '100%', marginBottom: 12 }} onClick={() => setOpen(true)} loading={loading}>
                        Add Task
                    </Button>

                    {filteredTasks.map((task, index) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            index={index}
                            onEdit={() => onEdit?.(task)}
                            onDelete={() => onDelete?.(task.id)}
                        />
                    ))}


                    {provided.placeholder}

                    <Modal title={`Add Task to ${title}`} open={open} onOk={handleSubmit} onCancel={() => setOpen(false)} okText="Create" destroyOnClose confirmLoading={loading}>
                        <Form form={form} layout="vertical" initialValues={{ priority: 'MEDIUM' }}>
                            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
                                <Input placeholder="Task title" />
                            </Form.Item>
                            <Form.Item name="description" label="Description">
                                <TextArea rows={3} placeholder="Optional description" />
                            </Form.Item>
                            <Form.Item name="priority" label="Priority">
                                <Select options={[{ value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }]} />
                            </Form.Item>
                            <Form.Item name="dueDate" label="Due Date">
                                <DatePicker style={{ width: '100%' }} showTime />
                            </Form.Item>
                        </Form>
                    </Modal>
                </ColumnWrapper>
            )}
        </Droppable>
    );
};
