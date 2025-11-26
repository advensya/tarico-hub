import * as _ from "lodash";
import type { Flow } from "~/components/flow/interface";

export function getLatestVersion(flow?: Flow) {
  if (!flow) return;

  const _flow = _.cloneDeep(flow);

  return _flow.data.sort((a, b) => b.version - a.version)[0];
}

export function getVersion(flow: Flow, version: number) {
  const _flow = _.cloneDeep(flow);

  return _flow.data.find((flow) => flow.version === version);
}
