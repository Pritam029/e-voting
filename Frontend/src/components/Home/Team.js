import './CSS/team.css'
import { useEffect, React, useRef } from 'react';
import ScrollReveal from "scrollreveal";
import { SocialIcon } from 'react-social-icons'
import image1 from './CSS/image1.JPG'
import image2 from './CSS/image2.jpg'
import image3 from './CSS/image3.jpg'
import image4 from './CSS/image4.jpg'
import image5 from './CSS/image5.jpg'

const Team = () => {
    const revealRefBottom = useRef(null);
    const revealRefLeft = useRef(null);
    const revealRefTop = useRef(null);
    const revealRefRight = useRef(null);

    useEffect(() => {


        ScrollReveal().reveal(revealRefBottom.current, {

            duration: 1000,
            delay: 200,
            distance: '50px',
            origin: 'bottom',
            easing: 'ease',
            reset: 'true',
        });
    }, []);
    useEffect(() => {


        ScrollReveal().reveal(revealRefRight.current, {

            duration: 1000,
            delay: 200,
            distance: '50px',
            origin: 'right',
            easing: 'ease',
            reset: 'true',
        });
    }, []); useEffect(() => {


        ScrollReveal().reveal(revealRefLeft.current, {

            duration: 1000,
            delay: 200,
            distance: '50px',
            origin: 'left',
            easing: 'ease',
            reset: 'true',
        });
    }, []); useEffect(() => {


        ScrollReveal().reveal(revealRefTop.current, {

            duration: 1000,
            delay: 200,
            distance: '50px',
            origin: 'top',
            easing: 'ease',
            reset: 'true',
        });
    }, []);
    return (
        <div className="Team">
            <h2 ref={revealRefTop}> Our Team</h2>
            <div className='Team-Content'>
                <div className='Team-Content-Card' ref={revealRefLeft}>
                    <img src={image1} className='image'></img>
                    <h3>Abhijit Das | <span>DevOps Engineer</span></h3>
                    <p>Enthusiastic Software Developer currenly pursuing BTech in Information Technology,solid foundation in Data structure,python,CI/CD,Docker and cloud computing technology.</p>
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.linkedin.com/in/abhijit-das520" target='_blank' url="www.linkedin.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://github.com/Abhijit2003das" target='_blank' url="www.github.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.facebook.com/profile.php?id=100027811950663" target='_blank' url="www.facebook.com" />
                </div>

                <div className='Team-Content-Card' ref={revealRefTop}>
                    <img src={image2} className='image'></img>
                    <h3>Pritam Garai | <span>FULL Stack Developer</span></h3>
                    <p>Energetic Software Developer currenly pursuing BTech in Information Technology,proficient in C,Java,nodejs,javaScript,mongodb & react. Skilled in creating & developing interactive web features & applications.</p>
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.linkedin.com/in/pritamgarai029" target='_blank' url="www.linkedin.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://github.com/Pritam029" target='_blank' url="www.github.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.facebook.com/profile.php?id=100034699386441" target='_blank' url="www.facebook.com" />
                </div>

                <div className='Team-Content-Card' ref={revealRefRight}>
                    <img src={image3} className='image'></img>
                    <h3>Kushal Singha | <span>MERN Stack Developer</span></h3>
                    <p>Energetic Software Developer currenly pursuing BTech in Information Technology, proficient in C,Java,javaScript,mongodb & react. Skilled in creating interactive web features. </p>
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.linkedin.com/in/kushal-singha1004" target='_blank' url="www.linkedin.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://github.com/kushal1004" target='_blank' url="www.github.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.facebook.com/profile.php?id=100076125962563&mibextid=ZbWKwL" target='_blank' url="www.facebook.com" />
                </div>

            </div>

            {<div className='Team-Content'>

                {<div className='Team-Content-Card'>
                    <img src={image4} className='image'></img>
                    <h3>Tiyasa Saha | <span>Front-End Developer</span></h3>
                    <p>Enthusiastic Software Developer currenly pursuing BTech in Information Technology, proficient in Data Structure,Python,UI/UX and Java.Skilled in creating new interactive designs.</p>
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.linkedin.com/in/tiyasa-saha-b09607273" target='_blank' url="www.linkedin.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://github.com/Tiyasa7" target='_blank' url="www.github.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.facebook.com/profile.php?id=100077086213824&mibextid=ZbWKwL" target='_blank' url="www.facebook.com" />
                </div>}


                {<div className='Team-Content-Card'>
                    <img src={image5} className='image'></img>
                    <h3>Shrestha Chakraborty | <span>Front-End Developer</span></h3>
                    <p>Enthusiastic Software Developer currenly pursuing BTech in Information Technology, proficient in C,Python,UI/UX and C++.Skilled in creating new interactive Web features </p>
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.linkedin.com/in/shrestha-chakraborty-a43a94316" target='_blank' url="www.linkedin.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://github.com/Shrestha027" target='_blank' url="www.github.com" />
                    <SocialIcon className='SocialIcon' style={{ height: "30px", width: "30px" }} href="https://www.facebook.com/profile.php?id=100092995032087&mibextid=ZbWKwL" target='_blank' url="www.facebook.com" />
                </div>}
            </div>}
            <div style={{
                display: "none",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "medium",
            }}>          
            </div>

        </div>
    )
}
export default Team;