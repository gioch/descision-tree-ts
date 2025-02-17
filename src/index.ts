const sendEmail = (email: string, message?: string) => {
  console.log(`Sending EMAIL to ${email}`)
}

const sendSms = (phone_num: string, message?: string) => {
  console.log(`Sending SMS to ${phone_num}`)
}

const PREDEFINED_ACTIONS: { [key: string]: Function } = {
  send_email: sendEmail,
  send_sms: sendSms,
};

interface ActionNode {
  action: keyof typeof PREDEFINED_ACTIONS;
  params: any[];
}

interface ConditionNode {
  condition: string;
  loop?: number;
  trueAction?: DecisionTreeNode;
  falseAction?: DecisionTreeNode;
}

interface StepsNode {
  steps: Array<ActionNode>;
}

type DecisionTreeNode = ActionNode | ConditionNode | StepsNode;

class DecisionTreeSerializer {
  static toJSON(nodes: DecisionTreeNode | DecisionTreeNode[]): any {
    // Handle if input is a single node or an array of nodes
    if (Array.isArray(nodes)) {
      return nodes.map(node => this.toJSON(node)); // Process each node in the array
    }

    // Handle ActionNode
    if ("action" in nodes) {
      return {
        action: nodes.action,
        params: nodes.params,
      };
    }

    // Handle ConditionNode
    if ("condition" in nodes) {
      return {
        condition: nodes.condition,
        loop: nodes.loop,
        trueAction: nodes.trueAction ? this.toJSON(nodes.trueAction) : undefined,
        falseAction: nodes.falseAction ? this.toJSON(nodes.falseAction) : undefined,
      };
    }

    // Handle StepsNode
    if ("steps" in nodes) {
      return {
        steps: nodes.steps.map(this.toJSON),
      };
    }

    return {};
  }

  static fromJSON(json: any): DecisionTreeNode | DecisionTreeNode[] {
    // If the input is an array, return an array of nodes
    if (Array.isArray(json)) {
      return json.map((item) => this.fromJSON(item) as DecisionTreeNode); // Ensure recursion works for each item
    }
  
    // Handle ActionNode
    if (json.action) {
      return {
        action: json.action,
        params: json.params,
      };
    }
  
    // Handle ConditionNode
    if (json.condition) {
      const trueAction = json.trueAction ? this.fromJSON(json.trueAction) as DecisionTreeNode : undefined;
      const falseAction = json.falseAction ? this.fromJSON(json.falseAction) as DecisionTreeNode : undefined;

  
      return {
        condition: json.condition,
        loop: json.loop,
        trueAction,
        falseAction,
      };
    }
  
    if (json.steps) {
      return {
        steps: json.steps.map(this.fromJSON), // Recursively process each step
      };
    }
  
    return {} as DecisionTreeNode[]; 
  }
}

class DecisionTreeProcessor {
  static processAction = (node: ActionNode) => {
    let actionFunc = PREDEFINED_ACTIONS[node?.action]

    if(actionFunc) {
      actionFunc(...node?.params);
    } else {
      console.log('Unsupported Action')
    }
  }

  static processConditional = (node: ConditionNode) => {
    let result = eval(node?.condition)
    
    if(result && node?.trueAction) {
      this.process(node?.trueAction)
    } else if(!result && node?.falseAction) {
      this.process(node?.falseAction)
    }
  }

  static process = (node: DecisionTreeNode) => {
    if ("action" in node) {
      this.processAction(node)
    } else if ("condition" in node) {
      if (node.loop !== undefined) {
        for(let i = 0; i < node.loop; i++) {
          this.processConditional(node)
        }
      } else {
        this.processConditional(node)
      }      
    } else if ("steps" in node) {
      for (const actionNode of node.steps) {
        this.processAction(actionNode);
      }
    }
  }
}

const nodes: Array<DecisionTreeNode> = [
  {
    action: "send_sms",
    params: ["+42342342342", "Hello Hello, Just an SMS Action"],
  },
  {
    action: "send_email",
    params: ["handsom-person@email.com", "Hello Hello, Just an EMAIL Action"],
  },
  {
    condition: 'new Date().toISOString().startsWith("2025-01-01")',
    trueAction: {
      action: "send_sms",
      params: ["+42342342342", "Hello Hello, Condition is True"],
    },
  },
  {
    condition: 'new Date().toISOString().startsWith("2025-01-01")',
    trueAction: {
      action: 'send_email',
      params: ["handsom-person@email.com", "Hello Hello, Condition is True"],
    },
  },
  {
    condition: 'Math.floor(Math.random() * 5) + 1 === 4',
    loop: 10,
    trueAction: {
      action: 'send_email',
      params: ["handsom-person@email.com", "Hello Hello, Condition is True"],
    },
  },
  {
    steps: [
      {
        action: "send_email",
        params: ["new-awesome-user@email.com", "Welcome to our platform!"],
      },
      {
        action: "send_email",
        params: ["new-awesome-user2@email.com", "Welcome to our platform!"],
      },
    ],
  },
]


console.log('Start Processing Nodes')

nodes.forEach((node) => {
  DecisionTreeProcessor.process(node)
})