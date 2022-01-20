import { ActionFunc, RoleModule } from "./types.ts";
import villager from './villager.ts'
import wolf from "./wolf.ts";
import seer from "./seer.ts";

export const roleModules: Record<string, RoleModule> = {villager, seer, wolf}
export const roleActions = Object.values(roleModules).reduce((acc, mod) => {
  return {...acc, ...mod.actions}
}, {} as Record<string, ActionFunc>)
