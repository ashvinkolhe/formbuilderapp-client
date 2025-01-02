import React, { Fragment } from 'react'
import styles from './LandingPage.module.css';
import {LeftImage, RightImage, Figure} from './../../assets/LandingPage/';
import { Logo } from '../../assets';
import ThemeComponent from '../../components/ThemeComponent/ThemeComponent';
import {useNavigate} from 'react-router-dom';
function LandingPage() {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <div onClick={()=>navigate("/")} className={styles.logo}>
                <img src={Logo} alt="logo" />
                <h2>FormBot</h2>
            </div>
            <div className={styles.navlinks}>
                <button onClick={()=>navigate("/signin")} className={styles.Button1}>Sign in</button>
                <button onClick={()=>navigate("/signin")} className={styles.Button2}>Create a FormBot</button>
            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.upper}>
                <div className={styles.upperLeft}>
                    <img src={LeftImage} alt="landingPageImage" />
                </div>
                <div className={styles.upperMiddle}>
                    <h1>Build advanced chatbots visually</h1>
                    <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them anywhere on your web/mobile apps and start collecting results like magic.</p>
                    <button onClick={()=>navigate("/signin")} className={styles.Button2}>Create a FormBot  for free</button>
                </div>
                <div className={styles.upperRight}>
                <img src={RightImage} alt="landingPageImage" />
                </div>
            </div>
            <div className={styles.orangeCircle}></div>
            <div className={styles.blueCircle}></div>
            <div className={styles.lower}>
                <img src={Figure} alt="landingPageImage" />
            </div>
        </div>
        <div className={styles.footer}>
            <div className={styles.column}>
                <div onClick={()=>navigate("/")} className={styles.Logo}>
                <img src={Logo} alt='logo'/> 
                <h6>FormBot</h6>
                </div>
                <p>Made with ❤️ by</p>
                <p>@cuvette</p>
            </div>
            <div className={styles.column}>
                <h6>Product</h6>
                <p><span>Status</span></p>
                <p><span>Documentation</span></p>
                <p><span>Roadmap</span></p>
                <p>Pricing</p>
            </div>
            <div className={styles.column}>
                <h6>Community</h6>
                <p><span>Discord</span></p>
                <p><span>Github repository</span></p>
                <p><span>Twitter</span></p>
                <p><span>Linkedin</span></p>
                <p>OSS Friends</p>
            </div>
            <div className={styles.column}>
                <h6>Company</h6>
                <p>About</p>
                <p>Contact</p>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    </div>
  )
}

export default LandingPage

export const ThemedLandingPage = ThemeComponent(LandingPage);