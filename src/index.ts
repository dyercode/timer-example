import { BehaviorSubject, combineLatest, interval, Subject } from "rxjs";

let timer$ = interval(1000);
let step$: Subject<number> = new BehaviorSubject(0);

timer$.subscribe(() => console.log("tick"));

function getPotatoes(): HTMLSpanElement {
  return document.getElementById("potatoes") as HTMLSpanElement;
}

(document.getElementById("potato-butt") as HTMLInputElement).addEventListener(
  "change",
  (event) => {
    let nextStep = parseInt((<HTMLInputElement>event.target).value);
    if (nextStep !== undefined && nextStep !== null) {
      step$.next(nextStep);
    }
  }
);

combineLatest([step$, timer$]).subscribe(([step, _tick]) => {
  let currentPotatos: number = parseInt(getPotatoes().innerText) || 0;
  getPotatoes().innerText = (currentPotatos + step).toString();
});
