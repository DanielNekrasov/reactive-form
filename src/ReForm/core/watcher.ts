import Dep from './dep';

export default function watcher(myTargetFn) {
    Dep.target = myTargetFn;
    Dep.target();
    Dep.target = null;
}