import { CreatureId, Village } from "./types.ts";
import { roleModules } from "./roles/mod.ts";

export class VillageState {
  private _survivors?: CreatureId[];
  private _graves?: { id: CreatureId; reason: string }[];
  constructor(public readonly village: Village) {
  }
  creature(id: CreatureId) {
    const c = this.village.creatues.find((c) => c.id === id);
    if(!c) throw new Error(`${id} is invalid CreatureId`)
    return c;
  }
  roleFor(id: CreatureId) {
    const { role } = this.creature(id);
    const mod = roleModules[role.type];
    if(!mod) throw new Error(`No role module for ${role.type}`)
    return { role, mod };
  }
  get dayNum() {
    return this.village.days.length;
  }
  get lastDay() {
    const { days } = this.village;
    return days[days.length - 1];
  }
  isEnd() {
    const survivors = this.survivors.map((x) => this.roleFor(x));
    const wolves = survivors.filter((x) => x.mod.team === "wolves");
    const villagers = survivors.filter((x) => x.mod.team === "villagers");
    if (wolves.length < villagers.length) {
      return false;
    }
    return true;
  }
  get survivors() {
    if (!this._survivors) {
      this.countGraves();
    }
    return this._survivors!;
  }
  get graves() {
    if (!this._graves) {
      this.countGraves();
    }
    return this._graves!;
  }
  private countGraves() {
    const s: typeof this.survivors = this.village.creatues.map((x) => x.id);
    const g: typeof this.graves = [];
    function die(id: CreatureId, reason: string) {
      if (s.includes(id) && g.every((x) => x.id !== id)) {
        s.splice(s.indexOf(id), 1);
        g.push({ id, reason });
      } else {
        throw new Error(`${id} is already dead`);
      }
    }
    for (const day of this.village.days) {
      if (!day.night) continue;
      const { voted, died } = day.night;
      if (voted) die(voted, "vote");
      g.push(...died);
    }
    this._survivors = s;
    this._graves = g;
  }
}
