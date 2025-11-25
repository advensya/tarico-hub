import type {
  Edge,
  Node,
  OnConnectStartParams,
  ValidConnectionFunc,
} from "@vue-flow/core";

// import type { EdgeProps } from '@vue-flow/core'

export interface IFlowConnecting {
  start: OnConnectStartParams;
}

export const flowStates = [
  "draft",
  "cancel",
  "close",
  "pending",
  "processed",
  "approved",
  "rejected",
] as const;
export type IFlowState = (typeof flowStates)[number];

export interface FlowData {
  state: string;
  [key: string]: any;
}

export type Flow = { nodes: Node[]; edges: Edge[] };

export interface IFlowNodeProps {
  data: {
    label?: string;
    type: "final" | "initial" | "standard";
    state: IFlowState;
    [key: string]: any;
  };
  isValidConnection: ValidConnectionFunc;
  connecting?: IFlowConnecting;
  id: string;
  selected?: boolean;
  label?: string;
  flow: Flow;
  flowData?: FlowData;
}
