import { CreatureId, Log, Role, Village } from "./types.ts";
import { roleModules } from "./roles/mod.ts";
import { RoleModule } from "./roles/types.ts";

export class CreatureClass {
  role: Role;
  mod: RoleModule;
  constructor(public readonly state: VillageState, public id: CreatureId) {
    const c = this.state.village.creatures.find((c) => c.id === id);
    if (!c) throw new Error(`${id} is invalid CreatureId`);
    this.role = c.role;
    this.mod = roleModules[this.role.type];
    if (!this.mod) throw new Error(`No role module for ${this.role.type}`);
  }
  get alive() {
    return !this.dieOf;
  }
  get dieOf() {
    return this.state.targettedLogs[this.id].find((a) => a.result === "die");
  }
  targetted(action: string) {
    return this.state.targettedLogs[this.id].find((a) => a.action === action);
  }
}
export class VillageState {
  private _creatures: { [key: string]: CreatureClass } = {};
  private _targettedLogs?: { [id: CreatureId]: Log[] };
  constructor(public readonly village: Village) {
  }
  creature(id: CreatureId) {
    if (!this._creatures[id]) {
      this._creatures[id] = new CreatureClass(this, id);
    }
    return this._creatures[id];
  }
  get creatures() {
    return this.village.creatures.map((x) => this.creature(x.id));
  }
  clearCache() {
    this._targettedLogs = undefined;
  }
  get dayNum() {
    return this.village.days.length;
  }
  get lastDay() {
    const { days } = this.village;
    return days[days.length - 1];
  }
  get targettedLogs() {
    if (!this._targettedLogs) {
      const logs: VillageState["_targettedLogs"] = {};
      this.village.creatures.forEach((c) => {
        logs[c.id] = [];
      });
      this.village.days.forEach((day) => {
        day.logs.forEach((log) => {
          if (!log.target) return;
          logs[log.target].push(log);
        });
      });
      this._targettedLogs = logs;
    }
    return this._targettedLogs;
  }
  isEnd() {
    const survivors = this.creatures.filter(x => x.alive);
    const wolves = survivors.filter((x) => x.mod.team === "wolves");
    const villagers = survivors.filter((x) => x.mod.team === "villagers");
    if (wolves.length < villagers.length) {
      return false;
    }
    return true;
  }
}
