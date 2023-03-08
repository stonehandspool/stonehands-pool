import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PickSheetSuccess() {
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
            <div className='columns is-centered'>
                <div className='column is-narrow'>
                    <div className='box'>
                    <h1 className='title has-text-centered'>Success!</h1>
                    <p>Thank you for your submission, a copy of your picksheet will be sent to your email. Good luck!</p>
                    <br />
                    <p>This page will automatically redirect you to the home page in {timer} seconds</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PickSheetSuccess;