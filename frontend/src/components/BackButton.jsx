import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
function BackButton()
{
    const navigate= useNavigate();

    return(
        <Button  style={{borderRadius:'0px'}}variant="primary" onClick={()=>navigate(-1)}>Back</Button>
    )
}


export default BackButton;