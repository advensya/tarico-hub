import type { IFlowState } from ".";

/**
 * 1. Interface de Transition (L'Arête / L'Événement)
 * Décrit les actions possibles pour un état donné.
 * Clé: Nom de l'événement (ex: 'APPROVE', 'REJECT').
 * Valeur: ID de l'état cible (ex: '1763659482289').
 */
export interface TransitionMap {
  [eventName: string]: string; // string (ID de l'état cible)
}

/**
 * 2. Interface d'État (Le Nœud)
 * Contient toutes les propriétés d'un état (nœud) dans le workflow.
 */
export interface StateDefinition {
  /** Nom logique de l'état (ex: 'pending', 'draft'). */
  name: string;

  /** Type de l'état pour les besoins d'affichage ou de logique d'exécution. */
  type: "initial" | "standard" | "final" | "decision";

  /** Définition des transitions possibles depuis cet état. */
  on: TransitionMap;

  /** Actions à exécuter au moment d'entrer ou de quitter l'état (les "Hooks"). */
  actions?: {
    onEntry?: string; // Nom de la fonction ou du microservice à exécuter (ex: 'sendEmailToManager')
    onExit?: string;
  };

  /** (Optionnel) Les rôles requis pour effectuer une transition depuis cet état. */
  requiredRoles?: string[];
}

/**
 * 3. Interface de Définition de Workflow
 * Le conteneur principal qui représente l'intégralité du workflow créé dans Vue Flow.
 */
export interface WorkflowDefinition {
  /** ID unique de cette définition de workflow (ex: 'leave-request-v1'). */
  id: string;

  /** Nom lisible (ex: 'Procédure de demande de congés'). */
  name: string;

  /** Version du schéma de workflow (CRITIQUE pour le SIRH). */
  version: number;

  /** L'ID du nœud par lequel le workflow doit commencer. */
  initialStateId: string;

  /** Map de tous les états du workflow. Clé: ID du nœud Vue Flow (ex: 'start'). */
  states: Record<string, StateDefinition>;
}
