// Dependency class
export default class Dep {
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
