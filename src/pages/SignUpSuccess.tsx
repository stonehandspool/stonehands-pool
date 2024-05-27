import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpSuccess() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState<number>(20);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      navigate("/");
    }
  }, [timer]);

  return (
    <section className="section">
      <div className="container">
        <div className="notification is-success">
          <h1 className="title is-1">Success!</h1>
          <p>
            <b>
              Please remember your username and password for when you submit
              your pick sheets! Good luck!
            </b>
          </p>
          <p>
            <b>
              Please dont forget to check your email for an activation link, you
              will need to activate your account in order to participate in the
              pool. The email may be sent to your junk/spam folder.
            </b>
          </p>
          <p>
            This page will automatically redirect you to the home page in{" "}
            {timer} seconds
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUpSuccess;
