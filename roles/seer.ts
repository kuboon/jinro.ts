import { ActionFunc, ActionResults, ChoiceFunc, RoleModule, Team } from "./types.ts";

const name = "seer";
const team: Team = "villagers";
const choices: ChoiceFunc = (state, id) =>{
  if (state.dayNum != 0) {
    return ["see"];
  }
  const { role } = state.creature(id);
  switch (role.firstNight) {
    case "white":
      return ["seeWhite"];
    case "choice":
      return ["see"];
  }
  return [];
}
const see: ActionFunc = (state, action) => {
  const res: ActionResults = {logs: [], died: []}
  const { actor, target } = action;
  if (state) {
    const result = 'white' 
    res.logs.push({ receivers: [actor], action: "see", actor, target, result });
  }
  return res;
};

export default <RoleModule> {
  name,
  team,
  choices,
  actions: { see },
};
