import "./styles/Dialog.css";
import "./styles/Share.css";

const getEmoji = (dist) => {
    if (dist < 5) return " 👏";
    else if (dist < 15) return " 🤌";
    else if (dist < 25) return " 🧐";
    else if (dist > 25) return " 🥴";
};

const Share = (props) => {
    let str = "Mapple " + props.day + " results: \n\n";
    props.guesses.forEach((guess) => {
        let dist = guess - props.date;
        if (dist === 0) {
            str += "0 years away 🎉🎉🎉";
        } else {
            str += Math.abs(dist);
            str += dist < 0 ? " years behind" : " years ahead";
            str += getEmoji(dist);
            str += "\n";
        }
    });
    str += "\n";
    str += "Try it here: mapple.kellenp.com";

    navigator.clipboard.writeText(str);
    return (
        <div className="dialogCont" onClick={props.toggle}>
            <div className="dialogBoxShare" onClick={(e) => e.stopPropagation()}>
                <p id="clip">Result copied to clipboard!</p>
                <button id="close" onClick={props.toggle}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Share;
