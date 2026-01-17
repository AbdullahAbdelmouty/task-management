import type { FormProps } from 'antd';
import { Button, Card, Form, Input, Typography } from 'antd';
import useAuth from '../Hooks/useAuth';
import type { RegisterPayload } from '../types/auth.types';
import { useNavigate } from 'react-router';
const { Text, Title } = Typography


const Register = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate()
    const onFinish: FormProps<RegisterPayload>['onFinish'] = async (
        values,
    ) => {
        const data = await register(values);
        console.log(data, "data");
        navigate("/")

    };

    return (
        <Card style={{ width: 400, margin: '5rem auto' }}>
            <Title style={{
                textAlign: "center"
            }}>
                Register
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, min: 6 }]}
                >
                    <Input.Password />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                >
                    Register
                </Button>
            </Form>
        </Card>
    );
};

export default Register;
