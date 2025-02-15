import { ActionType, Log } from "../types.ts";
import { CreatureClass } from "../VillageState.ts";
import type {
  ActionFunc,
  ActionResults,
  EventHandler,
  RoleModule,
  Team,
} from "./types.ts";

const name = "lover";
const team: Team = "lovers";

const proposeAction = "propose" as ActionType;
const suicideAction = "suicide" as ActionType;

function choices(this: CreatureClass) {
  if (this.state.dayNum == 0) {
    return [proposeAction];
  }
  return [];
}
const propose: ActionFunc = (_state, action) => {
  const res: ActionResults = { logs: [], died: [] };
  const { actor, target } = action;
  res.logs.push({
    receivers: [actor, target],
    action: proposeAction,
    actor,
    target,
  });
  return res;
};
const on: EventHandler = function (event) {
  const lover = this as unknown as CreatureClass;
  const { state } = lover;
  const res: Log[] = [];
  if (event !== "afteractions") return res;
  const proposeLog = state.village.days.flatMap((day) => day.logs).find((x) =>
    x.action === proposeAction && x.actor === lover.id
  );
  if (!proposeLog) return res;
  const loved = state.creature(proposeLog.target!);
  if (!lover.alive && loved.alive) {
    res.push({
      receivers: "all",
      action: suicideAction,
      result: "die",
      target: loved.id,
    });
  }
  if (lover.alive && !loved.alive) {
    res.push({
      receivers: "all",
      action: suicideAction,
      result: "die",
      target: lover.id,
    });
  }
  return res;
};
export default {
  name,
  team,
  choices,
  actions: { propose },
  on,
} satisfies RoleModule;
