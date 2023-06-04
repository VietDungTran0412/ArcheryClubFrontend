import { Typography } from "antd";

const About = () => {
    return (
        <div className="w-4/5 m-auto">
            <Typography.Paragraph className="text-justify">
                Welcome to our Archery club, a community of passionate archers dedicated to the art and sport of archery. 
                Whether you're a beginner looking to learn the basics or an experienced archer seeking a supportive and competitive environment, 
                our club offers a welcoming and inclusive space for archery enthusiasts of all levels. 
            </Typography.Paragraph>
            <Typography.Paragraph className="text-justify">
                    We provide state-of-the-art facilities, professional 
                coaching, and a vibrant community where you can hone your skills, connect with fellow archers, and embrace the thrill of the sport. Join us as we embark on this journey of precision, focus, and camaraderie. 
                Together, let's aim for excellence and hit the bullseye!
            </Typography.Paragraph>
            <Typography.Paragraph className="text-justify font-extrabold text-red-500" >
                Due to security purpose and for better experience, you need to log in to be authorized before using wonderful features of the club
            </Typography.Paragraph>
            <img src="../../assets/archery-header.jpeg" alt="" />
        </div>
    )
}

export default About;