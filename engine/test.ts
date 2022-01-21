import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";
import { Noon, Village } from "../types.ts";
import { nightPhase } from "./village.ts";

const aDay = () => ({
  noon: {
    votes: [],
    actions: [],
  },
  night: {
    voted: null,
    logs: [],
    died: [],
  },
});
function aVillage(days = [aDay()]): Village {
  return {
    rule: {
      vote: "public",
    },
    creatues: [
      { id: "v", role: {type: "villager"} },
      { id: "s", role: {type: "seer"} },
      { id: "g", role: {type: "bodyguard"} },
      { id: "w", role: {type: "wolf"} },
      { id: "l", role: {type: "lover"} }
    ],
    days,
  };
}
Deno.test({
  name: "bite kills",
  fn: () => {
    const v: Village = aVillage()
    const noon: Noon = {
      votes: [],
      actions: [{ type: "bite", actor: "w", target: "s" }],
    };
    const next = nightPhase(v, noon);
    assertEquals(next.lastDay.night.died[0], { id: "s", reason: "bite" });
  },
});
Deno.test({
  name: "body guard protects bite",
  fn: () => {
    const v: Village = aVillage()
    const noon: Noon = {
      votes: [],
      actions: [
        { type: "guard", actor: "g", target: "s" },
        { type: "bite", actor: "w", target: "s" }
      ],
    };
    const next = nightPhase(v, noon);
    assertEquals(next.lastDay.night.died, []);
  },
});

Deno.test({
  name: "loved voted and suicide",
  fn: () => {
    const v: Village = aVillage([])
    const noon0: Noon = {
      votes: [],
      actions: [
        { type: "propose", actor: "l", target: "v" },
      ],
    };
    const day0 = nightPhase(v, noon0);
    const noon1: Noon = {
      votes: [{
        type: 'vote',
        actor: 'v',
        target: 'l'
      }],
      actions: []
    }
    const day1 = nightPhase(day0.village, noon1);
    assertEquals(day1.lastDay.night.died, [{ id: 'v', reason: 'suicide' }]);
  },
});
