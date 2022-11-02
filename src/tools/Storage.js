

export function loadData() {
    let data = {};
    if(window.localStorage.getItem('data') === null){
        data = {
            wins: 0,
            losses: 0,
            total: 0,
            totalGuesses: 0,
            totalDist: 0,
            firstVis: true,
            currentGuess: 0,
            guesses: ["", "", "", "", ""],
            completed: false,
            win: false,
            loss: false,
            day: null
        };
        window.localStorage.setItem('data', JSON.stringify(data));
    }
    else{
        data = window.localStorage.getItem('data');
        data = JSON.parse(data);
    }
    return data;
}

export function saveData(data) {
    window.localStorage.setItem('data', JSON.stringify(data));
}