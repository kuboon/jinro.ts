import { ActionType, Log } from "../../types.ts";
import { CreatureClass, VillageState } from "../../VillageState.ts";
import { ActionModuleConstraint } from "./types.ts";

const name = "propose";

function targets(actor: CreatureClass, all: CreatureClass[]) {
  return all.filter((x) => x.id !== actor.id);
}

function act(actor: CreatureClass, target: CreatureClass) {
  const logs = [];
  logs.push({
    receivers: [actor.id, target.id],
    action: name as ActionType,
    actor: actor.id,
    target: target.id,
  });
  return { logs };
}

function eachDayAfterAction(state: VillageState, triggerLog: Log) {
  const lover = state.creature(triggerLog.actor!);
  const loved = state.creature(triggerLog.target!);
  lover.listen("die", ({ logs }) => {
    logs.push({
      receivers: "all",
      action: "die" as ActionType,
      target: loved.id,
    });
    return { logs };
  });
  loved.listen("die", ({ logs }) => {
    logs.push({
      receivers: "all",
      action: "die" as ActionType,
      target: lover.id,
    });
    return { logs };
  });
}
export default {
  name,
  targets,
  act,
  eachDayAfterAction,
} satisfies ActionModuleConstraint;
