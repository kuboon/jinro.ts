import { ActionFunc, RoleModule } from "./types.ts";
import villager from './villager.ts'
import seer from "./seer.ts";
import bodyguard from "./bodyguard.ts";
import wolf from "./wolf.ts";

export const roleModules: Record<string, RoleModule> = {villager, seer, bodyguard, wolf}
export const roleActions = Object.values(roleModules).reduce((acc, mod) => {
  return {...acc, ...mod.actions}
}, {} as Record<string, ActionFunc>)
