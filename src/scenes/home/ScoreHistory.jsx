import { gql, useQuery } from "@apollo/client";
import { Button, Table, Typography } from "antd"
import { useEffect, useState } from "react";

const cols = [
    {
        key: 'createdDate',
        title: 'Created Date',
        dataIndex: 'createdDate'
    },
    {
        key: 'category',
        title: 'Category',
        dataIndex: 'category',
        render: (_, {category}) => <>{category?.gender} {category?.ageRange}</>
    },
    {
        key: 'equipment',
        title: 'Equipment',
        dataIndex: 'equipment',
        render: (_, {equipment}) => <>{equipment?.name}</>
    },
    {
        key: 'roundType',
        title: 'Round Type',
        render: (_, {roundType}) => <>{roundType?.name}</>
    },
    {
        key: 'score',
        title: 'Score',
        dataIndex: 'score',
        render: (_, {ends}) => {
            return ends?.reduce((prev, cur) => prev + cur?.score,0);
        }
    }
]

const ARCHER_BY_ID = gql`
    query GetArcherById($id: Int!){
        getArcherById(id: $id) {
            archerRounds {
                createdDate
                category {
                    ageRange
                    gender
                }
                equipment {
                    name
                }
                roundType {
                    name
                }
                ends {
                    score
                }

            }
        }
    }
`


const ScoreHistory = () => {
    const { data, loading, error } = useQuery(ARCHER_BY_ID, { variables: {
        id: parseInt(localStorage.getItem('userId'))
    },
    context: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }})

    const [round, setRound] = useState([]);

    useEffect(() => {
        if(data) {
            data?.getArcherById?.archerRounds.map((e,i) => {
                setRound(prev => [{
                    key: i,
                    ...e
                }, ...prev])
            })
        }
    },[data])

    return (
        <div className="w-4/5 m-auto">
            {
                error ? (
                    <div className="flex justify-center items-center flex-col">
                        <Typography.Text>You have to log in!</Typography.Text>
                        <Button type="primary">Log In</Button>
                    </div>
                ) :  <Table loading={loading} dataSource={round} columns={cols}/>
            }

        </div>
    )
}


export default ScoreHistory