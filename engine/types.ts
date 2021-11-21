export type Reguration = {
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
export type Creature ={
  id: string;
  name: string;
  type: CreatureType;
  team: Team;
  die_of: string;
  killed_by: string;
}
export type Action = {
  type: "vote" | "kill" | "see" | "guard" | "shinobi";
  actor: string;
  target: string;
} | {
  type: "bitch";
  actor: string;
  target: string;
  fake: string;
}
export type Day = {
  num: number;
  actions: Action[];
}
export type VillageState = {
  creatues: Creature[];
  days: Day[];
  result: {
    winner: {
      team: Team;
      creature_ids: string[];
    }
  }
};
