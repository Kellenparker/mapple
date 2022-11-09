import React from "react";
import "./styles/Guess.css";

class Guess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.MAX_YEAR_LENGTH = 4;
        this.MAX_GUESSES = 5;
        this.currentGuess = this.props.data.currentGuess;
        this.inputElement = React.createRef()

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.inputElement.current.onfocus = () => {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
        };
    }

    handleChange(event) {
        if (event.target.value.length <= this.MAX_YEAR_LENGTH) {
            this.setState({ value: event.target.value });
        }
    }

    getDistance(guess) {
        if (Math.abs(guess - this.props.date) === 0) return " ( Correct! )";
        else if (Math.abs(guess - this.props.date) < 5) return " ( < 5 years )";
        else if (Math.abs(guess - this.props.date) < 15) return " ( > 15 years )";
        else if (Math.abs(guess - this.props.date) < 25) return " ( < 25 years )";
        else if (Math.abs(guess - this.props.date) > 25) return " ( > 25 years )";
    }

    handleSubmit(event) {
        event.preventDefault();
        let nextVal = "";
        if (this.currentGuess + 2 > this.MAX_GUESSES) {
            this.props.loss(this.MAX_GUESSES);
        }
        if (this.state.value.length < 3) {
            return;
        }
        let formattedGuess = this.state.value + this.getDistance(this.state.value);
        this.props.setData(this.currentGuess, formattedGuess, this.state.value);
        if (parseInt(this.state.value) === this.props.date) {
            this.props.correctGuess(this.currentGuess);
            nextVal = this.state.value;
        }
        this.setState({
            value: nextVal,
        });
        this.currentGuess++;
    }

    render() {
        return (
            <section className="guessCont">
                <div className="guesses">
                    <h2 className="guessTitle">Guesses:</h2>
                    <ol className="guessList">
                        <li>&nbsp;{this.props.guesses[0]}</li>
                        <li>&nbsp;{this.props.guesses[1]}</li>
                        <li>&nbsp;{this.props.guesses[2]}</li>
                        <li>&nbsp;{this.props.guesses[3]}</li>
                        <li>&nbsp;{this.props.guesses[4]}</li>
                    </ol>
                </div>
                <form className="yearform" onSubmit={this.handleSubmit}>
                    <input
                        ref={this.inputElement}
                        maxLength={5}
                        className="yearfield"
                        type="tel"
                        value={this.state.value}
                        placeholder="Year"
                        onChange={this.handleChange}
                        disabled={!this.props.active}
                    />
                    <button className="subBtn" disabled={!this.props.active}>
                        Submit
                    </button>
                </form>
            </section>
        );
    }
}

export default Guess;
