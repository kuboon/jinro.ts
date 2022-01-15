import { roleActions } from "../roles/mod.ts";
import { VillageState } from "../VillageState.ts";
import { CreatureId, Log, Village, Vote, Night } from "../types.ts";

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
export function nightPhase(village: Village): VillageState {
  let state = new VillageState(village);
  const today = state.today()
  if(!today.noon || today.night) {
    throw new Error("not noon")
  }
  const { voted } = countVotes(today.noon.votes);
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
  const nextVillage = Object.assign({}, village, {
    days: [
      ...village.days.slice(0, today.num - 1),
      {
        ...today,
        night,
      },
      {
        num: today.num + 1
      }
    ]
  });
  state = new VillageState(nextVillage);
  if (state.isEnd()) {
    return state
  }
  for (const a of today.noon.actions) {
    if(voted && (voted === a.actor || voted === a.target)) continue
    const result = roleActions[a.type](a, state);
    night.logs.push(...result.logs);
    night.died.push(...result.died);
  }
  return state
}
