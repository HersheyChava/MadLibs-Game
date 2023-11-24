import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();

    const startButtonClicked = () => {
        console.log("buttonclicked");
        navigate('/Game')
    };

    return (
            <>
                <h2>Welcome to Madlibs!!</h2>
                <button type="button" onClick={startButtonClicked}>Start</button>
            </>
          );
}
export default Home;