# Import Patterns Guide for Beginners

## Overview

This guide explains different import/export patterns used in this project and when to use each one. Understanding these patterns is crucial for writing clean, maintainable TypeScript code.

---

## Table of Contents

1. [Basic Import Syntax](#basic-import-syntax)
2. [Type-Only Imports](#type-only-imports)
3. [Barrel Exports](#barrel-exports)
4. [Common Patterns in This Project](#common-patterns-in-this-project)
5. [Step-by-Step Examples](#step-by-step-examples)
6. [Best Practices](#best-practices)

---

## Basic Import Syntax

### Regular Imports (For Values)

Use when importing **functions, classes, components, or any runtime values**:

```typescript
// Import a React component
import Button from '@/components/Button';

// Import multiple items
import { useState, useEffect } from 'react';

// Import with alias
import { Link as RouterLink } from 'react-router-dom';
```

### Type Imports (For Types Only)

Use `type` keyword when importing **only TypeScript types/interfaces**:

```typescript
// Import only types (good for bundling)
import type { StoryData, Locale } from '@/types';

// Import types AND values (rare, but possible)
import type { StoryData } from '@/types';
import { StoryService } from '@/lib/stories';
```

---

## Type-Only Imports

### What Are Type-Only Imports?

```typescript
import type { TypeName } from 'module';
```

The `type` keyword tells TypeScript: "This import is only for types, not runtime values."

### Why Use Type-Only Imports?

#### ✅ Benefits:

1. **Better Tree-Shaking**
   - Type imports are removed during build
   - Smaller bundle size

2. **Clear Intent**
   - Signals "this is a type, not runtime code"
   - Easier to understand code

3. **Performance**
   - TypeScript can optimize better
   - Faster builds

### When to Use Type-Only Imports

**Use `import type` when:**
- ✅ Importing interfaces or types
- ✅ Importing for type annotations only
- ✅ NOT using the import at runtime

**Don't use `type` when:**
- ❌ Importing React components (they're runtime values)
- ❌ Importing functions you'll call
- ❌ Importing objects you'll use

### Real Examples from Our Project

#### ✅ Correct Type-Only Imports

```typescript
// src/components/Button.tsx
import type { ButtonProps } from '@/types/component.types';

export default function Button({ children, className }: ButtonProps) {
  return <button className={className}>{children}</button>;
}
```

```typescript
// src/lib/story-parser.ts
import type { StoryData, Locale } from '@/types';
```

#### ❌ Incorrect (Would Cause Errors)

```typescript
// WRONG - Can't use type keyword for runtime values
import type { Button } from '@/components/Button'; // Button is a component!
import type { getStoryData } from '@/lib/stories'; // getStoryData is a function!

// WRONG - This would fail at runtime
const ButtonComponent = Button; // Button is undefined!
```

---

## Barrel Exports

### What Are Barrel Exports?

A "barrel" is a file that re-exports from multiple other files.

**File**: `src/types/index.ts`
```typescript
// Barrel export for all types
export * from './story.types';
export * from './component.types';
export * from './hook.types';
```

### Why Use Barrel Exports?

#### ✅ Benefits:

1. **Single Import Point**
   ```typescript
   // Instead of:
   import type { StoryData } from '@/types/story.types';
   import type { ButtonProps } from '@/types/component.types';

   // You can do:
   import type { StoryData, ButtonProps } from '@/types';
   ```

2. **Cleaner Imports**
   - Shorter import statements
   - Easier to remember

3. **Better Organization**
   - All types in one place
   - Easy to discover

### When to Use Barrel Exports

**Use barrel exports for:**
- ✅ Types (like our `/types` directory)
- ✅ Library utilities
- ✅ Component libraries
- ✅ API exports

**Don't use for:**
- ❌ Random unrelated items
- ❌ Just 2-3 simple items

### Real Examples from Our Project

#### ✅ Barrel Export for Types

**File**: `src/types/index.ts`
```typescript
export * from './story.types';      // StoryData, Locale, etc.
export * from './component.types';   // ButtonProps, etc.
export * from './hook.types';        // Hook signatures
```

**Usage**:
```typescript
// src/components/Button.tsx
import type { ButtonProps } from '@/types';

// src/components/FeaturedStories.tsx
import type { FeaturedStoriesProps } from '@/types';
```

#### ✅ Barrel Export for Library

**File**: `src/lib/index.ts`
```typescript
export * from './stories';
export * from './story-service';
export * from './story-parser';
```

**Usage**:
```typescript
// Can import from single point
import { StoryService, parseStoryFile } from '@/lib';
```

---

## Common Patterns in This Project

### Pattern 1: Type Imports from Barrel

```typescript
// src/components/Button.tsx
import type { ButtonProps } from '@/types';

export default function Button(props) {
  // Use ButtonProps type for type checking
}
```

### Pattern 2: Value Imports (No type keyword)

```typescript
// src/app/[locale]/page.tsx
import { getSortedStoriesData } from '@/lib/stories';
// NOT: import type { getSortedStoriesData }

export default async function Home({ params }) {
  const stories = await getSortedStoriesData(locale); // Called at runtime!
  return <HomePageClient stories={stories} />;
}
```

### Pattern 3: Mixed Imports

```typescript
// src/components/FeaturedStories.tsx
import { useTranslations } from 'next-intl';        // Runtime value
import { Link } from '@/navigation';                 // Runtime value
import type { FeaturedStoriesProps } from '@/types'; // Type only
import Section from '@/components/ui/Section';       // Runtime value
```

### Pattern 4: Re-export for Compatibility

```typescript
// src/lib/stories.ts
// Re-export all types from centralized location
export * from '@/types';

// Also export functions
export { StoryService } from './story-service';
export const getSortedStoriesData = StoryService.getSortedStoriesData;
```

---

## Step-by-Step Examples

### Example 1: Creating a Type-Only Import

**Step 1**: Define the type in a types file

```typescript
// src/types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}
```

**Step 2**: Re-export in barrel

```typescript
// src/types/index.ts
export * from './user.types';
```

**Step 3**: Import with type keyword

```typescript
// src/components/UserProfile.tsx
import type { User } from '@/types';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return <div>{user.name}</div>;
}
```

### Example 2: Creating a Barrel Export

**Step 1**: Create utility functions

```typescript
// src/utils/format.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
```

**Step 2**: Create barrel export

```typescript
// src/utils/index.ts
export * from './format';
export * from './math';
export * from './string';
```

**Step 3**: Import from barrel

```typescript
// src/components/OrderSummary.tsx
import { formatDate, formatPrice } from '@/utils';

export default function OrderSummary() {
  return <div>{formatPrice(99.99)}</div>;
}
```

### Example 3: Component with Types

**Step 1**: Define component and props type

```typescript
// src/components/Card.tsx
import type { WithChildren, WithClassName } from '@/types';

export interface CardProps extends WithClassName, WithChildren {
  title?: string;
  footer?: React.ReactNode;
}
```

**Step 2**: Use the type

```typescript
// src/components/Card.tsx
export default function Card({ title, footer, children, className }: CardProps) {
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}
      <div>{children}</div>
      {footer && <div>{footer}</div>}
    </div>
  );
}
```

**Step 3**: Import and use

```typescript
// src/pages/Dashboard.tsx
import type { CardProps } from '@/types';
import Card from '@/components/Card';

export default function Dashboard() {
  const cardProps: CardProps = {
    title: 'Statistics',
    children: <p>Some content</p>,
    className: 'bg-white'
  };

  return <Card {...cardProps} />;
}
```

---

## Best Practices

### DO ✅

1. **Use type-only imports for types**
   ```typescript
   import type { StoryData } from '@/types';
   ```

2. **Keep type definitions separate**
   ```typescript
   // Good: In types file
   // src/types/component.types.ts

   // Bad: Inline in component
   export default function Component() {
     interface Props { ... } // ❌ Hard to reuse
   }
   ```

3. **Use barrel exports for organization**
   ```typescript
   import type { StoryData, ButtonProps } from '@/types';
   ```

4. **Be explicit when helpful**
   ```typescript
   // Clear where types come from
   import type { StoryData } from '@/types/story.types';
   ```

### DON'T ❌

1. **Don't use type keyword for runtime values**
   ```typescript
   // ❌ WRONG
   import type { Button } from '@/components/Button';
   import type { getStoryData } from '@/lib/stories';

   // ✅ CORRECT
   import Button from '@/components/Button';
   import { getStoryData } from '@/lib/stories';
   ```

2. **Don't over-use barrel exports**
   ```typescript
   // ❌ Unnecessary
   export * from './button';
   export * from './card';
   export * from './modal';
   // If you only have a few, import directly!
   ```

3. **Don't mix type and value imports carelessly**
   ```typescript
   // ❌ Confusing
   import type { StoryData } from '@/types';
   import { StoryService } from '@/lib/stories'; // Why separate lines?

   // ✅ Clearer
   import type { StoryData } from '@/types';
   import { StoryService } from '@/lib/stories';
   ```

### How to Decide

| What are you importing? | Import syntax |
|-------------------------|---------------|
| React component | `import Component from '@/path'` |
| Function you'll call | `import { functionName } from '@/path'` |
| Type/Interface | `import type { TypeName } from '@/path'` |
| Multiple types | `import type { Type1, Type2 } from '@/types'` |
| Library utilities | `import { util1, util2 } from '@/utils'` |

---

## Quick Reference

### Import Patterns Cheat Sheet

```typescript
// 1. Import default export
import Component from '@/components/Component';

// 2. Import named export
import { functionName } from '@/lib/utils';

// 3. Import type only
import type { TypeName } from '@/types';

// 4. Import multiple types
import type { Type1, Type2, Type3 } from '@/types';

// 5. Import value AND type
import Component from '@/components/Component';
import type { ComponentProps } from '@/types';

// 6. Import everything from barrel
import { util1, util2, util3 } from '@/lib';

// 7. Rename on import
import { originalName as newName } from '@/module';

// 8. Default AND named imports
import Component, { helperFunction } from '@/module';
```

---

## Common Errors and Fixes

### Error 1: "Cannot find module" or "Module has no exported member"

**Problem**: Typo in import path or export name

```typescript
// ❌ WRONG
import type { StroyData } from '@/types'; // Typo!

// ✅ CORRECT
import type { StoryData } from '@/types';
```

### Error 2: "Type annotation cannot use import"

**Problem**: Using value import where type is expected

```typescript
// ❌ WRONG
import { StoryData } from '@/types'; // Value import

interface Props {
  story: StoryData; // Error: StoryData is a value, not a type!
}

// ✅ CORRECT
import type { StoryData } from '@/types'; // Type import

interface Props {
  story: StoryData; // ✅ Works!
}
```

### Error 3: "Is not assignable because it is a type"

**Problem**: Using type import where value is expected

```typescript
// ❌ WRONG
import type { Button } from '@/components/Button';

function MyButton() {
  return <Button>Click me</Button>; // Error: Button is a type, not a value!
}

// ✅ CORRECT
import Button from '@/components/Button';

function MyButton() {
  return <Button>Click me</Button>; // ✅ Works!
}
```

---

## Testing Your Understanding

### Quiz: What type of import should you use?

**Scenario 1**: Importing the `StoryData` interface
```typescript
// Answer:
import type { StoryData } from '@/types';
```

**Scenario 2**: Importing the `Button` React component
```typescript
// Answer:
import Button from '@/components/Button';
```

**Scenario 3**: Importing the `getStoryData` function
```typescript
// Answer:
import { getStoryData } from '@/lib/stories';
```

**Scenario 4**: Importing multiple types from the barrel
```typescript
// Answer:
import type { StoryData, ButtonProps, Locale } from '@/types';
```

---

## Summary

1. **Type-only imports** (`import type`) for types only
2. **Regular imports** for runtime values
3. **Barrel exports** for clean organization
4. **Be explicit** when it helps clarity
5. **Use the right pattern** for your use case

**Remember**: If you'll use it at runtime (call, render, etc.), it's a value import. If it's only for type checking, it's a type import!

---

**Happy Coding!** 🚀

For more details, see:
- [TypeScript Handbook - Type-Only Imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-exports)
- [PROJECT_BLUEPRINT.md](./PROJECT_BLUEPRINT.md)
- [typescript-interfaces-plan.md](./typescript-interfaces-plan.md)
