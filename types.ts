export type Rule = {
  vote: "public" | "private";
};
export type CreatureId = string;
export type Role = {
  type: string;
  [key: string]: string | number | boolean;
};
export type Creature = {
  id: CreatureId;
  role: Role;
};
export type Action = {
  type: string;
  actor: CreatureId;
  target: CreatureId;
};
export type Log = {
  receivers: CreatureId[] | "all" | "afterall";
  action: string;
  actor?: CreatureId;
  target?: CreatureId;
  result?: string;
};
export type Day = {
  actions: Action[];
  logs: Log[];
};
export type Village = {
  rule: Rule;
  creatures: Creature[];
  days: Day[];
};
