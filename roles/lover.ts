import { Log } from "../types.ts";
import {
  ActionFunc,
  ActionResults,
  ChoiceFunc,
  EventHandler,
  RoleModule,
  Team,
} from "./types.ts";

const name = "lover";
const team: Team = "lovers";
const choices: ChoiceFunc = (state, _id) => {
  if (state.dayNum == 0) {
    return ["propose"];
  }
  return [];
};
const propose: ActionFunc = (_state, action) => {
  const res: ActionResults = { logs: [], died: [] };
  const { actor, target } = action;
  res.logs.push({
    receivers: [actor, target],
    action: "propose",
    actor,
    target,
  });
  return res;
};
const on: EventHandler = (event, lover) => {
  const { state } = lover;
  const res: Log[] = [];
  if (event !== "afteractions") return res;
  const proposeLog = state.village.days.flatMap((day) => day.logs).find((x) =>
    x.action === "propose" && x.actor === lover.id
  );
  if (!proposeLog) return res;
  const loved = state.creature(proposeLog.target!);
  if (!lover.alive && loved.alive) {
    res.push({
      receivers: "all",
      action: "suicide",
      result: "die",
      actor: loved.id,
    });
  }
  if (lover.alive && !loved.alive) {
    res.push({
      receivers: "all",
      action: "suicide",
      result: "die",
      actor: lover.id,
    });
  }
  return [] as Log[];
};
export default <RoleModule> {
  name,
  team,
  choices,
  actions: { propose },
  on,
};
