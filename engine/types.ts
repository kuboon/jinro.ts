import { Action, CreatureId, Log, Team, Role } from "../types.ts";
import { VillageState } from "../VillageState.ts";

export type RoleInstance = {
  name: string
  team: Team
  action: (action: Action, state: VillageState)
    => { logs: Log[], died: { id: CreatureId, reason: string }[] }
}

export interface RoleClass {
  new (role: Role): RoleInstance
}
