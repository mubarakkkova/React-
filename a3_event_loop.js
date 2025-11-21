function runA3(){
    console.clear();
    console.log("Running A3 — Event Loop (homework)");

    const EXPECTED = [ // список строк в ожидаемом порядке
        "1 sync start",
        "2 sync end",
        "3 microtask: promise.then",
        "4 microtask: queueMicrotask",
        "5 microtask: nested",
        "6 timeout",
    ];

    const seen = []; // seen будет хранить реальный порядок
    const log = (msg) => { console.log(msg); seen.push(msg); }; // log и выводит в консоль, и складывает строку в seen
        
    log("1 sync start"); // синхронный лог 1 сразу попадает в seen[0]
    setTimeout(() => log("6 timeout"), 0); // макрозадача (Task) в очередь на следующий тик, выолнится после микро
    Promise.resolve().then(() => { //планирует микрозадачу
     log("3 microtask: promise.then");
     queueMicrotask(() => log("5 microtask: nested")); //добавим ещё одну микрозадачу
        });
        queueMicrotask(() => log("4 microtask: queueMicrotask"));
    
    log("2 sync end");
    
    setTimeout(() => {
        const pass = EXPECTED.length === seen.length && EXPECTED.every((v, i) => v === seen[i]); //Сравнивает seen с EXPECTED и печатает совпало/не совпало
        console.log("---");
        console.log(pass ? " Order matches EXACTLY" : " Order does not match");
        if (!pass) {
            console.log("Expected:", EXPECTED);
            console.log("Got     :", seen);
        }
    }, 1);
}

window.runA3 = runA3;