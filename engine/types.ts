declare const BrandTypeId: unique symbol;

interface Brand<in out K extends string | symbol> {
  readonly [BrandTypeId]: {
    readonly [k in K]: K;
  };
}

export type Rule = {
  vote: "public" | "private";
};

export type CreatureId = string & Brand<"CreatureId">;
export type Role = {
  type: string;
  [key: string]: string | number | boolean;
};
export type Creature = {
  id: CreatureId;
  role: Role;
  name?: string;
};
export type ActionType = string & Brand<"ActionType">;
export type Action = {
  type: ActionType;
  actor: CreatureId;
  target: CreatureId;
};
export type Log = {
  receivers: CreatureId[] | "all" | "afterall";
  action: ActionType;
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
