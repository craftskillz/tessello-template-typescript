// The Widget (size S): the count, and a way into the View.

import { connect } from "@tessello/sdk";
import "../lib/base.css";
import "./widget.css";
import { readCount } from "../lib/count.ts";
import { applyTheme } from "../lib/theme.ts";

const host = await connect();
document.documentElement.lang = host.context.locale;
applyTheme(host.context.theme);
host.onThemeChange(applyTheme);

document.body.innerHTML = `
  <button class="widget" aria-label="Open My Module">
    <span class="count">0</span>
    <span class="label">My Module</span>
  </button>
`;
const count = document.querySelector<HTMLElement>(".count")!;
const load = async () => (count.textContent = String(await readCount(host.storage)));

document.querySelector(".widget")!.addEventListener("click", () => host.openView());
// The View may have changed the count while the Home was hidden.
host.onVisibilityChange((visible) => visible && load());
await load();
