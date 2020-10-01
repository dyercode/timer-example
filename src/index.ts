import { BehaviorSubject, combineLatest, interval, Subject } from "rxjs";
import { take } from "rxjs/operators";

let timer$ = interval(1000);
let step$: Subject<number> = new BehaviorSubject(0);
let potatoes$ = new BehaviorSubject(0);

function getPotatoes(): HTMLSpanElement {
  return document.getElementById("potatoes") as HTMLSpanElement;
}

function getBasket(): HTMLParagraphElement {
  return document.getElementById("basket") as HTMLParagraphElement;
}

potatoes$.subscribe((p) => {
  getPotatoes().innerText = p.toString();
});

potatoes$.subscribe((p) => {
  getBasket().innerText = p > 0 ? "🥔".repeat(p) : "🥕".repeat(Math.abs(p));
});

(document.getElementById("potato-butt") as HTMLInputElement).addEventListener(
  "change",
  (event) => {
    let nextStep = parseInt((<HTMLInputElement>event.target).value);
    if (nextStep !== undefined && nextStep !== null) {
      step$.next(nextStep);
    }
  }
);

timer$.subscribe(() => console.log("tick"));

timer$.subscribe(() => {
  combineLatest([potatoes$, step$])
    .pipe(take(1))
    .subscribe(([curr, step]) => potatoes$.next(curr + step));
});
