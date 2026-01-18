import { Draggable } from '@hello-pangea/dnd';
import { TaskCardStyle } from '../Styles/Card.styles';
import type { Task } from '../../types/task';
import { Flex, Tag, Typography, Button, Dropdown } from 'antd';
import { DotsSixVertical, DotsThreeOutlineVertical } from '@phosphor-icons/react';

const { Text } = Typography;


interface Props {
    task: Task;
    index: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

export const TaskCard: React.FC<Props> = ({ task, index, onEdit, onDelete }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <TaskCardStyle hoverable style={{ marginBottom: 12 }}>
                        <Flex justify="space-between" align="center">
                            <Flex align="center">
                                <DotsSixVertical size={24} />
                                <Text strong style={{ marginLeft: 6 }}>
                                    {task.title}
                                </Text>
                            </Flex>

                            <Dropdown
                                menu={{
                                    items: [
                                        { key: 'edit', label: 'Edit', onClick: onEdit },
                                        { key: 'delete', label: 'Delete', danger: true, onClick: onDelete },
                                    ],
                                }}
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
        </Draggable>
    );
};
