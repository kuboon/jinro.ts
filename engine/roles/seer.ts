import type { ActionType } from "../types.ts";
import { CreatureClass } from "../VillageState.ts";
import type { ActionFunc, ActionResults, RoleModule, Team } from "./types.ts";

const name = "seer";
const team: Team = "villagers";
function choices(this: CreatureClass) {
  const state = this.state;
  if (state.dayNum != 0) {
    return ["see"];
  }
  const { role } = this;
  switch (role.firstNight) {
    case "white":
      return ["seeWhite"];
    case "choice":
      return ["see"];
  }
  return [];
}
const see: ActionFunc = (state, action) => {
  const res: ActionResults = { logs: [], died: [] };
  const { actor, target } = action;
  if (state) {
    const result = "white";
    res.logs.push({
      receivers: [actor],
      action: "see" as ActionType,
      actor,
      target,
      result,
    });
  }
  return res;
};

export default {
  name,
  team,
  choices,
  actions: { see },
} satisfies RoleModule;
