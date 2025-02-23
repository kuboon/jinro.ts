import bite from "./bite.ts";
import fake_propose from "./fake_propose.ts";
import guard from "./guard.ts";
import propose from "./propose.ts";
import { ActionModuleConstraint } from "./types.ts";

export const roleActions: Record<string, ActionModuleConstraint> = {
  bite,
  fake_propose,
  guard,
  propose,
};
// export type ActionType = "vote" | keyof typeof roleActions
