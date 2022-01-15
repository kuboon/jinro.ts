import { Action, CreatureId, Log, Team, Role } from "../types.ts";
import { VillageState } from "../VillageState.ts";

export type RoleClass = {
  name: string
  team: Team
  action: (action: Action, state: VillageState)
    => { logs: Log[], died: { id: CreatureId, reason: string }[] }
}

export interface RoleConstructor {
  new (role: Role): RoleClass
}
