import { gql, useLazyQuery, useQuery } from "@apollo/client"
import { Button, Col, ConfigProvider, Divider, Form, Input, Row, Space, Typography, notification } from "antd"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOGIN = gql`
    query LogIn($email: String!, $password: String!) {
        login(authInput: { email: $email, password: $password }) {
            accessToken,
            archer {
                id,
                firstname,
                lastname
            }
        }
    }
`

const Login = () => {
    const [login, { data, error, loading }] = useLazyQuery(LOGIN, { fetchPolicy: 'network-only' });
    const navigate = useNavigate();
    

    useEffect(() => {
        if(data) {
            notification.success({
                message: `Welcome ${data?.login?.archer?.firstname} ${data?.login?.archer?.lastname}`,
                description: 'Successfully login'
            })
            localStorage.setItem('accessToken', data?.login?.accessToken)
            localStorage.setItem('userId', data?.login?.archer?.id)
            navigate('/')
        }
        if(error) {
            console.log(error.name)
            notification.error({
                message: 'Error',
                description: "Username or password is incorrect"
            })
        }
    },[data, error])

    const onFinish = async (target) => {
        login({variables: target});
    }

    return (
        <Form onFinish={onFinish} layout="vertical" className="p-12 shadow-xl-extra rounded w-2/5 m-auto my-24">
            <Divider>
                <Typography.Title level={4}>Login</Typography.Title>
            </Divider>
            <Row gutter={16} className="my-8">
                <Col span={24}>
                    <Form.Item label="Email" name={'email'} rules={[{
                        required: true,
                        message: 'Email is missing!'
                    }]}>
                        <Input placeholder="Firstname"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Password" name={'password'} rules={[{
                        required: true,
                        message: 'Password is missing!'
                    }]}>
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Typography.Link href="register">Don't have account yet ?</Typography.Link>

                </Col>
                <Col span={24} className="flex flex-row justify-center items-center pt-8">
                    <Button htmlType="submit" loading={loading} className="w-full" type="primary">Sign In</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Login