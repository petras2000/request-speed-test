if ('serviceWorker' in navigator && location.href.indexOf("?sw=false") === -1) {
    navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
            // registration worked
            console.log(`Registration succeeded. Scope is ${reg.scope}`);
        }).catch((error) => {
        // registration failed
        console.log(`Registration failed with ${error}`);
    });

    navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage("onload");
    });
}

console.log(typeof InstallTrigger !== 'undefined' ? 'Your browser is Firefox' : 'Your browser is not Firefox');

// function for loading each image via XHR

/* Some throttling */
let text = "";
for (let i = 0; i < 1e7; i++) {
    text += i % 4;
}


/* Gets performance data */
function simplePerf() {
    const pe = performance.getEntries();
    for (let i = 0; i < pe.length; i++) {
        if (window.console) console.log("Name: " + pe[i].name +
            " Start Time: " + pe[i].startTime +
            " Duration: " + pe[i].duration + "n");
    }
}

function gad(url) {
    return performance.getEntriesByType('resource').find(x => x.name.includes(url)).duration
}

function me() {
    console.log(`JS_Visitor ${gad('js_visitor')}`)
    console.log(`Baqend ${gad('test')}`)
    console.log(`jQuery ${gad('jquery')}`)
    console.log(`evil ${gad('evil')}`)
    performance.getEntriesByType('resource').map(x=> x.initiatorType === 'img' && console.log(`Image ${x.name} ${x.duration}`))
}

document.addEventListener('DOMContentLoaded', () => {
    performance.getEntriesByType('navigation').map(x=> console.log(x));
})