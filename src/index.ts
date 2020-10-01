import { BehaviorSubject, interval } from "rxjs";

let timer = interval(1000);
let step = new BehaviorSubject(0);

timer.subscribe(() => console.log("tick"));

function getPotatoes(): HTMLSpanElement {
  return document.getElementById("potatoes") as HTMLSpanElement;
}

let pps = document.getElementById("potato-butt") as HTMLInputElement;

pps.addEventListener("change", (event) => {
  let nextStep = parseInt((<HTMLInputElement>event.target).value);
  if (nextStep !== undefined && nextStep !== null) {
    step.next(nextStep);
  }
});

timer.subscribe(() => {
  let currentPotatos: number = parseInt(getPotatoes().innerText) || 0;
  getPotatoes().innerText = (currentPotatos + step.getValue()).toString();
});
