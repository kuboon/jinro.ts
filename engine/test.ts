import { assertEquals } from "@std/assert";
import type { ActionType, Creature, Village } from "./types.ts";
import { nightPhase } from "./nightPhase.ts";
import { CreatureId } from "./types.ts";

const aDay = () => ({
  actions: [],
  logs: [],
});

const villager: Creature = {
  id: "v" as CreatureId,
  role: { type: "villager" },
};
const seer: Creature = { id: "s" as CreatureId, role: { type: "seer" } };
const bodyguard: Creature = {
  id: "g" as CreatureId,
  role: { type: "bodyguard" },
};
const wolf: Creature = { id: "w" as CreatureId, role: { type: "wolf" } };
const lover: Creature = { id: "l" as CreatureId, role: { type: "lover" } };

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
    const actions = [{
      type: "bite" as ActionType,
      actor: wolf.id,
      target: seer.id,
    }];
    const next = nightPhase(v, actions);
    assertEquals(next.creature(seer.id).alive, false);
  },
});
Deno.test({
  name: "body guard protects bite",
  fn: () => {
    const v: Village = aVillage();
    const actions = [
      { type: "guard" as ActionType, actor: bodyguard.id, target: seer.id },
      { type: "bite" as ActionType, actor: wolf.id, target: seer.id },
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
      { type: "propose" as ActionType, actor: lover.id, target: villager.id },
    ];
    const day0 = nightPhase(v, actions0);
    const actions1 = [
      { type: "vote" as ActionType, actor: villager.id, target: lover.id },
    ];
    const day1 = nightPhase(day0.village, actions1);
    assertEquals(day1.creature(villager.id).dieOf?.action, "suicide");
  },
});
