# StageFlux Browser API

Please register for an account to use StageFlux at https://www.stageflux.com.

## Install

> npm i --save @stage-flux/browser

## Init

```typescript
import { init } from '@stage-flux/browser';

async function myCode() {
  const stageFluxAPI = await init('<YOUR SITE ID HERE>');
}
```

## Identify user

```typescript
stageFluxAPI.identify('<USER ID HERE>', { optionalTraits: 'here' });
```

## Set traits for user

- The user first has to be identified

```typescript
stageFluxAPI.traits({ optionalTraits: 'here' });
```

## Track event

- The user first has to be identified

```typescript
stageFluxAPI.event('<Event name>', { optionalProperties: 'here' });
```

## Track multiple events

- The user first has to be identified

```typescript
stageFluxAPI.events([
  { name: '<Event name>', properties: { optionalProperties: 'here' } },
  { name: '<Event name 2>' },
]);
```

## Track page

- The user first has to be identified
- StageFlux will automatically track page history changes if not explicitly disabled

```typescript
stageFluxAPI.page('<Page name>', '<Page category>');
```