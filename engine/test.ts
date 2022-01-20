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
function aVillage(): Village {
  return {
    rule: {
      vote: "public",
    },
    creatues: [
      { id: "v", name: "1", role: {type: "villager", team: 'villagers'} },
      { id: "s", name: "2", role: {type: "seer", team: 'villagers'} },
      { id: "w", name: "3", role: {type: "wolf", team: 'wolves'} }
    ],
    days: [aDay()],
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
      actions: [],
    };
    const next = nightPhase(v, noon);
    assertEquals(next.lastDay.night.died, []);
  },
});
