import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { Village } from "../types.ts";
import { nightPhase } from "./village.ts";

const aDay = () => ({
  actions: [],
  logs: [],
});
function aVillage(days = [aDay()]): Village {
  return {
    rule: {
      vote: "public",
    },
    creatures: [
      { id: "v", role: { type: "villager" } },
      { id: "s", role: { type: "seer" } },
      { id: "g", role: { type: "bodyguard" } },
      { id: "w", role: { type: "wolf" } },
      { id: "l", role: { type: "lover" } },
    ],
    days,
  };
}
Deno.test({
  name: "bite kills",
  fn: () => {
    const v: Village = aVillage();
    const actions = [{ type: "bite", actor: "w", target: "s" }];
    const next = nightPhase(v, actions);
    assertEquals(next.creature("s").alive, false);
  },
});
Deno.test({
  name: "body guard protects bite",
  fn: () => {
    const v: Village = aVillage();
    const actions = [
      { type: "guard", actor: "g", target: "s" },
      { type: "bite", actor: "w", target: "s" },
    ];
    const next = nightPhase(v, actions);
    assertEquals(next.creature("s").alive, true);
  },
});

Deno.test({
  name: "loved voted and suicide",
  fn: () => {
    const v: Village = aVillage([]);
    const actions0 = [
      { type: "propose", actor: "l", target: "v" },
    ];
    const day0 = nightPhase(v, actions0);
    const actions1 = [
      { type: "vote", actor: "v", target: "l" },
    ];
    const day1 = nightPhase(day0.village, actions1);
    assertEquals(day1.creature('v').dieOf, "suicide" );
  },
});
