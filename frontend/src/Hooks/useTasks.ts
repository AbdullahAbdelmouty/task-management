import { useState, useEffect } from 'react';
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
    }, []);

    const createTask = async (task: Omit<Task, 'id'>) => {
        try {
            setLoading(true);
            const res = await api.post<Task>(`${API_URL}/tasks`, task);
            setTasks((prev) => [res.data, ...prev]);
            return res.data;
        } catch (err) {
            console.error(err);
            message.error('Failed to create task');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId: string, updates: Partial<Omit<Task, 'id'>>) => {
        try {
            setLoading(true);
            const res = await api.patch<Task>(`${API_URL}/tasks/${taskId}`, updates);
            setTasks((prev) => prev.map((t) => (t.id === taskId ? res.data : t)));
            return res.data;
        } catch (err) {
            console.error(err);
            message.error('Failed to update task');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateTaskStatus = async (taskId: string, status: Task['status']) => {
        setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
        try {
            setLoading(true);
            await api.patch(`${API_URL}/tasks/${taskId}/status`, { status });
        } catch (err) {
            console.error(err);
            message.error('Failed to update task status');
            fetchTasks();
        } finally {
            setLoading(false);
        }
    };

    const removeTask = async (taskId: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        try {
            setLoading(true);
            await api.delete(`${API_URL}/tasks/${taskId}`);
        } catch (err) {
            console.error(err);
            message.error('Failed to delete task');
            fetchTasks();
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTask,
        updateTaskStatus,
        removeTask,
        setTasks,
    };
};
