import { BehaviorSubject, combineLatest, interval, Subject } from "rxjs";
import { take } from "rxjs/operators";

let timer$ = interval(1000);
let step$: Subject<number> = new BehaviorSubject(0);
let potatoes$ = new BehaviorSubject(0);

timer$.subscribe(() => console.log("tick"));

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
  if (p > 0) {
    getBasket().innerText = "🥔".repeat(p);
  } else {
    getBasket().innerText = "🥕".repeat(Math.abs(p));
  }
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

timer$.subscribe(() => {
  combineLatest([potatoes$, step$])
    .pipe(take(1))
    .subscribe(([curr, step]) => potatoes$.next(curr + step));
});
