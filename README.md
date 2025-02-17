# Task1: Descision Tree

```
yarn install

npx tsc

node dist/server.js
```

## Make a request

curl -X POST http://localhost:3005/process-tree \
  -H "Content-Type: application/json" \
  -d '[
    {
      "action": "send_sms",
      "params": ["+42342342342", "Hello Hello, Just an SMS Action"]
    },
    {
      "condition": "new Date().toISOString().startsWith(\"2025-01-01\")",
      "trueAction": {
        "action": "send_sms",
        "params": ["+42342342342", "Hello Hello, Condition is True"]
      }
    },
    {
      "condition": "Math.floor(Math.random() * 5) + 1 === 4",
      "loop": 10,
      "trueAction": {
        "action": "send_sms",
        "params": ["+42342342342", "Hello Hello, Condition is True"]
      }
    },
    {
      "steps": [
        {
          "action": "send_email",
          "params": ["new-awesome-user@email.com", "Welcome to our platform!"]
        },
        {
          "action": "send_email",
          "params": ["new-awesome-user2@email.com", "Welcome to our platform!"]
        }
      ]
    }
  ]'


# Task2: Turning a WebApp into SaaS