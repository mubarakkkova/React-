
function getUserCB(id, cb) {
    setTimeout(() => cb(null, { id, name: "User" + id }), 200);
}

function getOrdersCB(userId, cb) {
    setTimeout(() => {
        const chance = Math.random();
        if (chance < 0.3) return cb(null, []);
        if (chance < 0.4) return cb(new Error("DB failure"));
        cb(null, ["o1", "o2"]);
    }, 250);
}

function getRecsCB(userId, cb) {
    setTimeout(() => cb(null, ["r1", "r2", "r3"]), 180);
}


function promisify(fn) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, data) => err ? reject(err) : resolve(data));
      });
    };
}


const getUserP   = promisify(getUserCB);
const getOrdersP =promisify(getOrdersCB);
const getRecsP   = promisify(getRecsCB);


function runSequential() {
    console.log("— SEQUENTIAL —");
    return getUserP(1)
        .then(user => {
            console.log("user:", user);
            return getOrdersP(user.id).then(orders => ({ user, orders }));
        })
        .then(({ user , orders }) => {
            if (orders.length === 0){
                throw new Error("No orders");
            }
return getRecsP(user.id).then(recommendations => ({ user, orders, recommendations }));
        })
        .then(({ user, orders, recommendations }) => {
            console.log("final (sequential):", { user, orders, recommendations });
        })
        .catch(err => {
            console.error("Caught (sequential):", err.message);
        })
        .finally(() => {
            console.log("Done (sequential)");
        });
}


function runParallel() {
    console.log("— PARALLEL —");
    return getUserP(2)
        .then(user => {
            return Promise.all([getOrdersP(user.id), getRecsP(user.id)])
                .then(([orders, recommendations]) => ({ user, orders, recommendations }));
            //
        })
        .then(({ user, orders, recommendations }) => {
            console.log("final (parallel):", { user, orders, recommendations });
        })
        .catch(err => {
            console.error("Caught (parallel):", err.message);
        })
        .finally(() => {
            console.log("Done (parallel)");
        });
}


function runRaceOptional() {
    console.log("— RACE (optional) —");
    const p1 = new Promise(res => setTimeout(() => res("p1"), 120));
    const p2 = new Promise(res => setTimeout(() => res("p2"), 60));
    Promise.race([p1, p2]).then(winner => 
        console.log("race winner:", winner));
}


function runA2() {
    console.clear();
    console.log("Running A2 — Promises");


    runSequential()
        .then(() => runParallel())
        .then(() => runRaceOptional());
}


if (typeof window !== "undefined") {
  window.runA2 = runA2;
} else {
  runA2();
}