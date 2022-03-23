# 🚀 Front DDD Skeleton: the boilerplate

> ⚡ Start your TS/React projects as fast as possible

## Project structure

```
├── pages
│   └── route
│       └── index.tsx
└── src
    ├── components
    ├── context
    │   ├── application
    │   │   └── [context]
    │   │        └── useCase
    │   ├── domain
    │   │   └── [context]
    │   │        ├── ValueObjects
    │   │        ├── Repositories
    │   │        └── Entities
    │   ├── infra
    │   │   └── [context]
    │   │        ├── IO Things
    │   │        └── RepositoriesImplement
    │   └── workflow
    │       ├── index
    │       └── [context]
    │            └── mountedUseCase
    └── sections
        └── [context]
             └── index.tsx
```

## Explicacion de cada bloque

### context

This is the part where we will have our different domains we can invert the folder structure from [application|domain|infra|workflow] -> context to context -> [application|domain|infra|workflow]

It depends on the number of contexts and their sizes, the second method is easier to promote

### application

We will define the use cases, we should use only domain elements. We will use a partial application function to be able to inject the dependencies.

The result of our use case must always return a promise, we will use a utility to pass this promise to a tuple with the error and the result. [err, value]

```ts
import { StoreItem } from "../../domain/useCaseA/StoreItem";

const useCase = (dependencie: StoreItem) =>
  useCase(async (some) => {
    // Do things...
    return Promise.resolve();
  });
```

### domain

For each element of our domain we will have a module that represents it.
This module will contain its type, the smart constructors that it needs and functions that work on that type.

In addition we will have the types of the repositories.

```ts
// CardNumber.ts
export type CardNumber = Brand<number, "CardNumber">;

export const cardNubmer = (value: number): CardNumber => {
  // Validate is correct number

  return value as CardNumber;
};

// CardSuit.ts
export type CardSuit = Brand<string, "CardSuit">;

export const cardSuit = (value: string): CardSuit => {
  // Validate is correct suit

  return value as CardSuit;
};

// Card.ts
import { CardSuit, cardSuit } from "./CardSuit";
import { CardNumber, cardNubmer } from "./CardNumber";

export type Card = {
  suit: CardSuit;
  number: CardNumber;
};

export const cardFromPrimitives = (number: number, suit: string): Card => ({
  suit: cardSuit(suit),
  number: cardNubmer(number),
});

// Deck.ts
export type Deck = Card[];

export const deckFromPrimitives = (cards: [[number, string]]): Deck =>
  cards.map((card) => cardFromPrimitives(...card));

export const shuffle = (deck: Deck): Deck => {
  // shuffle cards
  return deck;
};

// DeckRepository.ts
import { Deck } from "./CardSuit";

export type saveDeck = (deck: Deck) => void;
```

### infra

Here we will implement the repositories and IO stuff.

```ts
import { StoreItem } from "../../domain/useCaseA/StoreItem";

export const InMemoryStoreItem: StoreItem = (item) => {
  // Do things...
};
```

### workflow

We will use this folder as an injector of dependencies of our use cases
and we will register them in the container to be able to call them in a lazy way in our views.

```ts
// workflow/useCaseA
import { useCaseA } from "../../application/useCaseA";
import { InMemoryStoreItem } from "../../infra/useCaseA/InMemoryStoreItem";

export default useCaseA(InMemoryStoreItem);

// workflow/index.ts
import Container from "@/utils/Container";

export const container = Container.of({
  // Other use cases
  useCaseA: () => import("./useCaseA"),
});
```

### components

Here we will put the visual components, we can structure the components with an atomic design or similar.

### sections

We will have sections of our ui that have logic, we divide it this way to not have a container component that has 200 props.

We will use the ui components and the use case container.

### pages

We will build our pages using the following sections.
