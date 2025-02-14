import { assertEquals } from "@std/assert";
import type { Creature, Village } from "../types.ts";
import { nightPhase } from "./village.ts";

const aDay = () => ({
  actions: [],
  logs: [],
});

const villager: Creature = { id: "v", role: { type: "villager" } };
const seer: Creature = { id: "s", role: { type: "seer" } };
const bodyguard: Creature = { id: "g", role: { type: "bodyguard" } };
const wolf: Creature = { id: "w", role: { type: "wolf" } };
const lover: Creature = { id: "l", role: { type: "lover" } };

function aVillage(days = [aDay()]): Village {
  return {
    rule: {
      vote: "public",
    },
    creatures: [villager, seer, bodyguard, wolf, lover],
    days,
  };
}
Deno.test({
  name: "bite kills",
  fn: () => {
    const v: Village = aVillage();
    const actions = [{ type: "bite", actor: wolf.id, target: seer.id }];
    const next = nightPhase(v, actions);
    assertEquals(next.creature(seer.id).alive, false);
  },
});
Deno.test({
  name: "body guard protects bite",
  fn: () => {
    const v: Village = aVillage();
    const actions = [
      { type: "guard", actor: bodyguard.id, target: seer.id },
      { type: "bite", actor: wolf.id, target: seer.id },
    ];
    const next = nightPhase(v, actions);
    assertEquals(next.creature(seer.id).alive, true);
  },
});

Deno.test({
  name: "loved voted and suicide",
  fn: () => {
    const v: Village = aVillage([]);
    const actions0 = [
      { type: "propose", actor: lover.id, target: villager.id },
    ];
    const day0 = nightPhase(v, actions0);
    const actions1 = [
      { type: "vote", actor: villager.id, target: lover.id },
    ];
    const day1 = nightPhase(day0.village, actions1);
    assertEquals(day1.creature(villager.id).dieOf?.action, "suicide");
  },
});
