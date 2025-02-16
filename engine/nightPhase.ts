import { roleActions } from "./roles/mod.ts";
import { VillageState } from "./VillageState.ts";
import { Action, ActionType, CreatureId, Log, Village } from "./types.ts";
import { partition, sample } from "./util.ts";

function countVotes(votes: Action[]) {
  const counts = votes.reduce((acc, v) => {
    acc[v.target] ||= 0;
    acc[v.target]++;
    return acc;
  }, {} as Record<CreatureId, number>);
  const max = Math.max(...Object.values(counts));
  const targets = Object.entries(counts).filter(([, v]) => v === max).map((
    [k],
  ) => k as CreatureId);
  const voted = sample(targets);
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
      action: "vote" as ActionType,
      result: "die",
    });
  }
  const today = {
    actions: otherActions,
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
    const actor = currentState.creature(a.actor);
    if (!actor.alive) continue;
    const choices = actor.mod.choices.apply(actor);
    if (!choices.includes(a.type)) {
      throw new Error(`${actor.id}(${actor.role.type}) can't ${a.type}`);
    }
    const result = roleActions[a.type](nextState, a);
    logs.push(...result.logs);
  }
  nextState.clearCache();
  nextState.creatures.forEach((c) => {
    if (c.mod.on) {
      logs.push(...c.mod.on.apply(c, ["afteractions"]));
    }
  });
  nextState.clearCache();
  return nextState;
}
