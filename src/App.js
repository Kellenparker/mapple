import "./App.css";
import Map from "./components/Map";
import HeaderBanner from "./components/HeaderBanner";
import HeaderSmall from "./components/HeaderSmall";
import Guess from "./components/Guess";
import React from "react";
import Help from "./components/Help";
import Stats from "./components/Stats";
import Share from "./components/Share";
import MapInfo from "./components/MapInfo";
import { loadData, saveData } from "./tools/Storage";
import { getTime, getMap } from "./tools/Api";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = loadData();
        console.log(this.data);
        this.state = {
            guesses: this.data.guesses,
            win: false,
            loss: this.data.loss,
            date: null,
            title: null,
            link: null,
            author: null,
            day: null,
            next: null,
            nextH: null,
            nextM: null,
            nextS: null,
            active: true,
            mapLoad: false,
            logoLoad: false,
            loader: true,
            info: true,
            infoShow: false,
            help: false,
            stats: false,
            share: false,
            first: this.data.firstVis,
            width: 0,
            height: 0,
            imgDim: null,
            long: false,
        };

        this.guessesRaw = [];

        if (this.data.completed) {
            this.handleCountdown();
        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.onFocusUpdate = this.onFocusUpdate.bind(this);
        this.handleCorrectGuess = this.handleCorrectGuess.bind(this);
        this.toggleStats = this.toggleStats.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        window.addEventListener("focus", this.onFocusUpdate);

        this.getYear()
            .then((res) => {
                this.setState({
                    date: parseInt(res.info[0]),
                    title: res.info[1],
                    link: res.info[2],
                    author: res.info[3],
                    day: res.day,
                    next: res.next,
                });
                if (this.data.day == null || this.data.day !== res.day) {
                    this.data.win = false;
                    this.data.loss = false;
                    this.data.day = res.day;
                    this.data.completed = false;
                    this.data.guesses = ["", "", "", "", ""];
                    this.data.currentGuess = 0;
                    saveData(this.data);
                    this.setState({
                        guesses: this.data.guesses,
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
        window.removeEventListener("focus", this.onFocusUpdate);
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            long: this.state.imgDim < window.innerHeight / window.innerWidth,
        });
    }

    onFocusUpdate() {
        console.log("here123");

        if (this.state.win) {
            clearInterval(this.countDown);
            this.handleCountdown();
        }
    }

    getTime = async () => {
        const response = await getTime();
        return response;
    };

    getYear = async () => {
        const response = await getMap();
        return response;
    };

    handleLoad = (e) => {
        let height = e.target.naturalHeight;
        let width = e.target.naturalWidth;
        let imageDim = height / width;
        let viewDim = this.state.height / this.state.width;
        this.setState({
            imgDim: imageDim,
            long: imageDim < viewDim,
        });
        this.setState({
            mapLoad: true,
        });
        if (this.data.win) {
            setTimeout(() => {
                this.setState({
                    win: true,
                });
            }, 500);
        }
        setTimeout(() => {
            this.setState({
                loader: false,
                infoShow: true,
            });
        }, 1000);
    };

    toggleInfo = () => {
        this.setState({
            info: !this.state.info,
        });
    };

    toggleHelp = () => {
        if (this.state.first) {
            this.setState({
                first: false,
            });
            this.data.firstVis = false;
            saveData(this.data);
        } else {
            this.setState({
                help: !this.state.help,
            });
        }
    };

    toggleStats = () => {
        this.setState({
            stats: !this.state.stats,
        });
    };

    toggleShare = () => {
        this.setState({
            share: !this.state.share,
        });
    };

    handleGuess = (cur, val, valNum) => {
        this.guessesRaw.push(valNum);
        let guessesCopy = [...this.state.guesses];
        guessesCopy[cur] = val;
        this.setState({
            guesses: guessesCopy,
        });
        this.data.currentGuess = cur + 1;
        this.data.guesses[cur] = val;
        this.data.totalDist += Math.abs(valNum - this.state.date);
        saveData(this.data);
    };

    handleCorrectGuess = (att) => {
        this.handleCountdown();
        this.setState({
            win: true,
            active: false,
        });
        this.data.wins++;
        this.data.total++;
        this.data.totalGuesses += att + 1;
        this.data.currentGuess = 0;
        this.data.completed = true;
        this.data.win = true;
        saveData(this.data);
    };

    handleLoss = (att) => {
        this.handleCountdown();
        this.setState({
            loss: true,
        });
        this.data.losses++;
        this.data.total++;
        this.data.totalGuesses += att;
        this.data.currentGuess = 0;
        this.data.completed = true;
        this.data.loss = true;
        saveData(this.data);
    };

    handleCountdown = () => {
        this.getTime().then((res) => {
            this.countdown(res.time);
        });
    };

    countdown = (time) => {
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        let now = new Date(time);
        let next = new Date(this.state.next);
        let distance = next - now;
        let dist = distance;
        this.countDown = setInterval(() => {
            console.log("here");
            distance = new Date(distance - 1000);
            dist = distance;
            let nextHour = Math.floor(dist / _hour);
            dist %= _hour;
            let nextMinute = Math.floor(dist / _minute);
            dist %= _minute;
            let nextSecond = Math.floor(dist / _second);
            this.setState({
                nextH: Math.max(nextHour, 0).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                }),
                nextM: Math.max(nextMinute, 0).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                }),
                nextS: Math.max(nextSecond, 0).toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                }),
            });
        }, 1000);
    };

    render() {
        return (
            <div className="App">
                <Map
                    num={this.state.day}
                    load={this.handleLoad}
                    loaded={this.state.mapLoad}
                    long={this.state.long}
                    width={this.state.width}
                />
                {this.state.loader ? (
                    <div id="loader">
                        <div id="loadlet">M</div>
                    </div>
                ) : (
                    <></>
                )}

                <div className="vin"></div>
                {this.state.width > 500 ? (
                    <HeaderBanner toggleHelp={this.toggleHelp} toggleStats={this.toggleStats} />
                ) : (
                    <HeaderSmall toggleHelp={this.toggleHelp} toggleStats={this.toggleStats} />
                )}
                <Guess
                    date={this.state.date}
                    data={this.data}
                    guesses={this.state.guesses}
                    setData={this.handleGuess}
                    active={this.state.active}
                    correctGuess={this.handleCorrectGuess}
                    loss={this.handleLoss}
                />
                {this.state.win || this.state.loss ? (
                    <div className="win-screen">
                        <div className="win-cont">
                            <h1 id="win-title">{this.state.loss ? "Better luck next time!" : "Congrats!"}</h1>
                            <h3 className="win-info">{"Next Mapple:"}</h3>
                            <h3 className="win-info">
                                {this.state.nextH === null
                                    ? ""
                                    : this.state.nextH + ":" + this.state.nextM + ":" + this.state.nextS}
                            </h3>
                            <div className="win-btns">
                                <button className="win-btn" onClick={this.toggleStats}>
                                    Stats
                                </button>
                                <button className="win-btn win-stats" onClick={this.toggleShare}>
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                {this.state.info && !(this.state.win || this.state.loss) ? (
                    <MapInfo
                        show={this.state.infoShow}
                        date={this.state.day}
                        toggle={this.toggleInfo}
                        title={this.state.title}
                        link={this.state.link}
                        author={this.state.author}
                    />
                ) : (
                    <></>
                )}
                {this.state.help || this.state.first ? <Help toggle={this.toggleHelp} /> : <></>}
                {this.state.stats ? <Stats toggle={this.toggleStats} data={this.data} /> : <></>}
                {this.state.share ? (
                    <Share
                        toggle={this.toggleShare}
                        guesses={this.guessesRaw}
                        date={this.state.date}
                        day={this.state.day}
                    />
                ) : (
                    <></>
                )}
            </div>
        );
    }
}

export default App;
