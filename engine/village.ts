import { roleActions, roleModules } from "../roles/mod.ts";
import { VillageState } from "../VillageState.ts";
import { CreatureId, Log, Village, Vote, Night, Noon } from "../types.ts";

export function countVotes(votes: Vote[]) {
  const counts = votes.reduce((acc, v) => {
    acc[v.target] = (acc[v.target] || 0) + 1;
    return acc;
  }, {} as Record<CreatureId, number>)
  const max = Object.entries(counts).reduce((acc, [k, v]) => {
    if (v > acc.count) {
      return { targets: [k], count: v };
    } else if (v === acc.count) {
      acc.targets.push(k);
    }
    return acc;
  },
    { targets: [], count: 0 } as { targets: CreatureId[], count: number });
  const { targets } = max;
  const voted = targets[Math.floor(Math.random() * targets.length)];
  return { counts, max, voted };
}
export function nightPhase(village_: Village | VillageState, noon: Noon): VillageState {
  const currentState = village_ instanceof VillageState ? village_ : new VillageState(village_);
  const { voted } = countVotes(noon.votes);
  const logs: Log[] = []
  logs.push({
    receivers: 'all',
    target: voted,
    action: 'vote',
  })
  const night: Night = {
    voted,
    logs,
    died: []
  };
  const nextVillage = Object.assign({}, currentState.village, {
    days: [
      ...currentState.village.days,
      {
        noon,
        night
      }
    ]
  });
  const state = new VillageState(nextVillage);
  if (state.isEnd()) {
    return state
  }
  for (const a of noon.actions) {
    if(voted && (voted === a.actor || voted === a.target)) continue
    const actor = state.creature(a.actor);
    const mod = roleModules[actor.role.type]
    if(!mod) throw new Error(`No role module for ${actor.role.type}`)
    const choices = mod.choices(currentState, a.actor);
    if(!choices.includes(a.type)) {
      throw new Error(`${actor.id}(${actor.role.type}) can't ${a.type}`)
    }
    const result = roleActions[a.type](state, a);
    night.logs.push(...result.logs);
    night.died.push(...result.died);
  }
  return state
}
