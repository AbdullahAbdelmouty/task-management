import { Card, Tag } from 'antd';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../../types/task';

interface Props {
    task: Task;
    index: number;
}

export const TaskCard: React.FC<Props> = ({ task, index }) => {
    return (
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
                    <Card size="small" hoverable>
                        <Tag color="blue">{task.priority}</Tag>
                        <p>{task.title}</p>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};
