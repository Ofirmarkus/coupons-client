import "./Loading.css";
import loadingImage from "../../../Assets/Images/YlWC.gif"

function Loading(): JSX.Element {
    return (
        <div className="Loding">
			<img src={loadingImage} />
        </div>
    );
}

export default Loading;
