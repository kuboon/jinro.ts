import { ActionFunc, RoleModule } from "./types.ts";
import wolf from "./wolf.ts";
import seer from "./seer.ts";

export const roleModules: Record<string, RoleModule> = {wolf, seer}
export const roleActions = Object.values(roleModules).reduce((acc, mod) => {
  return {...acc, ...mod.actions}
}, {} as Record<string, ActionFunc>)
