

function runA3(){
    console.clear();
    console.log("Running A3 — Event Loop (homework)");

    const EXPECTED = [
        "1 sync start",
        "2 sync end",
        "3 microtask: promise.then",
        "4 microtask: queueMicrotask",
        "5 microtask: nested",
        "6 timeout",
    ];

    const seen = [];
    const log = (msg) => { console.log(msg); seen.push(msg); };
        
    log("1 sync start");
        setTimeout(() => log("6 timeout"), 0);
        Promise.resolve().then(() => {
            log("3 microtask: promise.then");
            queueMicrotask(() => log("5 microtask: nested"));
        });
        queueMicrotask(() => log("4 microtask: queueMicrotask"));
    
    log("2 sync end");
    
    setTimeout(() => {
        const pass = EXPECTED.length === seen.length && EXPECTED.every((v, i) => v === seen[i]);
        console.log("---");
        console.log(pass ? " Order matches EXACTLY" : " Order does not match");
        if (!pass) {
            console.log("Expected:", EXPECTED);
            console.log("Got     :", seen);
        }
    }, 1);
}

window.runA3 = runA3;