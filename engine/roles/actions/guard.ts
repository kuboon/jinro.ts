import { CreatureClass } from "../../VillageState.ts";
import { ActionModuleConstraint } from "./types.ts";

const name = "guard";

function targets(_actor: CreatureClass, all: CreatureClass[]) {
  return all.filter((x) => x.id !== _actor.id);
}

export default {
  name,
  targets,
  act(_actor, target){
    target.listen("bite", (args)=>args)
    return { logs: []}
  },
} satisfies ActionModuleConstraint
