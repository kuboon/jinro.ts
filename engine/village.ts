import { roleActions, roleModules } from "../roles/mod.ts";
import { VillageState } from "../VillageState.ts";
import { Action, CreatureId, Log, Village } from "../types.ts";
import { partition } from "../util.ts";

export function countVotes(votes: Action[]) {
  const counts = votes.reduce((acc, v) => {
    acc[v.target] = (acc[v.target] || 0) + 1;
    return acc;
  }, {} as Record<CreatureId, number>);
  const max = Object.entries(counts).reduce((acc, [k, v]) => {
    if (v > acc.count) {
      return { targets: [k], count: v };
    } else if (v === acc.count) {
      acc.targets.push(k);
    }
    return acc;
  }, { targets: [], count: 0 } as { targets: CreatureId[]; count: number });
  const { targets } = max;
  const voted = targets[Math.floor(Math.random() * targets.length)];
  return { counts, max, voted };
}
export function nightPhase(
  village_: Village | VillageState,
  actions: Action[],
): VillageState {
  const currentState = village_ instanceof VillageState
    ? village_
    : new VillageState(village_);
  const [votes, otherActions] = partition(actions, (x) => x.type === "vote");
  const { voted } = countVotes(votes);
  const logs: Log[] = [];
  if (voted) {
    logs.push({
      receivers: "all",
      target: voted,
      action: "vote",
      result: "die",
    });
  }
  const today = {
    actions,
    logs,
  };
  const nextVillage = Object.assign({}, currentState.village, {
    days: [
      ...currentState.village.days,
      today,
    ],
  });
  const nextState = new VillageState(nextVillage);
  if (nextState.isEnd()) {
    return nextState;
  }
  for (const a of otherActions) {
    if (voted && (voted === a.actor || voted === a.target)) continue;
    const actor = nextState.creature(a.actor);
    const choices = actor.mod.choices(currentState, a.actor);
    if (!choices.includes(a.type)) {
      throw new Error(`${actor.id}(${actor.role.type}) can't ${a.type}`);
    }
    const result = roleActions[a.type](nextState, a);
    logs.push(...result.logs);
  }
  nextState.clearCache();
  nextState.village.creatures.map(x=>nextState.creature(x.id)).forEach((c) => {
    if (c.mod.on) {
      logs.push(...c.mod.on("afteractions", c));
    }
  });
  nextState.clearCache();
  return nextState;
}
