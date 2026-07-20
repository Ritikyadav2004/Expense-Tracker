import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
function BackButton()
{
    const navigate= useNavigate();

    return(
        <Button variant="primary" onClick={()=>navigate(-1)}>Back</Button>
    )
}


export default BackButton;