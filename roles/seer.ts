import { RoleModule } from "./types.ts";
import { VillageState } from "../VillageState.ts";
import { Action, CreatureId, Log } from "../types.ts";

const name = "seer";
const team = "villagers" as const
function choices(state: VillageState, id: CreatureId) {
  if(state.today().num != 0) {
    return ['see']
  }
  const { role } = state.roleFor(id)
  switch (role.firstNight) {
    case "white":
      return ['see']
    case 'none':
      return []
    case 'choice':
      return ['see']
  }
}
function see(state: VillageState, action: Action) {
  const logs: Log[] = []
  const died: { id: CreatureId, reason: string }[] = []
  const { actor, target } = action
  if (state) {// unless target is guarded
    logs.push({ receivers: [actor, target], action: "bite", actor, target })
    died.push({ id: target, reason: 'bite' })
  }
  return { logs, died }
}

export default {
  name,
  team,
  choices,
  actions: { see }
} as RoleModule
