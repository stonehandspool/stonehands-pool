import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PickSheetSuccess() {
    const navigate = useNavigate();
    const [timer, setTimer] = useState<number>(5);
    
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
        <div className='page success'>
            <h1>Success!</h1>
            <p>Thank you for your submission, a copy of your picksheet will be sent to your email. Good luck!</p>
            <p>This page will automatically redirect you to the home page in {timer} seconds</p>
        </div>
    );
}

export default PickSheetSuccess;