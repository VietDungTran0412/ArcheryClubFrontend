import {Col, Row, Space, notification} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBullseye} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';

const LOGOUT = gql`
    mutation LogOut{
        logout
    }
`

const NavBar = () => {
    const navigate = useNavigate();
    const [logout, {data, error}] = useMutation(LOGOUT, {
        context: {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    })

    useEffect(() => {
        if(data) {
            notification.success({
                message: 'Success',
                description: data?.logout
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userId')
            navigate('/')
        }
        if(error) {
            notification.error({
                message: 'Error',
                description: 'Unexpected error during transaction!'
            })
            localStorage.removeItem('accessToken')
            navigate('/')
        }
    },[data, error])

    const doLogout = async () => {
        logout();
    }

    return (
        <Row justify={'space-between'} className='w-screen left-0 top-0 bg-zinc-100/70 h-12'>
            <Col span={8} className='flex justify-center items-center m-2'>
                <div className='text-3xl'>Archery</div>

            </Col>
            <Col span={10} className='flex flex-row justify-between items-center h-full'>
                <Space onClick={() => navigate('/')} direction='vertical' className='h-full flex justify-center items-center w-full hover:bg-zinc-200 hover:cursor-pointer'>
                    Home
                </Space>
                <Space onClick={() => navigate('leaderboard')} direction='vertical' className='h-full flex justify-center items-center w-full hover:bg-zinc-200 hover:cursor-pointer'>
                    Leaderboard
                </Space>
                <Space onClick={() => navigate('record')} direction='vertical' className='h-full flex justify-center items-center w-full hover:bg-zinc-200 hover:cursor-pointer'>
                    Recorder
                </Space>

                {
                    !localStorage.getItem('accessToken') ?
                        <Space onClick={() => navigate('login')} direction='vertical' className='h-full flex justify-center items-center w-full hover:bg-zinc-200 hover:cursor-pointer'>
                            Sign In
                        </Space>
                        :                         
                    <Space onClick={doLogout} direction='vertical' className='h-full flex justify-center items-center w-full hover:bg-zinc-200 hover:cursor-pointer'>
                        Sign Out
                    </Space>
                }

            </Col>
        </Row>
    )
}

export default NavBar