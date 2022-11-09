import "./styles/HeaderSmall.css";

const HeaderSmall = (props) => {
    return (
        <div className="header-wrap">
            <div className="header-small">
                <div className="header-content">
                    <strong className="title titlesm">Mapple</strong>
                    <div className="buttons buttonssm">
                        <button className="b bsm b1" onClick={props.toggleHelp}>
                            Help
                        </button>
                        <button className="b bsm b1" onClick={props.toggleStats}>
                            Stats
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSmall;
