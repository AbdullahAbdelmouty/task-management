import React from 'react';
import type { FormProps } from 'antd';
import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';

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
        localStorage.setItem('accessToken', response.data.accessToken);
        // You can redirect the user or update the UI as needed

    } catch (error) {
        console.log(error);
    }
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register: React.FC = () => (
    <Card style={{ width: 400, margin: '0 auto', marginTop: '5rem' }}>
        <Form
            name="register"
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
                <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    </Card>
);

export default Register;