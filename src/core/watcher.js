import Dep from './Dep.js';

export default function watcher(myTargetFn) {
    Dep.target = myTargetFn;
    Dep.target();
    Dep.target = null;
}