<script lang="ts" setup>
import { Background } from "@vue-flow/background";
import { Controls } from "@vue-flow/controls";
import { MiniMap } from "@vue-flow/minimap";
import {
  VueFlow,
  useVueFlow,
  type Node,
  type Edge,
  type NodeProps,
  type Connection,
  type OnConnectStartParams,
  type FlowExportObject,
} from "@vue-flow/core";

import UiNodePending from "~/components/flow/node/pending.vue";
import UiNodeDraft from "~/components/flow/node/draft.vue";
import UiNodeCancel from "~/components/flow/node/cancel.vue";
import UiNodeClose from "~/components/flow/node/close.vue";

import CustomEdge from "~/components/flow/edge.vue";
import {
  type IFlowConnecting,
  type IFlowState,
  flowStates,
} from "./interface/index";

import defaultFlow from "./default";
import { WorkflowParser } from "./utils/parser";

const {
  onConnect,
  addEdges,
  addNodes,
  getNodes,
  getHandleConnections,
  toObject,
} = useVueFlow();

const nodes = ref<Node[]>([
  // {
  //   id: "start",
  //   type: "custom",
  //   label: "Node 1",
  //   position: { x: 250, y: 5 },
  //   data: { type: "start" },
  // },
  // {
  //   id: "2",
  //   type: "custom",
  //   label: "Node 3",
  //   position: { x: 700, y: 5 },
  //   data: {},
  // },
  // {
  //   id: "end",
  //   type: "custom",
  //   label: "Node 3",
  //   position: { x: 1150, y: 5 },
  //   data: { type: "end" },
  // },
  ...defaultFlow.nodes,
]);

const connecting = ref<IFlowConnecting>();

const edges = ref<Edge[]>([...defaultFlow.edges]);

onConnect((params) => {
  const e = [
    { usage: "source", node: params.source, id: params.sourceHandle },
    { usage: "target", node: params.target, id: params.targetHandle },
  ];

  addEdges([{ ...params, animated: true }]);
});

function isHandleAcceptConnection(connection: Connection) {
  if (connection.source === connection.target) return false;

  const s = getHandleConnections({ nodeId: connection.source, type: "source" });
  if (s.find((s0) => s0.target === connection.target)) return false;

  if (connection.sourceHandle && connection.targetHandle) {
    if (
      connection.sourceHandle.split("-")[2] ===
      connection.targetHandle.split("-")[2]
    ) {
      return false;
    }
  }

  return true;
}

const createNewNode = ({
  linkTo,
  state,
}: {
  linkTo?: NodeProps;
  state: IFlowState;
}) => {
  // 1. Générer un ID unique (Timestamp est une méthode simple et sûre ici)
  const id = Date.now().toString();
  const c = Math.random() * (200 - 10) + 10;
  let x = c + 400;
  let y = 0;

  let linkTonode: Node | undefined;

  if (linkTo) {
    linkTonode = getNodes.value.find((n) => n.id === linkTo.id);
    if (linkTonode) {
      x = linkTonode.position.x + c + 400;
      y = linkTonode.position.y + c;
    }
  }

  // 2. Définir le nouvel objet Nœud
  const newNode: Node = {
    id,
    position: { x, y },
    data: { state, label: `$close.pending.${state}` },
    type: "custom",
  };

  // 3. L'ajouter au graphe
  addNodes([newNode]);

  if (linkTonode) {
    // écris moi le code qui doit se mettre ici
    addEdges([
      {
        id: `e-${linkTonode.id}-${id}`,
        source: linkTonode.id,
        target: id,
        animated: true,
      },
    ]);
  }
};

function onConnectStart(
  event: { event?: MouseEvent | undefined } & OnConnectStartParams
) {
  connecting.value = { start: event };
}

function onConnectEnd() {
  connecting.value = undefined;
}

// NestJS Service / Parser
function parseVueFlow(flowData: FlowExportObject) {
  const parser = new WorkflowParser();
  console.log(parser.parseVueFlow(flowData));
}
</script>

<template>
  <div class="w-screen h-screen">
    <div class="flex h-full">
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        fit-view-on-init
        :default-zoom="1.5"
        :min-zoom="0.2"
        :max-zoom="4"
        @connect-start="onConnectStart"
        @connect-end="onConnectEnd"
      >
        <Background :gap="12" />

        <MiniMap />

        <Controls />

        <svg>
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="10"
              refY="5"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
        </svg>

        <!-- <template #connection-line="{ sourceX, sourceY, targetX, targetY }">
          <UiArrow
            :source-x="sourceX"
            :source-y="sourceY"
            :target-x="targetX"
            :target-y="targetY"
          />
        </template> -->

        <template #node-custom="props">
          <component
            v-bind="props"
            :is="
              props.data.state === 'draft'
                ? UiNodeDraft
                : props.data.state === 'cancel'
                ? UiNodeCancel
                : props.data.state === 'close'
                ? UiNodeClose
                : UiNodePending
            "
            :is-valid-connection="isHandleAcceptConnection"
            :connecting
            :edges
          />
        </template>

        <template #edge-default="props">
          <CustomEdge v-bind="props" />
        </template>
      </VueFlow>

      <div class="ui-flow-toolbar absolute top-3 left-5 z-50">
        <u-button @click="parseVueFlow(toObject())" class="btn-add">
          save
        </u-button>

        <UDropdownMenu
          :items="[
            [
              ...flowStates.values().map((e) => ({
                label: e,
                onSelect: () => {
                  createNewNode({ state: e });
                },
              })),
              // {
              //   label: 'cancel',
              //   onSelect: (e) => {
              //     createNewNode({ state: 'cancel' });
              //   },
              // },
              // {
              //   label: 'pending',
              //   onSelect: (e) => {
              //     createNewNode({ state: 'pending' });
              //   },
              // },
            ],
          ]"
          :content="{ align: 'start', collisionPadding: 12 }"
        >
          <u-button> <span class="icon">+</span> Ajouter une étape </u-button>

          <!-- <UButton
            icon="i-lucide-swatch-book"
            color="primary"
            variant="soft"
            size="xl"
            square
            aria-label="Color picker"
            class="cursor-pointer"
          /> -->
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>

<style>
/* import the required styles */
@import "@vue-flow/core/dist/style.css";

/* import the default theme (optional) */
/* @import "@vue-flow/core/dist/theme-default.css"; */

@import "@vue-flow/controls/dist/style.css";
@import "@vue-flow/minimap/dist/style.css";
</style>
