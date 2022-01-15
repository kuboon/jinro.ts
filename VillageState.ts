import { CreatureId, Village } from "./types.ts";

export class VillageState {
  private _survivors?: CreatureId[];
  private _graves?: { id: CreatureId, reason: string }[];
  constructor(public readonly village: Village) {
  }
  public creature(id: CreatureId) {
    const c = this.village.creatues.find((c) => c.id === id)!
    return c
  }
  public today() {
    return this.village.days.slice(-1)[0];
  }
  public isEnd() {
    const survivors = this.survivors.map(x => this.creature(x));
    const wolves = survivors.filter(x => x.role.team === "wolves");
    const villagers = survivors.filter(x => x.role.team === "villagers");
    if (wolves.length < villagers.length) {
      return false
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
      this.countGraves()
    }
    return this._graves!;
  }
  private countGraves() {
    const s: typeof this.survivors = this.village.creatues.map(x => x.id)
    const g: typeof this.graves = [];
    function die(id: CreatureId, reason: string) {
      if (s.includes(id) && g.every(x => x.id !== id)) {
        s.splice(s.indexOf(id), 1);
        g.push({ id, reason });
      } else {
        throw new Error(`${id} is already dead`);
      }
    }
    for (const day of this.village.days) {
      if (!day.night) continue
      const { voted, died } = day.night
      if (voted) die(voted, "vote");
      g.push(...died)
    }
    this._survivors = s;
    this._graves = g;
  }
}
