import { RoleModule } from "./types.ts";
import { VillageState } from "../VillageState.ts";
import { Action, CreatureId, Log } from "../types.ts";

 const name = "seer";
 const team = "villagers" as const
 function see(action: Action, state: VillageState) {
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
  actions: {see}
} as RoleModule
