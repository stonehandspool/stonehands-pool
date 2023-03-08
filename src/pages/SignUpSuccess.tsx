import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpSuccess() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState<number>(10);
    
    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            navigate('/');
        }
    }, [timer]);

    return (
        <section className='section'>
            <div className='container'>
                <div className='notification is-success'>
                    <h1 className='title is-1'>Success!</h1>
                    <p>Please remember your username and password for when you submit your pick sheets! Good luck!</p>
                    <p>This page will automatically redirect you to the home page in {timer} seconds</p>
                </div>
            </div>
        </section>
    );
}

export default SignUpSuccess;