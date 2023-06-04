import { gql, useMutation } from "@apollo/client";
import { Button, Col, Divider, Form, Input, Row, Select, Typography, notification } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery, { MediaQueryKey } from 'use-media-antd-query';

const REGISTER = gql`
    mutation Register(
        $firstname: String!,
        $lastname: String!,
        $age: Int!,
        $gender: Gender!,
        $phone: String!,
        $email: String!,
        $password: String!
    ) {
        register(archer: {
            firstname: $firstname,
            lastname: $lastname,
            age: $age,
            gender: $gender,
            phone: $phone,
            email: $email,
            password: $password
        }) {
            accessToken,
            archer {
                id,
                firstname,
                lastname
            }
        }
    }
`

const Register = () => {
    const media = useMediaQuery();
    const [register, { loading, data, error }] = useMutation(REGISTER);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            notification.success({
                message: `Welcome ${data?.register?.archer?.firstname} ${data?.register?.archer?.lastname}`,
                description: 'Successfully log in!'
            })
            localStorage.setItem('accessToken', data?.register?.accessToken)
            localStorage.setItem('userId', data?.register?.archer?.id);
            navigate('/')
        }
        if (error) {
            notification.error({
                message: 'Error',
                description: 'Email or phone number has been already existed!'
            })
        }
    }, [data, error])

    const onFinish = (target) => {
        register({ variables: target })
    }

    return (
        <Form onFinish={onFinish} layout="vertical" className={`p-12 shadow-xl-extra rounded ${['xs', 'md', 'sm'].includes(media) ? 'w-full' : 'w-1/2'} m-auto my-24`}>
            <Divider>
                <Typography.Title level={4}>Register</Typography.Title>
            </Divider>
            <Row gutter={24} className="my-8">
                <Col span={12}>
                    <Form.Item label="Firstname" rules={[{ required: true, message: 'Firstname is required!' }]} name={'firstname'}>
                        <Input placeholder="Firstname" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Lastname" rules={[{ required: true, message: 'Lastnamne is required!' }]} name={'lastname'}>
                        <Input placeholder="Lastname" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Phone Contact" rules={[{ required: true, message: 'Phone is required!' }]} name={'phone'}>
                        <Input placeholder="Phone Contact" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Age" rules={[{ required: true, message: 'Age is required!' }]} name={'age'}>
                        <Input type="number" placeholder="Age" />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Gender" rules={[{ required: true, message: 'Gender is required!' }]} name={'gender'}>
                        <Select placeholder="Gender">
                            <Select.Option value="MALE">Male</Select.Option>
                            <Select.Option value="FEMALE">Female</Select.Option>
                            <Select.Option value="OTHER">Other</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Email" rules={[{ required: true, message: 'Email is required!' }]} name={'email'}>
                        <Input placeholder="Email is required to log in" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item label="Password" rules={[{ required: true, message: 'Password is required!' }]} name={'password'}>
                        <Input.Password placeholder="Password is required to log in" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Button loading={loading} htmlType="submit" type="primary" className="w-full my-8">Register</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Register;