"use strict";
var _a;
const sendEmail = (email, message) => {
    console.log(`Sending EMAIL to ${email}`);
};
const sendSms = (phone_num, message) => {
    console.log(`Sending SMS to ${phone_num}`);
};
const PREDEFINED_ACTIONS = {
    send_email: sendEmail,
    send_sms: sendSms,
};
class DecisionTreeSerializer {
    static toJSON(nodes) {
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
    static fromJSON(json) {
        // If the input is an array, return an array of nodes
        if (Array.isArray(json)) {
            return json.map((item) => this.fromJSON(item)); // Ensure recursion works for each item
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
            const trueAction = json.trueAction ? this.fromJSON(json.trueAction) : undefined;
            const falseAction = json.falseAction ? this.fromJSON(json.falseAction) : undefined;
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
        return {};
    }
}
class DecisionTreeProcessor {
}
_a = DecisionTreeProcessor;
DecisionTreeProcessor.processAction = (node) => {
    let actionFunc = PREDEFINED_ACTIONS[node === null || node === void 0 ? void 0 : node.action];
    if (actionFunc) {
        actionFunc(...node === null || node === void 0 ? void 0 : node.params);
    }
    else {
        console.log('Unsupported Action');
    }
};
DecisionTreeProcessor.processConditional = (node) => {
    let result = eval(node === null || node === void 0 ? void 0 : node.condition);
    if (result && (node === null || node === void 0 ? void 0 : node.trueAction)) {
        _a.process(node === null || node === void 0 ? void 0 : node.trueAction);
    }
    else if (!result && (node === null || node === void 0 ? void 0 : node.falseAction)) {
        _a.process(node === null || node === void 0 ? void 0 : node.falseAction);
    }
};
DecisionTreeProcessor.process = (node) => {
    if ("action" in node) {
        _a.processAction(node);
    }
    else if ("condition" in node) {
        if (node.loop !== undefined) {
            for (let i = 0; i < node.loop; i++) {
                _a.processConditional(node);
            }
        }
        else {
            _a.processConditional(node);
        }
    }
    else if ("steps" in node) {
        for (const actionNode of node.steps) {
            _a.processAction(actionNode);
        }
    }
};
const nodes = [
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
];
console.log('Start Processing Nodes');
nodes.forEach((node) => {
    DecisionTreeProcessor.process(node);
});
