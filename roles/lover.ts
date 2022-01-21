import {
  ActionFunc,
  ActionResults,
  ChoiceFunc,
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
  res.logs.push({ receivers: [actor, target], action: "propose", actor, target });
  return res;
};

export default <RoleModule> {
  name,
  team,
  choices,
  actions: { propose },
};
