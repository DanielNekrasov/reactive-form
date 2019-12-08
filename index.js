// Dependency class
function Dep(){
    this.subscribers = [];
}

Dep.prototype.depend = function() {
    if(target && !this.subscribers.includes(target)){
        this.subscribers.push(target);
    }
}

Dep.prototype.notify = function() {
    this.subscribers.forEach(sub => sub())
}

let target = null;

// Watcher function
function watcher(myTargetFn){
    target = myTargetFn
    dep.depend();
    target();
    target = null;
}


let quantity = 5;
let price = 10;
let total = 0;

const dep = new Dep();
watcher(() => total = quantity * price)

console.log(total);
quantity = 10;
dep.notify();
console.log(total);
