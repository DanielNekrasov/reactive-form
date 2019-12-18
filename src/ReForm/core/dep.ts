// Dependency class
export default class Dep {
    private subscribers: { (): void; }[];
    public static target: { (): void } | null;

    constructor() {
        this.subscribers = []
    }

    depend() {
        if (Dep.target && !this.subscribers.includes(Dep.target)) {
            this.subscribers.push(Dep.target);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}

Dep.target = null;
