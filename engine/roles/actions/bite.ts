import { ActionType, Log } from "../../types.ts";
import { CreatureClass } from "../../VillageState.ts";
import { ActionModuleConstraint } from "./types.ts";

const name = "bite" as const;

function targets(_actor: CreatureClass, all: CreatureClass[]) {
  return all.filter((x) => x.role.type !== "wolf" && x.id !== _actor.id);
}

function act(actor: CreatureClass, target: CreatureClass) {
  const logs: Log[] = [];

  const result = target.dispatch(name, { logs });
  if (result !== undefined) {
    logs.push({
      receivers: [actor.id, target.id],
      action: name as ActionType,
      actor: actor.id,
      target: target.id,
      result: "die",
    });
  }
  return { logs };
}

export default {
  name,
  targets,
  act,
} satisfies ActionModuleConstraint;
