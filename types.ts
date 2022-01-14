export type Rule = {
  vote: "public" | "private";
  timer: number;
};
export type Team = "villagers" | "wolves"
export type CreatureId = string
export type Role = {
  type: string;
  [key: string]: string | number | boolean;
}
export type Creature = {
  id: CreatureId;
  name: string;
  role: Role
};
export type Vote = {
  type: "vote";
  actor: CreatureId;
  target: CreatureId;
}
export type SingleTargetAction = {
  type: "bite" | "see" | "guard" | "shinobi";
  actor: CreatureId;
  target: CreatureId;
};
type BitchAction = {
  type: "bitch";
  actor: CreatureId;
  target: CreatureId;
  fake: string;
};
export type Action = SingleTargetAction | BitchAction;
export type Log = {
  receivers: CreatureId[] | "all" | "afterall";
  action: string
  actor?: CreatureId,
  target?: CreatureId,
  result?: string
}
export type Noon = {
  votes: Vote[];
  actions: Action[];
}
export type Night = {
  logs: Log[];
  voted: CreatureId | null;
  died: {id: CreatureId, reason: string}[];
}
export type Day = {
  num: number;
  noon?: Noon
  night?: Night
};
export type Village = {
  rule: Rule;
  creatues: Creature[];
  days: Day[];
};