import { ActionType } from "../../types.ts";
import { CreatureClass } from "../../VillageState.ts";
import { ActionFunc, ActionModuleConstraint } from "./types.ts";

const act: ActionFunc = (actor, target) => {
  const logs = [];
  logs.push({
    receivers: [actor.id],
    action: "fake_propose" as ActionType,
    actor: actor.id,
    target: target.id,
  });
  logs.push({
    receivers: [target.id],
    action: "propose" as ActionType,
    actor: actor.id,
    target: target.id,
  });
  return { logs };
}

export default {
  name: "fake_propose" as const,
  targets(actor, all): CreatureClass[] {
    return all.filter((x) =>
      x.id !== actor.id &&
      x.findLogs({ action: "propose" as ActionType, target: x.id }).length === 0
    );
  },
  act,
} satisfies ActionModuleConstraint;
