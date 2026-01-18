import {
    Modal,
    Form,
    Input,
    Select,
    Button,
    Flex,
    Typography,
    DatePicker,
    Dropdown,
    Tag,
    Card,
} from 'antd';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../../types/task';
import {
    DotsSixVertical,
    DotsThreeOutlineVertical,
    PencilSimple,
    Trash,
} from '@phosphor-icons/react';
import { TaskCardStyle } from '../Styles/Card.styles';
import { useState } from 'react';
import { useTasks } from '../../Hooks/useTasks';
import dayjs from 'dayjs';

interface Props {
    task: Task;
    index: number;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
}

const { Text } = Typography;
const { TextArea } = Input;



export const TaskCard: React.FC<Props> = ({
    task,
    index,

}) => {
    const [form] = Form.useForm();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const { removeTask, updateTask } = useTasks()

    const menuItems = [
        {
            key: 'edit',
            label: 'Edit',
            icon: <PencilSimple size={16} />,
            onClick: () => {
                form.setFieldsValue({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate ? dayjs(task.dueDate) : null,
                });
                setOpen(true);
            },
        },
        {
            key: 'delete',
            label: 'Delete',
            icon: <Trash size={16} />,
            danger: true,
            onClick: () => setDeleteOpen(true),
        },
    ];

    return (
        <>
            <Draggable draggableId={task.id} index={index}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            marginBottom: 12,
                            ...provided.draggableProps.style,
                        }}
                    >
                        <TaskCardStyle
                            size="small"
                            hoverable
                        >
                            <Flex justify="space-between" align="center">
                                <Flex align="center">
                                    <DotsSixVertical size={24} />
                                    <Text strong style={{ marginLeft: 6 }}>
                                        {task.title}
                                    </Text>
                                </Flex>

                                <Dropdown
                                    menu={{ items: menuItems }}
                                    trigger={['click']}
                                >
                                    <Button
                                        type="text"
                                        icon={<DotsThreeOutlineVertical size={18} />}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Dropdown>
                            </Flex>

                            {task.description && (
                                <Flex>
                                    <Text
                                        style={{
                                            marginLeft: 28
                                        }}
                                    >
                                        {task.description}
                                    </Text>
                                </Flex>
                            )}

                            <Flex justify="space-between" style={{ marginTop: 12 }}>
                                <Tag
                                    color={
                                        task.priority === 'HIGH'
                                            ? 'red'
                                            : task.priority === 'MEDIUM'
                                                ? 'orange'
                                                : 'green'
                                    }
                                >
                                    {task.priority}
                                </Tag>

                                {task.dueDate && (
                                    <Text >
                                        Due:{' '}
                                        {new Date(task.dueDate).toLocaleDateString()}
                                    </Text>
                                )}
                            </Flex>
                        </TaskCardStyle>
                    </div>
                )}
            </Draggable >

            <Modal
                title="Delete Task"
                open={deleteOpen}
                okText="Delete"
                okButtonProps={{ danger: true }}
                onOk={() => {
                    setDeleteOpen(false);
                    removeTask(task.id);
                }}
                onCancel={() => setDeleteOpen(false)}
            >
                <Text>
                    Are you sure you want to delete{' '}
                    <Text strong>{task.title}</Text>?
                </Text>
            </Modal>

            <Modal
                title={`Edit Task to ${task.title}`}
                open={open}
                onOk={async () => {
                    const values = await form.validateFields();
                    await updateTask(task.id, {
                        title: values.title,
                        description: values.description,
                        priority: values.priority,
                        dueDate: values.dueDate
                            ? values.dueDate.toISOString()
                            : undefined,
                    });
                    setOpen(false);
                }

                }
                onCancel={() => setOpen(false)}
                okText="Edit"
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        priority: 'MEDIUM',
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[
                            { required: true, message: 'Title is required' },
                        ]}
                    >
                        <Input placeholder="Task title" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <TextArea
                            rows={3}
                            placeholder="Optional description"
                        />
                    </Form.Item>

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
        </>
    );
};
