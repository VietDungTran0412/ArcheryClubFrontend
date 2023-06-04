import { Button, Col, Descriptions, Form, Row } from "antd";
import RangeCard from "../../components/RangeCard";
import useMediaQuery from 'use-media-antd-query'
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GET_ROUND = gql`
    query GetArcherRound($id: String!){
        getArcherRound(id: $id) {
            archer {
                id,
                firstname,
                lastname
            },
            equipment {
                name
            },
            category {
                ageRange,
                gender,
            },
            roundType {
                name,
                ranges {
                    face {
                        target
                    },
                    distance {
                        length
                    },
                    endCount
                }
            }
        }
    }
`

const ScoreRecorder = ({ roundId }) => {
    const media = useMediaQuery();
    const navigate = useNavigate();
    const query = useQuery(GET_ROUND, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        },
        variables :{
            id: roundId
        }
    })

    if(query?.loading) {
        return <div>Loading</div>
    }

    if(query?.error) {
        return <div>Not Found</div>
    }



    return (
            <Row gutter={[24,16]} className='w-full'>
                <Col span={24} className="px-24">
                    <Descriptions bordered layout="vertical"  className="m-auto mb-12">
                        <Descriptions.Item label="name">{query?.data?.getArcherRound?.archer?.firstname} {query?.data?.getArcherRound?.archer?.lastname}</Descriptions.Item>
                        <Descriptions.Item label="Equipment">{query?.data?.getArcherRound?.equipment?.name}</Descriptions.Item>
                        <Descriptions.Item label="Category">{query?.data?.getArcherRound?.category?.gender} {query?.data?.getArcherRound?.category?.ageRange}</Descriptions.Item>
                    </Descriptions>
                </Col>
                {
                    query?.data?.getArcherRound?.roundType?.ranges?.map((e,i) => (
                        <Col key={i} xs={{span: 24}} sm={{span: 24}} md={{span: 12}} lg={{span: 12}} xl={{span: 12}} xxl={{span: 8}} className="mb-8 flex justify-center items-center">
                            <RangeCard roundId={roundId} face={e?.face?.target} distance={e?.distance?.length} count={i+1} endCount={e?.endCount}/>
                        </Col>
                    ))
                }
                <Col span={24} className="w-full flex justify-center items-center">
                    <Button onClick={() => navigate(`result/${roundId}`)} className={ `mt-8 mb-32 ${['sm','xs','md'].includes(media) ? 'w-3/5' : 'w-full'}`} type="primary">Confirm and Go to Result</Button>
                </Col>
            </Row>
    )
}


export default ScoreRecorder;

