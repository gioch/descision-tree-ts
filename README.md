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

This is a classic situation when we need to support multi-tenancy.
I have experience with multi-tenant apps during my work with a Silicon Valley medical startup, where each medical facility is a tenant.

1) How can we design the system in a way that every company will be able to serve games on their gaming site from their domain?
  * We have a tenant. Each tenant has a unique tenant_id.
  * At the domain level, we can have subdomains for each tenant ("cool_games_FPQE.oursaas.com" or "luck_games_IQSE.oursaas.com"), which can then be mapped to custom domains.
  * At the DB level, we can have two approaches:
    - Single schema DB: Each table has a mandatory tenant_id column, and every request from a subdomain will add the tenant_id to every DB query (e.g., WHERE tenant_id = "tenant_id").
    - Multi-schema DB: Each tenant has the same copy of the DB structure, but data is isolated only to that tenant. Each API request will start by switching to that schema based on the subdomain.

2) What modification should be done to the users table at gPlatform to support this change?
We can identify which users belong to which company, and therefore, based on the DB schema chosen from question 1, we can take multiple approaches:
  * If using a single schema: We add tenant_id to every relevant table column. If a user can belong to multiple tenants, we can create a many-to-many relationship between users and tenants. We can create a new model called UserAccess (tenant_id, user_id), which will act as a join table.

  * In the case of a multi-schema approach: We would need to write a migration to move users to their respective tenant schemas. If a user belongs to multiple tenants, information would be copied over. Alternatively, the same UserAccess table can be placed in a global schema to avoid duplication of passwords and emails.

3) How can we validate a user login on one gaming domain in such a way that it does not give access to a different gaming domain?
  Since we add tenant differentiation, when a user logs in, they will only access data from that specific tenant. Data from other tenants will be inaccessible.