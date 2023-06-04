import { gql, useQuery } from "@apollo/client";
import { Button, Col, Divider, Form, Input, Row, Select, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

const columns = [
    {
        key: 'Ranking',
        title: 'Ranking',
        dataIndex: 'ranking',
        render: (_, { ranking }) => {
            let color = ''
            if(ranking === 1) {
                color = 'gold'
            }else if (ranking === 2) {
                color = 'silver'
            }else if (ranking === 3) {
                color = 'brown'
            }
            return <Tag color={color}>{ranking}</Tag>
        }
    },
    {
        key: 'firstname',
        title: 'Firstname',
        dataIndex: 'firstname'
    },
    {
        key: 'lastname',
        title: 'Lastname',
        dataIndex: 'lastname'
    },
    {
        key: 'category',
        title: 'Category',
        dataIndex: 'category',
        render: (_, { gender, ageRange }) => {
            return (
                <>
                    {gender} {ageRange}
                </>
            )
        }
    },
    {
        key: 'score',
        title: 'Score',
        dataIndex: 'score'
    }
]

const LEADERBOARD = gql`
    query GetLeaederboard($firstname: String = "", $lastname: String = "", $categoryId: Int = null, $roundTypeId: Int = null) {
        getLeaderboard(input: {
            categoryId: $categoryId
            firstname: $firstname
            lastname: $lastname
            roundTypeId: $roundTypeId
        }) {
            archerId
            ranking
            firstname
            lastname
            ageRange
            gender
            score
            roundType
        },
        getCategories {
            id,
            gender,
            ageRange
        },
        getRoundTypes {
            id,
            name
        }
    }
`

const Leaderboard = () => {
    const { data, loading, refetch } = useQuery(LEADERBOARD);
    const [leaderboard, setLeaderboard] = useState([]);

    const onFinish = (target) => {
        refetch(target)
    }

    useEffect(() => {
        setLeaderboard([]);
        if(data) {
            data?.getLeaderboard?.map((e,i) => {
                setLeaderboard(prev => [... prev, {
                    key: i+1,
                    ... e
                }])
            })
        }

    },[data])
    return (
        <div className="w-full">
            <Row className="w-3/5 m-auto my-16">
                <Col span={24} className="flex justify-center items-center mb-8">
                    <Typography.Title level={2}>Leaderboard</Typography.Title>
                </Col>
                <Col span={24}>
                    <Form onFinish={onFinish} layout="vertical" className="w-4/5 m-auto">
                        <Row gutter={16} justify={'space-between'} className="w-full">
                            {/* <Col span={12}>
                                <Form.Item name={'firstname'} label="Firstname">
                                    <Input placeholder="Firstname"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={'lastname'} label="Lastname">
                                    <Input placeholder="Lastname"/>
                                </Form.Item>
                            </Col> */}
                            <Col span={24}>
                                <Form.Item name={'categoryId'} label="Category">
                                    <Select placeholder="Category" onChange={(value) => refetch({categoryId: value})}>
                                        <Select.Option value={null}>All</Select.Option>
                                    {
                                        data?.getCategories?.map((category, i) => 
                                        <Select.Option key={i} value={category?.id}>{category?.gender?.charAt(0) + category?.gender?.slice(1).toLowerCase()} {category?.ageRange}</Select.Option>)
                                    }
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item name={'roundTypeId'} label="Round Type">
                                    <Select placeholder="Round Type">
                                    {
                                        data?.getRoundTypes?.map((e,i) => <Select.Option key={i} value={e?.id}>{e?.name}</Select.Option>)
                                    }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button htmlType="submit" type="primary">Search</Button>
                            </Col> */}
                        </Row>
                    </Form>
                    <Divider/>
                </Col>

                <Col span={24}>
                    <Table rowClassName={(record) => record.archerId === parseInt(localStorage.getItem('userId'))  ? "bg-sky-200/75":""} dataSource={leaderboard ? leaderboard : null} loading={loading} columns={columns}/>
                </Col>
            </Row>
        </div>
    )
}

export default Leaderboard;