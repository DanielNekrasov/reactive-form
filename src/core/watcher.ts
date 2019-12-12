import Dep from './Dep';

export default function watcher(myTargetFn) {
    Dep.target = myTargetFn;
    Dep.target();
    Dep.target = null;
}