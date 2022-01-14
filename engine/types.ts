export type Rule = {
  vote: "public" | "private";
  timer: number;
};
export enum CreatureType {
  Villager = "villager",
  Seer = "seer",
  Medium = "medium",
  Hunter = "hunter",
  Wolf = "wolf",
  Possessed = "possessed",
  Bitch = "bitch",
  Shinobi = "shinobi",
}
export enum Team {
  Villagers = "villagers",
  Wolves = "wolves",
}
export type Creature = {
  id: string;
  name: string;
  type: CreatureType;
  team: Team;
  die_of: string;
  killed_by: string;
};
export type Vote = {
  type: "vote";
  actor: string;
  target: string;
}
export type SingleTargetAction = {
  type: "bite" | "see" | "guard" | "shinobi";
  actor: string;
  target: string;
};
type BitchAction = {
  type: "bitch";
  actor: string;
  target: string;
  fake: string;
};
export type Action = Vote | SingleTargetAction | BitchAction;
export type Day = {
  num: number;
  actions: Action[];
};
export type Result = {
  num: number;
  voted: string,
  died: string[],
};
export type VillageState = {
  rule: Rule;
  creatues: Creature[];
  days: Day[];
  results: Result[];
  result: {
    winner: {
      team: Team;
      creature_ids: string[];
    };
  };
};
