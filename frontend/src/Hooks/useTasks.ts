import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types/task';
import api from '../services/axios';
import { message } from 'antd';

const API_URL = import.meta.env.VITE_API_URL;

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await api.get<Task[]>(`${API_URL}/tasks`);
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            message.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [tasks]);

    const createTask =
        async (task: Omit<Task, 'id'>) => {
            try {
                const res = await api.post<Task>(`${API_URL}/tasks`, task);
                setTasks((prev) => [res.data, ...prev]);
                return res.data;
            } catch (err) {
                console.error(err);
                message.error('Failed to create task');
                throw err;
            }
        }

    const updateTask =
        async (taskId: string, updates: Partial<Omit<Task, 'id'>>) => {
            try {
                const res = await api.patch<Task>(`${API_URL}/tasks/${taskId}`, updates);
                setTasks((prev) =>
                    prev.map((t) => (t.id === taskId ? res.data : t)),
                );
                return res.data;
            } catch (err) {
                console.error(err);
                message.error('Failed to update task');
                throw err;
            }
        }

    const updateTaskStatus =
        async (taskId: string, status: Task['status']) => {
            // Optimistic UI update
            setTasks((prev) =>
                prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
            );

            try {
                await api.patch(`${API_URL}/tasks/${taskId}/status`, { status });
            } catch (err) {
                console.error(err);
                message.error('Failed to update task status');
                // Revert UI if failed
                fetchTasks();
            }
        }

    const removeTask = async (taskId: string) => {
        try {
            await api.delete(`${API_URL}/tasks/${taskId}`);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
        } catch (err) {
            console.error(err);
        }
    }

    return {
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTaskStatus,
        updateTask,
        removeTask,
        setTasks, // expose if needed for drag & drop
    };
};
