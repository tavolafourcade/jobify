import main from '../assets/images/main.svg'
import Logo from '../components/Logo'
import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                    I'm baby deep v unicorn PBR&B post-ironic. 
                    Echo park jean shorts trust fund, mustache af pabst microdosing master cleanse hella knausgaard adaptogen 
                    crucifix meggings yuccie fam. 
                    Raclette four loko mixtape crucifix helvetica swag tumeric keffiyeh 
                    unicorn keytar. 
                    </p> 
                    <button className='btn btn-hero'>Login/Register</button>
                </div>  
                <img src={main} alt='job hunt' className='img main-img'/>
  
            </div>
        </Wrapper>
    )
}

export default Landing
