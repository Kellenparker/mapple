import React from "react";
import { TransformWrapper, TransformComponent } from "@pronestor/react-zoom-pan-pinch";
import "./styles/Map.css";

const Map = (props) => {

    return (
        <TransformWrapper wheel={{ step: (0.1) }} maxScale={6 * (1200 / props.width)} className="map-wrapper">
            <TransformComponent className="map-container">
                <div className="map-outer">
                    <img
                        id={props.loaded ? (props.long ? "map-w" : "map-h") : "map-hidden"}
                        alt="map"
                        src={"https://geologicle.s3.amazonaws.com/" + props.num + "/map.jpg"}
                        onLoad={props.load}
                        width="auto"
                    />
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
};

export default Map;
