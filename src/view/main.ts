// The View: the count, with a button to add one and another to start again.

import { connect } from "@tessello/sdk";
import "../lib/base.css";
import "./view.css";
import { increment, readCount, reset } from "../lib/count.ts";
import { applyTheme } from "../lib/theme.ts";

const host = await connect();
document.documentElement.lang = host.context.locale;
applyTheme(host.context.theme);
host.onThemeChange(applyTheme);

document.body.innerHTML = `
  <main>
    <h1>My Module</h1>
    <p class="count" aria-label="Count">0</p>
    <div class="actions">
      <button class="primary" data-action="add">Add one</button>
      <button data-action="reset">Start again</button>
    </div>
    <p role="alert" hidden></p>
  </main>
`;
const count = document.querySelector<HTMLElement>(".count")!;
const alert = document.querySelector<HTMLElement>("[role=alert]")!;

/** Runs an action on the storage, then shows the count, or what went wrong. */
async function run(action: () => Promise<unknown> = async () => {}) {
  try {
    await action();
    count.textContent = String(await readCount(host.storage));
    alert.hidden = true;
  } catch (error) {
    alert.textContent = error instanceof Error ? error.message : String(error);
    alert.hidden = false;
  }
}

document.querySelector("[data-action=add]")!.addEventListener("click", () => run(() => increment(host.storage)));
document.querySelector("[data-action=reset]")!.addEventListener("click", () => run(() => reset(host.storage)));
// The Widget may have changed the count while the View was hidden.
host.onVisibilityChange((visible) => visible && run());
await run();
