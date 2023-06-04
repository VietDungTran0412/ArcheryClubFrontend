import { gql, useQuery } from "@apollo/client";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GET_ARCHER_ROUND = gql`
query GetArcherRound($id: String!){
    getArcherRound(id: $id) {
        archer {
            id,
            firstname,
            lastname
        },
        category {
            ageRange,
            gender,
            
        },
        equipment {
            name
        },
        roundType {
            name
        },
        ends {
            score
        }
    }
}
`

const Result = () => {
    const { roundId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_ARCHER_ROUND, { context: {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    } ,variables: {
        id: roundId
    } })


    if(loading) {
        return(
            <div>Loading...</div>
        )
    }

    if(error) {
        return (<div>
            Not Found
        </div>)
    }
    return (
        <div className="p-12 shadow-xl-extra rounded w-3/5 m-auto my-24 flex flex-col items-center">
            <div className="flex justify-center items-center w-full">
                <Divider className="w-full">
                    <Typography.Title level={3}>Round's Result</Typography.Title>
                </Divider>
            </div>
            <Row gutter={[16,24]} justify={'space-between'} className="w-full px-24">
                <Col span={12}>
                    <div className="flex justify-between items-center w-full">
                        <Typography.Text className="text-base w-full text-zinc-500">Firstname:</Typography.Text>
                        <div className="w-full flex justify-start">
                            <Typography.Text className="text-base">{data?.getArcherRound?.archer?.firstname}</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="flex justify-between items-center w-full">
                        <Typography.Text className="text-base w-full text-zinc-500">Lastname:</Typography.Text>
                        <div className="w-full flex justify-start">
                            <Typography.Text className="text-base">{data?.getArcherRound?.archer?.lastname}</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="flex justify-between items-center w-full">
                        <Typography.Text className="text-lg w-full text-zinc-500">Category:</Typography.Text>
                        <div className="w-full flex justify-start">
                            <Typography.Text className="text-base">Male 60+</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="flex justify-between items-center w-full">
                        <Typography.Text className="text-base w-full text-zinc-500">Equipment:</Typography.Text>
                        <div className="w-full flex justify-start">
                            <Typography.Text className="text-base">{data.getArcherRound?.equipment?.name}</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="flex justify-between items-center w-full">
                        <Typography.Text className="text-base w-full text-zinc-500">Round Type:</Typography.Text>
                        <div className="w-full flex justify-start">
                            <Typography.Text className="text-base">{data.getArcherRound?.roundType?.name}</Typography.Text>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Divider/>
                    <div className="flex m-auto items-center justify-between" direction="horizontal">
                        <div className="w-full flex items-center justify-center">
                            <Typography className="text-xl">Final Score:</Typography>
                        </div>
                        <div className="w-full flex justify-center items-center">
                        <Typography className="text-xl">
                            {
                                data?.getArcherRound?.ends?.reduce((sum, cur) => sum + cur?.score, 0)
                            }
                        </Typography>
                        </div>
                    </div>
                    <div className="mt-8 w-2/5 mx-auto items-center flex justify-between">
                        <Button onClick={() => navigate('/')}>Back</Button>
                        <Button onClick={() => navigate('/record')} type="primary">New Round</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default Result;