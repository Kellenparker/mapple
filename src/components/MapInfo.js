import "./styles/Dialog.css";
import "./styles/MapInfo.css";

const MapInfo = (props) => {
    const title = (
        <a href={props.link} target="_blank" rel="noreferrer">
            {props.title}
        </a>
    );
    const cc = (
        <a href="https://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank" rel="noreferrer">
            CC BY-NC-SA 3.0.
        </a>
    );
    return (
        <div className={"dialogCont" + (!props.show ? " hide" : " show")} onClick={props.toggle}>
            <div className="dialogBoxInfo" onClick={(e) => e.stopPropagation()}>
                <h3 className="infoTitle">Today's Map</h3>
                <img id="thumbnail" alt="map" src={"https://geologicle.s3.amazonaws.com/" + props.date + "/map-mini.jpg"} />
                <p className="attribution">
                    {"“"}
                    {title}
                    {"”"}<br/>{"by " + props.author + " is licensed under "}
                    {cc}
                </p>
                <button id="close" onClick={props.toggle}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default MapInfo;
