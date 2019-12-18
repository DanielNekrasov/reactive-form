import Dep from './dep';

export default function watcher(myTargetFn: { (): void }) {
    Dep.target = myTargetFn;
    Dep.target();
    Dep.target = null;
}