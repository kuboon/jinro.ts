import { CreatureId, Log, Role, Village } from "./types.ts";
import { roleModules } from "./roles/mod.ts";
import { RoleModule } from "./roles/types.ts";

type ListenerArgs = { logs: Log[] };
type Listener = (args: ListenerArgs) => ListenerArgs;
export class CreatureClass {
  role: Role;
  mod: RoleModule;
  listeners: { [key: string]: Listener[] } = {};
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
    return this.state.receivedLogs[this.id].find((a) => a.result === "die");
  }
  findLogs({ action, target }: Partial<Log>) {
    return this.state.receivedLogs[this.id].filter((x) => {
      if (action && x.action !== action) return false;
      if (target && x.target !== target) return false;
      return true;
    });
  }
  listen(key: string, listener: Listener) {
    this.listeners[key] ||= [];
    this.listeners[key].push(listener);
  }
  dispatch(key: string, args: ListenerArgs) {
    const listeners = this.listeners[key];
    if (!listeners) return;
    for (const listener of listeners) {
      listener.call(this, args);
    }
  }
}
export class VillageState {
  private _creatures: { [key: string]: CreatureClass } = {};
  private _receivedLogs?: { [id: CreatureId]: Log[] };
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
    this._receivedLogs = undefined;
  }
  get dayNum() {
    return this.village.days.length;
  }
  get lastDay() {
    const { days } = this.village;
    return days[days.length - 1];
  }
  get receivedLogs() {
    if (!this._receivedLogs) {
      const logs: VillageState["_receivedLogs"] = {};
      this.village.creatures.forEach((c) => {
        logs[c.id] = [];
      });
      this.village.days.forEach((day, dayNum) => {
        day.logs.forEach((log) => {
          if (log.receivers === "afterall") return;
          const receivers = log.receivers === "all"
            ? this.village.creatures.map((x) => x.id)
            : log.receivers;
          receivers.forEach((receiver) => {
            logs[receiver].push(Object.assign({ day: dayNum }, log));
          });
        });
      });
      this._receivedLogs = logs;
    }
    return this._receivedLogs;
  }
  isEnd() {
    const survivors = this.creatures.filter((x) => x.alive);
    const wolves = survivors.filter((x) => x.mod.team === "wolves");
    const villagers = survivors.filter((x) => x.mod.team === "villagers");
    if (wolves.length < villagers.length) {
      return false;
    }
    return true;
  }
}
