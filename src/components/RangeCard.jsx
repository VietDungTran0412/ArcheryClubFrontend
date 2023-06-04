import { gql, useMutation } from "@apollo/client";
import { Button, Col, Divider, Form, Input, Modal, Row, Select, Space, Tag, Typography, notification } from "antd";
import { useEffect, useState } from "react";

const ADD_SCORE = gql`
    mutation AddScore($roundId: String!, $scores: ScoreInput!){
        addScore(end: {
            roundId: $roundId,
            scores: $scores
        }) {
            archer {
                id
            },
            ends {
                score
            }
        }
    }
`

const list = [1,2,3,4,5,6];

const helper = (endNumber, target) => {
    let sum = 0;
    for(let i = 0; i < 6; i++) {
        if(target[`end${endNumber}arrow${i+1}`]) {
            sum += target[`end${endNumber}arrow${i+1}`];
        }
    }
    return sum;
}

const RangeCard = ({ face, distance, endCount, count, roundId }) => {
    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);
    const [score, setScore] = useState(0);
    const [addScore, {loading, data, error}] = useMutation(ADD_SCORE, {context: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }})


    const onFinish = (target) => {
        console.log(target['end1arrow1'])
        const submission = {
            end1: helper(1, target),
            end2: helper(2, target),
            end3: helper(3, target),
            end4: helper(4, target),
            end5: helper(5, target),
            end6: helper(6, target)
        }
        addScore({variables: {
            roundId: roundId,
            scores: submission
        }});
        setScore(submission.end1 + submission.end2 + submission.end3 + submission.end4 + submission.end5 + submission.end6);
    }


    useEffect(()=> {
        if(data) {
            setDone(true);
            setOpen(false);
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: 'Unexpected error during transaction'
            })
        }
    }, [data, error])

    if(error) {
        return (
            <>error</>
        )
    }

    return (
        <Space className="border-solid rounded border-gray-600 w-72" direction="vertical">
            <div className="m-4">
                <div className="font-black text-xl">Range {count}</div>
                <Divider className="m-0"/>
                <Row gutter={[12, 16]} className="mt-4">
                    <Col span={12}>
                        <Typography.Text>Face: {face}cm</Typography.Text>
                    </Col>
                    <Col span={12}>
                        <Typography.Text>Distance: {distance}m</Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Typography.Text>Number of ends: {endCount}</Typography.Text>
                    </Col>
                </Row>
            </div>
            <Space className="bg-gray-200 w-full p-1 mt-4 pr-4 pl-2 flex justify-between items-center">
                {
                    done ? <Tag color="green">Completed</Tag> : <Button onClick={() => setOpen(true)} type="primary">Start Range</Button>
                }

                <Typography.Text>Score: {score}</Typography.Text>
            </Space>
            <Modal width={800} wrapClassName="h-full" open={open} footer={null} onCancel={()=> setOpen(false)}>
                <Form onFinish={onFinish} className="m-12" layout="vertical">
                    <Divider>Range Score Form</Divider>
                    <Row>
                        <Col className="mb-4" span={24}>
                            <Typography.Paragraph type="warning">
                                *Note that it is required to fill the form and submit. Otherwise, the score will not be recorded!
                            </Typography.Paragraph>
                        </Col>
                        <Col span={24}>
                            <Typography.Title level={4}>End: 1#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item label={`Arrow: ${e}#`} rules={[{required: true, message: 'Input is required!'}]} name={`end1arrow${e}`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                        </Col>
                        <Col span={24}>
                        <Typography.Title level={4}>End: 2#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item key={i} label={`Arrow: ${e}#`} rules={[{required: true, message: 'Input is required!'}]} name={`end2arrow${e}`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                        </Col>
                        <Col span={24}>
                        <Typography.Title level={4}>End: 3#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item rules={[{required: true, message: 'Input is required!'}]} name={`end3arrow${e}`} key={i} label={`Arrow: ${e}#`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                        </Col>
                        <Col span={24}>
                        <Typography.Title level={4}>End: 4#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item rules={[{required: true, message: 'Input is required!'}]} name={`end4arrow${e}`} key={i} label={`Arrow: ${e}#`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                        </Col>
                        <Col span={24}>
                        <Typography.Title level={4}>End: 5#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item rules={[{required: true, message: 'Input is required!'}]} name={`end5arrow${e}`} key={i} label={`Arrow: ${e}#`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                        </Col>
                        {
                            endCount === 5 ? null :
                             (
                                <Col span={24}>
                            <Typography.Title level={4}>End: 6#</Typography.Title>
                            <Row gutter={12}>
                            {
                                list.map((e,i) => {
                                    return (
                                        <Col key={i} span={8}>
                                        <Form.Item rules={[{required: true, message: 'Input is required!'}]} name={`end6arrow${e}`} key={i} label={`Arrow: ${e}#`}>
                                            <Select placeholder="Arrow Score">
                                                <Select.Option value={0}>M</Select.Option>
                                                <Select.Option value={1}>1</Select.Option>
                                                <Select.Option value={2}>2</Select.Option>
                                                <Select.Option value={3}>3</Select.Option>
                                                <Select.Option value={4}>4</Select.Option>
                                                <Select.Option value={5}>5</Select.Option>
                                                <Select.Option value={6}>6</Select.Option>
                                                <Select.Option value={7}>7</Select.Option>
                                                <Select.Option value={8}>8</Select.Option>
                                                <Select.Option value={9}>9</Select.Option>
                                                <Select.Option value={10}>10</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        </Col>
                                    )

                                })
                            }
                            </Row>
                                </Col>
                             ) 
                        }

                        <Col span={24}>
                            <Button loading={loading} htmlType="submit" className="w-full" type="primary">Confirm & Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </Space>
    )
}

export default RangeCard;