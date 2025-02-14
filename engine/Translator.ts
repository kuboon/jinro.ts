import { CreatureId } from "../types.ts";
import { VillageState } from "../VillageState.ts";

export class Translator extends VillageState {
  translateTo(dayNum: number, id?: CreatureId): string[] {
    const lines: string[] = [];
    for (const l of this.village.days[dayNum].logs) {
      if (id && l.receivers instanceof Array && !l.receivers.includes(id)) {
        continue;
      }
      const actor = this.creature(l.actor!).name;
      const target = this.creature(l.target!).name;
      let line;
      switch (l.action) {
        case "bite":
          line = `${actor}は${target}を襲撃した。`;
          break;
        default:
          line = `${actor}の行動は謎のままだ。`;
      }
      lines.push(line);
    }
    return lines;
  }
}
