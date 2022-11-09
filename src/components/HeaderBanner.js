import "./styles/HeaderRibbon.css";

const HeaderBanner = (props) => {
    return (
        <div className="header-ribbon">
            <div className="non-semantic-protector">
                <h1 className="ribbon">
                    <div className="ribbon-content">
                        <strong className="title">Mapple</strong>
                        <div className="buttons">
                            <button className="b b1" onClick={props.toggleHelp}>
                                Help
                            </button>
                            <button className="b b1" onClick={props.toggleStats}>
                                Stats
                            </button>
                        </div>
                    </div>
                </h1>
            </div>
        </div>
    );
};

export default HeaderBanner;
