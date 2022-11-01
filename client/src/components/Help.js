import "./styles/Dialog.css";
import "./styles/Help.css";

const Help = (props) => {
    const br = <br className="helpbr"/>;
    return (
        <div className="dialogCont" onClick={props.toggle}>
            <div className="dialogBoxHelp" onClick={(e) => e.stopPropagation()}>
                <h3 className="helpIntro">Welcome to</h3>
                <h1 className="helpTitle">Mapple</h1>
                <p className="desc">
                    The goal of Mapple is to guess the year that the map displays. You will get five attempts to guess
                    the correct year. You will recieve a hint about how close your guess is to the correct year. The
                    list of hints are as follows:
                </p>
                <div className="hintCont">
                    <p className="desc hint">{"1. Greater than 25 years away "}{br}{"( > 25 years )"}</p>
                    <p className="desc hint">{"2. Less than 25 years away "}{br}{"( < 25 years )"}</p>
                    <p className="desc hint">{"3. Less than 15 years away "}{br}{"( < 15 years )"}</p>
                    <p className="desc hint">{"4. Less than 5 years away "}{br}{"( < 5 years )"}</p>
                </div>
                <p className="desc">You can also keep track of your stats by pressing the stats button.</p>
                <div className="endCont">
                    <p className="desc-end">Made by: Kellen Parker</p>
                    <p className="desc-end-link">~ GitHub ~</p>
                </div>
                <button id="close" onClick={props.toggle}>Close</button>
            </div>
        </div>
    );
};

export default Help;
