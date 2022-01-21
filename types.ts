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
export type Vote = {
  type: "vote";
  actor: CreatureId;
  target: CreatureId;
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
export type Noon = {
  votes: Vote[];
  actions: Action[];
};
export type Night = {
  logs: Log[];
  voted: CreatureId | null;
  died: { id: CreatureId; reason: string }[];
};
export type Day = {
  noon: Noon;
  night: Night;
};
export type Village = {
  rule: Rule;
  creatues: Creature[];
  days: Day[];
};
