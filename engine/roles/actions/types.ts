import { Log } from "../../types.ts";
import { CreatureClass } from "../../VillageState.ts";

export type TargetsFunc = (
  actor: CreatureClass,
  all: CreatureClass[],
) => CreatureClass[];
export type ActionFunc = (
  actor: CreatureClass,
  target: CreatureClass,
) => { logs: Log[] };
export type ActionModuleConstraint = {
  name: string;
  targets: TargetsFunc;
  act: ActionFunc;
};
