import { Navigate, Outlet, useLocation } from "react-router-dom";
import {Steps } from "antd";
import CreateRound from "./CreateRound";
import useMediaQuery, { MediaQueryKey } from 'use-media-antd-query';
import { useEffect, useState } from "react";
import ScoreRecorder from "./ScoreRecorder";

const Recorder = () => {
    const media = useMediaQuery();
    const [current, setCurrent] = useState(1);
    const { pathname } = useLocation();
    const [round, setRound] = useState(-1);
    

    useEffect(() => {
        if(pathname === '/record' ) {
            setCurrent(0);
        }else {
            setCurrent(1);
        }
    }, [pathname])
    
    if(!localStorage.getItem('accessToken')) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={`flex flex-col justify-center m-auto items-center ${['xs','sm','md'].includes(media) ? 'w-full' : 'w-3/5'}`}>
            {/* <div className="my-16 w-full flex flex-wrap justify-center items-center">
                <Divider className="w-full">
                    <Typography.Title className="w-full" level={3}>Archery Scorer Recorder</Typography.Title>
                </Divider>
            </div> */}
            <Steps
                className="mt-24 mb-12"
                progressDot
                current={current}
                direction="horizontal"
                items={[
                    {
                        title:'Create Round',
                    }, 
                    {
                        title: 'Enter score'
                    }
                ]}
            />
            {
                current === 0 ? <CreateRound setRound={setRound} current={current} setCurrent={setCurrent}/> : <ScoreRecorder roundId={round}/>
            }
        </div>
    )
}


export default Recorder;