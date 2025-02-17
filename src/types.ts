export interface ActionNode {
  action: keyof typeof PREDEFINED_ACTIONS;
  params: any[];
}

export interface ConditionNode {
  condition: string;
  loop?: number;
  trueAction?: DecisionTreeNode;
  falseAction?: DecisionTreeNode;
}

export interface StepsNode {
  steps: Array<ActionNode>;
}

export type DecisionTreeNode = ActionNode | ConditionNode | StepsNode;
