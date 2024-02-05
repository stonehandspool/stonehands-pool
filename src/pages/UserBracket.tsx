import { useParams } from "react-router-dom";

function UserBracket() {
    const { username } = useParams();
    console.log('hi', username);
    return (
        <>hi {username}</>
    );
}

export default UserBracket;