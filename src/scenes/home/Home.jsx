import { Space, Tabs } from "antd";
import About from "./About";
import { heroTextureImports } from "../../utils/imageUtils";
import Rule from "./Rule";
import ScoreHistory from "./ScoreHistory";


const Home = () => {
    return (
        <div className="w-screen h-screen">
            {
                Object.values(heroTextureImports).map((texture, index) => {
                    return (
                        <div key={index}>
                            <img key={index} src={texture} className="w-screen h-96" alt={`img-${index}`} />
                        </div>
                    )
                })
            }
            <Space direction="vertical" className="w-full my-12">
                <Tabs centered defaultActiveKey="1" className="w-3/5 flex m-auto" items={[
                    {
                        label: "About",
                        key: 1,
                        children: <About/>
                    },
                    {
                        label: "Game Rules",
                        key: 2,
                        children: <Rule/>
                    },
                    {
                        label: "History",
                        key: 3,
                        children: <ScoreHistory/>
                    },

                ]} />
            </Space>
        </div>
    )
}

export default Home;