import { gql, useMutation, useQuery } from "@apollo/client";
import { Button, Col, Divider, Form, Row, Select, Typography, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = gql`
    query GetCategories{
        getCategories {
            id,
            gender,
            ageRange,
            equipments {
                id,
                name
            }
        }
        getAllEquipments {
            id,
            name
        }
        getRoundTypes {
            id,
            name,
            ranges {
                face {
                    target
                },
                distance {
                    length
                }
            }
        }
    }
`

const CREATE_ROUND = gql`
    mutation CreateRound($archer: Int!, $category: Int!, $equipment: Int!, $roundType: Int!){
        createRound(archer: $archer, category: $category, equipment: $equipment, roundType: $roundType) {
            id
        }
    }
`


const CreateRound = ({ setCurrent, current, setRound }) => {
    const wrapper = useQuery(CATEGORIES, {fetchPolicy: 'cache-first'})
    const [chosenCategory, setChosenCategory] = useState(null);
    const [config, setConfig] = useState(null);
    const navigate = useNavigate();
    const [createRound, { data, loading, error }] = useMutation(CREATE_ROUND, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    });

    const onfinish = (target) => {
        createRound({
            variables: { ... target, archer: localStorage.getItem('userId')}
        })
    }

    useEffect(() => {
        if(data) {
            setCurrent(current + 1);
            setRound(data?.createRound?.id);
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: 'Unable to create round!'
            })
        }
    }, [data, error])

    return (
        <>

        <Form onFinish={onfinish} layout="vertical" className="w-full my-4 flex flex-col justify-center items-center">
        <div className="my-4 w-full flex flex-wrap justify-center items-center">
            <Typography.Title className="w-full ml-2" level={3}>Archery Score Recorder</Typography.Title>
        </div>
        <Row gutter={16} justify={'center'} className="w-full">
                <Col lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}}>
                    <Form.Item className="w-full" name={'category'} label="Category" rules={[{required: true, message:'Category is required!'}]}>
                        <Select className="w-full" placeholder="Please select round type" onChange={(value) => {
                            setChosenCategory(value);
                        }}>
                            {
                                wrapper?.data?.getCategories?.map((category, i) => 
                                <Select.Option key={i} value={category?.id}>{category?.gender?.charAt(0) + category?.gender?.slice(1).toLowerCase()} {category?.ageRange}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col lg={{span: 12}} md={{span: 24}} xs={{span: 24}} sm={{span: 24}}>
                    <Form.Item className="w-full" name={'equipment'} label="Equipment" rules={[{required: true, message:'Equipment is required!'}]}>
                        <Select className="w-full" placeholder="Please select your prefered equipment">
                            {
                                chosenCategory ? 
                                wrapper?.data?.getCategories?.filter(equipment => equipment?.id == chosenCategory).map((category,i) => 
                                    category?.equipments?.map(equipment => {
                                        return (
                                            <Select.Option value={equipment?.id} key={equipment?.id}>{equipment?.name}</Select.Option>
                                        )
                                    })
                                )
                                :
                                wrapper?.data?.getAllEquipments?.map((equipment,i) => {
                                    return (
                                        <Select.Option key={`${i} + ${i}`} value={equipment?.id}>{equipment?.name}</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item className="w-full" name={'roundType'} label="Round Type" rules={[{required: true, message:'Round Type is required!'}]}>
                        <Select className="w-full" placeholder="Please select your prefered round type">
                            {
                                wrapper?.data?.getRoundTypes?.map((e,i) => <Select.Option key={i} value={e?.id}>{e?.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24} className="mt-8">
                    <Form.Item>
                        <Button className="w-full" type="primary" htmlType="submit">Create Round</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        </>
    )
}


export default CreateRound