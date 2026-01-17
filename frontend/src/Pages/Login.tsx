import type { FormProps } from 'antd';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import type { LoginPayload } from '../types/auth.types';


const { Title, Text } = Typography;

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const onFinish: FormProps<LoginPayload>['onFinish'] = async (values) => {
        try {
            const data = await login(values);
            console.log(data, "data");
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card style={{ width: 400, margin: '0 auto', marginTop: '5rem' }}>
            <Flex vertical>
                <Title style={{
                    textAlign: "center"
                }}>
                    Login
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item<LoginPayload>
                        label="Email or Phone"
                        name="emailOrPhone"
                        rules={[{ required: true, message: 'Please input your email or phone!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<LoginPayload>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form>
                <Text style={{ marginTop: '1rem' }}>
                    Don't have an account? <a href="/register">Register</a>
                </Text>
            </Flex>
        </Card>
    );
};

export default Login;
