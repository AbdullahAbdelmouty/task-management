import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import AppLayout from '../Components/Layout/Layout';

type FieldType = {
    fullName?: string;
    password?: string;
    email?: string;
    phone?: string;
    role?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);
        console.log('Success:', response.data);
    } catch (error) {
        console.log(error);
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register: React.FC = () => (
    <AppLayout>

        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
        >
            <Form.Item<FieldType>
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: 'Please input your full name!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item label={null}>
                <Button htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    </AppLayout>

);

export default Register;