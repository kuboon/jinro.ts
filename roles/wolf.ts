import { RoleModule } from "./types.ts";
import { VillageState } from "../VillageState.ts";
import { Action, CreatureId, Log } from "../types.ts";

function choices(state: VillageState, _id: CreatureId) {
  if (state.dayNum != 0) {
    return ["bite"];
  }
  return [];
}

function bite(state: VillageState, action: Action) {
  const logs: Log[] = [];
  const died: { id: CreatureId; reason: string }[] = [];
  const { actor, target } = action;
  const { actions } = state.lastDay;
  if (!actions.some((x) => x.type === "guard" && x.target === target)) { // unless target is guarded
    logs.push({ receivers: [actor, target], action: "bite", actor, target, result: "die" });
  }
  return { logs, died };
}

export default {
  name: "wolf",
  team: "wolves" as const,
  choices,
  actions: { bite },
} as RoleModule;
