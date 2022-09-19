setImmediate(() => {
    setImmediate(() => {
        log(10);
    });

    Promise.resolve(6).then(log);

    process.nextTick(log, 4);

    foo();

    log(3);
});

async function bar() {
    log(2);

    await Promise.resolve();

    log(7);
}

function foo() {
    log(1);

    bar();

    Promise.resolve(8).then(log);

    queueMicrotask(() => {
        log(9);
    });

    process.nextTick(log, 5);
}

function log(value) {
    console.log(value);
}
