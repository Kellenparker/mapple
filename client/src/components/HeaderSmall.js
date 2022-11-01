import "./styles/HeaderSmall.css";

const HeaderSmall = (props) => {
    return (
        <div className="header-wrap">
            <div className="header-small">
                <div className="header-content">
                    <strong className="title titlesm">Mapple</strong>
                    <div className="buttons buttonssm">
                        <div className="dash dashsm">-</div>
                        <button className="b bsm b1" onClick={props.toggleHelp}>
                            help
                        </button>
                        <div className="dash dashsm">-</div>
                        <button className="b bsm b1" onClick={props.toggleStats}>
                            stats
                        </button>
                        <div className="dash dashsm">-</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSmall;
