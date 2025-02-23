import villager from "./villager.ts";
import seer from "./seer.ts";
import bodyguard from "./bodyguard.ts";
import wolf from "./wolf.ts";
import lover from "./lover.ts";
import { RoleModule } from "./types.ts";

export const roleModules: Record<string, RoleModule> = {
  villager,
  seer,
  bodyguard,
  wolf,
  lover,
};
