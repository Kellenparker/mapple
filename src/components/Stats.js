import "./styles/Dialog.css";
import "./styles/Stats.css";

const Stats = (props) => {
    const wins = props.data.wins;
    const losses = props.data.losses;
    const total = props.data.total;
    const avGuesses = props.data.totalGuesses / props.data.total;
    const avGuessDist = props.data.totalDist / props.data.totalGuesses;

    return (
        <div className="dialogCont" onClick={props.toggle}>
            <div className="dialogBoxStats " onClick={(e) => e.stopPropagation()}>
                <h3 className="statsTitle">Stats</h3>
                <div className="statCont">
                    <p className="stat">Wins: </p>
                    <p className="statVal">{wins}</p>
                </div>
                <div className="statCont">
                    <p className="stat">Losses: </p>
                    <p className="statVal">{losses}</p>
                </div>
                <div className="statCont">
                    <p className="stat">Total Games: </p>
                    <p className="statVal">{total}</p>
                </div>
                <div className="statCont">
                    <p className="stat">Avg. Guesses: </p>
                    <p className="statVal">{(!isFinite(avGuesses) || isNaN(avGuesses)) ? "N/A" : avGuesses.toFixed(2)}</p>
                </div>
                <div className="statCont">
                    <p className="stat">Avg. Guess Distance: </p>
                    <p className="statVal">{(!isFinite(avGuessDist) || isNaN(avGuessDist)) ? "N/A" : avGuessDist.toFixed(2)}</p>
                </div>
                <button id="close" onClick={props.toggle}>Close</button>
            </div>
        </div>
    );
};

export default Stats;
