# Complete TypeScript Tutorial
## Real-World Examples from New Muslim Stories Project

Welcome! This comprehensive tutorial teaches you TypeScript from beginner to advanced level by examining a real, production-ready application. Each concept is explained with actual code from the project.

---

## Table of Contents
1. [TypeScript Basics & Configuration](#1-typescript-basics--configuration)
2. [Primitive Types & Type Annotations](#2-primitive-types--type-annotations)
3. [Interfaces](#3-interfaces)
4. [Type Aliases](#4-type-aliases)
5. [Union Types](#5-union-types)
6. [Literal Types](#6-literal-types)
7. [Function Types & Signatures](#7-function-types--signatures)
8. [Array Types](#8-array-types)
9. [Object Types](#9-object-types)
10. [Type Assertions & Type Guards](#10-type-assertions--type-guards)
11. [Type Imports & Exports](#11-type-imports--exports)
12. [Extending Interfaces](#12-extending-interfaces)
13. [Mapped Types](#13-mapped-types)
14. [Generic Types](#14-generic-types)
15. [Utility Types](#15-utility-types)
16. [Type Extensions (React)](#16-type-extensions-react)
17. [Type Safety Best Practices](#17-type-safety-best-practices)
18. [Advanced Patterns](#18-advanced-patterns)

---

## 1. TypeScript Basics & Configuration

### TypeScript Configuration
**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",              // JavaScript version to compile to
    "lib": ["dom", "dom.iterable", "esnext"],  // Type definitions
    "allowJs": true,                 // Allow JavaScript files
    "skipLibCheck": true,            // Skip type checking of declaration files
    "strict": true,                  // Enable all strict type checking
    "noEmit": true,                  // Don't emit compiled files
    "esModuleInterop": true,         // Better module interop
    "module": "esnext",              // Module system
    "moduleResolution": "bundler",   // How modules resolve
    "resolveJsonModule": true,       // Import JSON files
    "isolatedModules": true,         // Ensure each file can be transpiled
    "jsx": "preserve",               // JSX handling
    "incremental": true,             // Incremental compilation
    "paths": {
      "@/*": ["./src/*"]             // Path aliases
    }
  }
}
```

**Key Configuration Options:**
- `"strict": true` - Enables all strict checking options
  - `noImplicitAny`: Don't allow `any` type
  - `strictNullChecks`: Better null/undefined handling
  - `strictFunctionTypes`: Strict function type checking
  - `noImplicitReturns`: Functions must return on all code paths
- `"noEmit": true` - TypeScript doesn't output JS files (Next.js handles this)
- `"paths"` - Configure aliases for clean imports

### TypeScript Strict Mode
When `"strict": true` is enabled, TypeScript enforces:
- No implicit `any`
- Explicit return types
- Null/undefined checks
- Property initialization

---

## 2. Primitive Types & Type Annotations

### Basic Types
TypeScript has several primitive types.

**Example: String Type**
```typescript
// Type annotation
const title: string = "New Muslim Stories";

// Inferred type
const description = "Inspiring journeys to Islam";  // Inferred as string
```

**Example: Number Type**
```typescript
// Type annotation
const age: number = 25;

// Inferred type
const count = 10;  // Inferred as number
```

**Example: Boolean Type**
```typescript
// Type annotation
const isFeatured: boolean = true;

// Inferred type
const isPublished = false;  // Inferred as boolean
```

### Type Annotation in Functions
**File:** `src/lib/story-parser.ts`

```typescript
/**
 * Extracts slug from filename (handles both en and ar locales)
 */
function extractSlug(fileName: string): string {  // ← Parameters and return type annotated
  const isArabic = fileName.endsWith('-ar.md');
  return isArabic
    ? fileName.replace(/-ar\.md$/, '')
    : fileName.replace(/\.md$/, '');
}
```

**Type Annotations Explained:**
- `fileName: string` - Parameter must be a string
- `: string` (after params) - Return value must be a string
- Without annotations, TypeScript infers types automatically
- With `"strict": true`, you should always annotate

---

## 3. Interfaces

### What are Interfaces?
Interfaces define the structure (shape) of objects. They describe what properties an object should have.

**Basic Interface Definition**
**File:** `src/types/story.types.ts`

```typescript
// Story data structure
export interface StoryData {
  slug: string;                    // Required string
  title: string;                   // Required string
  firstName: string;               // Required string
  age: number;                     // Required number
  country: string;                 // Required string
  previousReligion: string;        // Required string
  profilePhoto: string;            // Required string
  featured: boolean;               // Required boolean
  language: Locale;                // Required Locale type
  contentHtml: string;             // Required string
}
```

**Using an Interface:**
```typescript
// Create an object matching the interface
const story: StoryData = {
  slug: "barbara-story",
  title: "Barbara's Journey",
  firstName: "Barbara",
  age: 32,
  country: "USA",
  previousReligion: "Christianity",
  profilePhoto: "/images/barbara.jpg",
  featured: true,
  language: "en",
  contentHtml: "<p>Barbara's story...</p>"
};
```

### Optional Properties
**File:** `src/types/component.types.ts`

```typescript
export interface WithClassName {
  className?: string;  // ← ? makes it optional
}
```

**Using Optional Properties:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';  // Optional
  size?: 'small' | 'medium' | 'large'; // Optional
}

function Button({ children, variant = 'primary' }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}

// All of these work:
<Button>Click me</Button>                         // variant defaults to 'primary'
<Button variant="secondary">Click me</Button>    // Explicit variant
<Button variant="secondary" size="large">Click me</Button>  // All props
```

### Readonly Properties
```typescript
interface Config {
  readonly apiKey: string;  // Cannot be modified after creation
  readonly timeout: number;
}

const config: Config = {
  apiKey: "abc123",
  timeout: 5000
};

// config.apiKey = "xyz";  // ❌ Error: Cannot assign to 'apiKey' because it is read-only
```

### Index Signatures
```typescript
interface StringMap {
  [key: string]: string;  // Any number of string keys with string values
}

const translations: StringMap = {
  welcome: "Welcome",
  hello: "Hello",
  goodbye: "Goodbye"
};
```

---

## 4. Type Aliases

### What are Type Aliases?
Type aliases create a new name for a type. They're similar to interfaces but can alias any type.

**Basic Type Alias**
**File:** `src/types/story.types.ts`

```typescript
// Type alias for locale
export type Locale = 'en' | 'ar';

// Usage:
const currentLocale: Locale = 'en';  // Can only be 'en' or 'ar'
```

**Type Alias for Arrays**
**File:** `src/types/story.types.ts`

```typescript
// Type alias for story list
export type StoryList = StoryData[];

// Usage:
const stories: StoryList = [
  // Array of StoryData objects
];
```

**Type Alias for Objects**
```typescript
// Mapped type (covered later)
export type StoriesByLocale = {
  [K in Locale]: StoryData[];
};

// Usage:
const storiesByLocale: StoriesByLocale = {
  en: [/* English stories */],
  ar: [/* Arabic stories */]
};
```

### When to Use Type Aliases vs Interfaces

**Use Type Aliases when:**
- Creating union types
- Creating mapped types
- Aliasing primitives
- Creating complex type transformations

**Use Interfaces when:**
- Defining object shapes
- Extending object types
- Providing implementation
- Better for object-oriented design

---

## 5. Union Types

### What are Union Types?
A union type allows a value to be one of several types.

**Basic Union Type**
**File:** `src/types/story.types.ts`

```typescript
// Locale can be 'en' OR 'ar'
export type Locale = 'en' | 'ar';
```

**Using Union Types:**
```typescript
function formatMessage(locale: Locale, message: string): string {
  if (locale === 'en') {
    return message;  // Return as-is for English
  } else {
    return `${message} (Arabic)`;  // Add marker for Arabic
  }
}

// Valid calls:
formatMessage('en', 'Hello');       // ✅ Valid
formatMessage('ar', 'مرحبا');       // ✅ Valid
formatMessage('fr', 'Bonjour');     // ❌ Error: 'fr' is not a valid Locale
```

**Union with Multiple Types**
```typescript
// Can be string or number
type Id = string | number;

function getId(id: Id): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());  // TypeScript knows id is string here
  } else {
    console.log(id.toFixed(2));     // TypeScript knows id is number here
  }
}

// Valid calls:
getId('abc123');  // ✅
getId(456);       // ✅
```

### Union with null/undefined
**File:** `src/types/component.types.ts`

```typescript
export interface WithClassName {
  className?: string;  // string | undefined
}
```

The `?` makes the property `type | undefined`:
```typescript
interface Props {
  className?: string;  // Actually: string | undefined
}

function Button({ className }: Props) {
  // TypeScript knows className could be undefined
  if (className) {
    console.log(className.toUpperCase());
  }
}
```

---

## 6. Literal Types

### What are Literal Types?
Literal types are specific values, not just types. Combined with unions, they're very powerful.

**String Literal Types**
**File:** `src/types/component.types.ts`

```typescript
export type Theme = 'light' | 'dark';
```

**Using Literal Types:**
```typescript
// Use in a function
function setTheme(theme: Theme): void {
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.add('dark');
  }
}

// Can only call with these exact values:
setTheme('light');   // ✅
setTheme('dark');    // ✅
setTheme('blue');    // ❌ Error: Argument of type '"blue"' is not assignable to parameter of type 'Theme'
```

**Number Literal Types**
```typescript
type HttpStatus = 200 | 301 | 404 | 500;

function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case 200: return 'OK';
    case 301: return 'Moved Permanently';
    case 404: return 'Not Found';
    case 500: return 'Internal Server Error';
  }
}
```

**Boolean Literal Types**
```typescript
type BooleanLiteral = true | false;

const isActive: BooleanLiteral = true;  // Same as boolean, but explicit
```

---

## 7. Function Types & Signatures

### Function Type Annotations

**Basic Function Type**
```typescript
// Type annotation for function
type GreetingFunction = (name: string) => string;

const greet: GreetingFunction = (name: string) => {
  return `Hello, ${name}!`;
};
```

**Function with Optional Parameters**
```typescript
type LogFunction = (message: string, level?: 'info' | 'warning' | 'error') => void;

const log: LogFunction = (message, level = 'info') => {
  console.log(`[${level.toUpperCase()}] ${message}`);
};

// Valid calls:
log('Starting application');                        // Uses default 'info'
log('Disk full', 'warning');                        // Explicit 'warning'
log('Critical error', 'error' as const);           // Explicit 'error'
```

**Function with Rest Parameters**
```typescript
type SumFunction = (...numbers: number[]) => number;

const sum: SumFunction = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};

// Usage:
sum(1, 2, 3);           // Returns 6
sum(10, 20, 30, 40);    // Returns 100
```

### Method Signatures in Interfaces
**File:** `src/lib/story-service.ts`

```typescript
export class StoryService {
  /**
   * Get all stories for a specific locale, sorted alphabetically
   */
  static async getSortedStoriesData(locale: string): Promise<StoryData[]> {
    // Implementation
  }

  /**
   * Get a specific story by slug and locale
   */
  static async getStoryData(slug: string, locale: string): Promise<StoryData> {
    // Implementation
  }

  /**
   * Get all story slugs with their locales for static generation
   */
  static getAllStorySlugs() {
    // Implementation - inferred return type
  }
}
```

**Key Points:**
- `static` - Method belongs to the class, not instances
- `async` - Returns a Promise
- `: Promise<StoryData[]>` - Return type annotation
- TypeScript infers return types in simple cases

---

## 8. Array Types

### Array Type Declarations

**Using Type Annotation**
```typescript
const storyList: StoryData[] = [
  // Array of StoryData objects
];
```

**Using Generic Array Type**
```typescript
const storyList: Array<StoryData> = [
  // Same as StoryData[]
];
```

**Array of Specific Literals**
```typescript
const themes: Theme[] = ['light', 'dark', 'light', 'dark'];

const locales: Locale[] = ['en', 'ar', 'en', 'ar', 'en'];
```

### Multi-dimensional Arrays
```typescript
// 2D array of numbers
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// 3D array
const cubes: number[][][] = [
  [[1, 2], [3, 4]],
  [[5, 6], [7, 8]]
];
```

### Readonly Arrays
```typescript
// Prevent modification
const readonlyStories: readonly StoryData[] = [...stories];

// readonlyStories.push(newStory);  // ❌ Error
// readonlyStories[0] = otherStory; // ❌ Error
```

**File:** `src/lib/story-service.ts`

```typescript
static async getAllCountries(locale: string): Promise<string[]> {
  const allStories = await this.getSortedStoriesData(locale);
  const countries = new Set(allStories.map(story => story.country));

  return Array.from(countries).sort();
}
```

**Concepts shown:**
- `Promise<string[]>` - Promise that resolves to an array of strings
- `allStories.map()` - Array method returns array
- `Array.from()` - Convert Set to array
- `.sort()` - Array method returns array

---

## 9. Object Types

### Object Type Definition

**Interface vs Object Type**
```typescript
// Interface (recommended for objects)
interface User {
  name: string;
  age: number;
  email: string;
}

// Type alias (also valid)
type UserType = {
  name: string;
  age: number;
  email: string;
};
```

**Nested Object Types**
**File:** `src/types/component.types.ts`

```typescript
// Extends multiple interfaces
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, WithClassName {
  children: React.ReactNode;
}
```

**Object with Method**
```typescript
interface Logger {
  (message: string): void;      // Call signature
  error(message: string): void;  // Method signature
  warn(message: string): void;   // Method signature
}

const logger: Logger = (message: string) => {
  console.log(message);
};

logger.error = (message: string) => {
  console.error(`ERROR: ${message}`);
};

logger.warn = (message: string) => {
  console.warn(`WARNING: ${message}`);
};
```

### Index Signatures in Objects
**File:** `src/types/story.types.ts`

```typescript
// Mapped type with index signature
export type StoriesByLocale = {
  [K in Locale]: StoryData[];  // Index signature using mapped type
};
```

**Manual Index Signature:**
```typescript
// String index signature
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  title: 'New Muslim Stories',
  subtitle: 'Inspiring journeys to Islam'
};

// Number index signature
interface NumberDictionary {
  [index: number]: string;
}

const numberMap: NumberDictionary = {
  0: 'zero',
  1: 'one',
  2: 'two'
};
```

---

## 10. Type Assertions & Type Guards

### Type Assertions

**Using `as` Keyword**
**File:** `src/lib/story-parser.ts`

```typescript
// Combine the data with the slug and contentHtml
const data = matterResult.data as {
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: string;  // This will be type-asserted to Locale
};

return {
  slug,
  contentHtml,
  ...data,
  language: data.language as Locale,  // ← Type assertion
};
```

**Why Type Assertions?**
- When you know more about a type than TypeScript
- When working with external data (JSON, APIs, file system)
- **Use sparingly** - defeats TypeScript's purpose when overused

**Type Assertion vs Type Casting**
```typescript
// Type assertion (TypeScript only, no runtime conversion)
const value = someData as StoryData;

// Type casting (runtime conversion, use with caution)
const value = someData as unknown as StoryData;
```

### Type Guards

**Using `typeof`**
```typescript
function processValue(value: string | number): string {
  // Type guard: check if value is string
  if (typeof value === 'string') {
    return value.toUpperCase();  // TypeScript knows value is string here
  } else {
    return value.toFixed(2);     // TypeScript knows value is number here
  }
}
```

**Using `instanceof`**
```typescript
function logValue(value: Date | string): void {
  if (value instanceof Date) {
    console.log(value.toISOString());  // value is Date
  } else {
    console.log(value.toUpperCase());  // value is string
  }
}
```

**Custom Type Guard**
```typescript
function isStoryData(obj: any): obj is StoryData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string'
  );
}

// Usage:
const maybeStory = getData();

if (isStoryData(maybeStory)) {
  console.log(maybeStory.title);  // TypeScript knows it's StoryData
}
```

### Type Narrowing
**File:** `src/lib/story-parser.ts`

```typescript
function extractSlug(fileName: string): string {
  const isArabic = fileName.endsWith('-ar.md');
  // TypeScript narrows isArabic to true in this branch
  return isArabic
    ? fileName.replace(/-ar\.md$/, '')  // TypeScript knows isArabic === true
    : fileName.replace(/\.md$/, '');     // TypeScript knows isArabic === false
}
```

---

## 11. Type Imports & Exports

### Type-Only Imports
**File:** `src/lib/story-service.ts`

```typescript
import type { StoryData } from './stories';
```

**Why Use `import type`?**
- Only imports types, not values
- Better for tree-shaking
- Clear separation of types and runtime code
- Prevents accidental usage in runtime code

**Value Import**
```typescript
// Imports both type and value
import { StoryData, someFunction } from './module';

// TypeScript includes this in the bundle
```

### Type-Only Exports
**File:** `src/types/index.ts`

```typescript
// Barrel export for all types
export * from './story.types';
export * from './component.types';
export * from './hook.types';
```

**Explicit Type Export**
```typescript
// Export only types
export type { StoryData, Locale, StoryList };
export type { ButtonProps, FeaturedStoriesProps };
```

### Type Re-exports
**File:** `src/lib/index.ts`

```typescript
// Re-export all types
export * from '@/types';

// Import StoryService (value import, not type)
import { StoryService } from './story-service';

// Re-export functions
export const getSortedStoriesData = StoryService.getSortedStoriesData;
export const getStoryData = StoryService.getStoryData;
export const getAllStorySlugs = StoryService.getAllStorySlugs;
```

**Usage:**
```typescript
// Import types
import type { StoryData, Locale } from '@/types';

// Import values
import { getSortedStoriesData } from '@/lib';
```

---

## 12. Extending Interfaces

### Interface Extension
**File:** `src/types/component.types.ts`

```typescript
// Base interface
export interface WithClassName {
  className?: string;
}

export interface WithId {
  id?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

// Extending multiple interfaces
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, WithClassName {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

**How Extension Works:**
```typescript
// ButtonProps effectively becomes:
interface ButtonProps {
  // From React.ButtonHTMLAttributes<HTMLButtonElement>
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // ... many more button attributes

  // From WithClassName
  className?: string;

  // Directly defined
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

**Multiple Interface Extension**
```typescript
interface A {
  a: string;
}

interface B {
  b: number;
}

interface C extends A, B {
  c: boolean;
}

const obj: C = {
  a: 'hello',
  b: 42,
  c: true
};
```

### Overriding Extended Properties
```typescript
interface Base {
  id: string;
  name: string;
}

interface Extended extends Base {
  id: number;  // Override string with number
  name: string; // Re-declare (optional)
}

const obj: Extended = {
  id: 123,      // Now a number, not string
  name: 'Test'
};
```

---

## 13. Mapped Types

### What are Mapped Types?
Mapped types create new types by transforming properties of existing types.

**Basic Mapped Type**
**File:** `src/types/story.types.ts`

```typescript
// Create object type with same keys but StoryData[] values
export type StoriesByLocale = {
  [K in Locale]: StoryData[];
};
```

**How it works:**
1. `K in` - Iterate over each key
2. `Locale` - The union of keys to iterate over
3. `: StoryData[]` - The value type for each key

**Result:**
```typescript
// StoriesByLocale is equivalent to:
{
  en: StoryData[];
  ar: StoryData[];
}
```

### More Complex Mapped Types

**Make All Properties Optional**
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Usage:
type OptionalStoryData = Partial<StoryData>;

// All properties are now optional:
const story: OptionalStoryData = {
  title: 'Some Title'
  // No error - all properties are optional
};
```

**Make All Properties Required**
```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Usage:
type RequiredStoryData = Required<StoryData>;

// All properties are now required:
const story: RequiredStoryData = {
  slug: 'test',           // Required (was optional in Partial)
  title: 'Test',          // Required
  // ... all properties required
};
```

**Make All Properties Readonly**
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Usage:
type ReadonlyStoryData = Readonly<StoryData>;

const story: ReadonlyStoryData = { ... };
// story.slug = 'new';  // ❌ Error: Cannot assign because it's read-only
```

**Keyof Operator**
```typescript
// Get all keys of a type
type StoryDataKeys = keyof StoryData;
// Result: 'slug' | 'title' | 'firstName' | 'age' | 'country' | ... etc

// Usage in mapped type
type StoryDataPropertyTypes = {
  [K in keyof StoryData]: StoryData[K];
};
// Creates a type where each property maps to its own type
```

### Template Literal Types in Mapped Types
```typescript
type ThemeConfig = {
  light: string;
  dark: string;
};

type ThemeColors = {
  [K in keyof ThemeConfig as `color${Capitalize<K>}`]: string;
};

// Result:
// {
//   colorLight: string;
//   colorDark: string;
// }
```

---

## 14. Generic Types

### What are Generics?
Generics allow you to create reusable components/functions that work with multiple types.

**Basic Generic Function**
```typescript
// Generic type parameter T
function identity<T>(arg: T): T {
  return arg;
}

// Usage with explicit type:
const stringResult = identity<string>('hello');        // Returns string
const numberResult = identity<number>(42);              // Returns number

// Usage with type inference:
const inferredString = identity('hello');               // T inferred as string
const inferredNumber = identity(42);                    // T inferred as number
```

**Generic with Interface**
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: { name: 'John', age: 30 },
  status: 200,
  message: 'Success'
};

const storyResponse: ApiResponse<StoryData> = {
  data: { ... },
  status: 200,
  message: 'Success'
};
```

**Generic Constraints**
```typescript
// Constrain T to have specific properties
function getProperty<T extends { id: string }>(obj: T, key: keyof T): any {
  return obj[key];
}

const user = { id: '123', name: 'John' };

getProperty(user, 'id');        // ✅ Valid
getProperty(user, 'name');      // ✅ Valid
getProperty(user, 'email');     // ❌ Error: 'email' is not a key of T
```

**Generic with Default Type**
```typescript
interface Container<T = string> {
  value: T;
}

const stringContainer: Container = { value: 'hello' };  // T defaults to string
const numberContainer: Container<number> = { value: 42 };
```

### Generics in Utility Types
TypeScript's built-in utility types use generics:

```typescript
// Partial<T> - Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Required<T> - Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Readonly<T> - Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick<T, K> - Select specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit<T, K> - Remove specific properties
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

---

## 15. Utility Types

### Built-in Utility Types

**Partial<T> - Make all properties optional**
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Usage:
type PartialStoryData = Partial<StoryData>;

const story: PartialStoryData = {
  title: 'New Title'
  // All other properties are optional
};
```

**Required<T> - Make all properties required**
```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Usage:
type RequiredStoryData = Required<StoryData>;

const story: RequiredStoryData = {
  // ALL properties are required
  slug: 'test',
  title: 'Test',
  firstName: 'John',
  age: 30,
  country: 'USA',
  previousReligion: 'Christian',
  profilePhoto: '/photo.jpg',
  featured: true,
  language: 'en',
  contentHtml: '<p>Content</p>'
};
```

**Readonly<T> - Make all properties readonly**
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Usage:
type ReadonlyStoryData = Readonly<StoryData>;

const story: ReadonlyStoryData = { ... };
// story.slug = 'new';  // ❌ Error: Cannot assign because it's read-only
```

**Pick<T, K> - Select specific properties**
```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage:
type StorySummary = Pick<StoryData, 'slug' | 'title' | 'featured'>;

const summary: StorySummary = {
  slug: 'barbara-story',
  title: "Barbara's Journey",
  featured: true
};
```

**Omit<T, K> - Remove specific properties**
```typescript
type Omit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

// Usage:
type StoryMetadata = Omit<StoryData, 'contentHtml'>;

const metadata: StoryMetadata = {
  slug: 'barbara-story',
  title: "Barbara's Journey",
  firstName: 'Barbara',
  age: 32,
  country: 'USA',
  previousReligion: 'Christianity',
  profilePhoto: '/images/barbara.jpg',
  featured: true,
  language: 'en'
  // No contentHtml!
};
```

**Record<K, T> - Create object type with specific keys**
```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Usage:
type LocaleTranslations = Record<Locale, string>;

const translations: LocaleTranslations = {
  en: 'English',
  ar: 'Arabic'
};

// Another example:
type ThemeConfig = Record<Theme, { primary: string; secondary: string }>;

const themeConfigs: ThemeConfig = {
  light: { primary: '#000', secondary: '#333' },
  dark: { primary: '#fff', secondary: '#ccc' }
};
```

**Exclude<T, U> - Remove types from union**
```typescript
type Exclude<T, U> = T extends U ? never : T;

// Usage:
type Locale = 'en' | 'ar' | 'fr' | 'es';
type SupportedLocale = Exclude<Locale, 'fr' | 'es'>;  // 'en' | 'ar'
```

**Extract<T, U> - Keep types that are in union**
```typescript
type Extract<T, U> = T extends U ? T : never;

// Usage:
type Locale = 'en' | 'ar' | 'fr' | 'es';
type SupportedLocale = Extract<Locale, 'en' | 'ar'>;  // 'en' | 'ar'
```

**NonNullable<T> - Remove null and undefined**
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

// Usage:
type MaybeString = string | null | undefined;
type JustString = NonNullable<MaybeString>;  // string
```

**ReturnType<T> - Get return type of function**
```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// Usage:
function getStoryData(): StoryData { ... }
type ReturnType = ReturnType<typeof getStoryData>;  // StoryData
```

**Parameters<T> - Get parameters of function**
```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// Usage:
function getStoryData(slug: string, locale: string): StoryData { ... }
type Params = Parameters<typeof getStoryData>;  // [slug: string, locale: string]
```

---

## 16. Type Extensions (React)

### React-Specific Type Extensions

**File:** `src/types/component.types.ts`

```typescript
// Extend React's button attributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

**How it works:**
- `React.ButtonHTMLAttributes<HTMLButtonElement>` - TypeScript definition for all button attributes
- `extends` - Inherit all button properties
- `children` - Add our own custom property
- `variant` - Add optional custom property

**Result:**
```typescript
// ButtonProps includes all of these properties:
{
  // From React.ButtonHTMLAttributes<HTMLButtonElement>
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  value?: string;
  name?: string;
  // ... many more

  // Custom properties
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}
```

### Other React Type Extensions
```typescript
// Input props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// Div props
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

// Form props
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (data: FormData) => void;
}
```

### Type for React Children
**File:** `src/types/component.types.ts`

```typescript
export interface WithChildren {
  children: React.ReactNode;
}
```

**React.ReactNode types:**
```typescript
type ReactNode =
  | ReactChild          // string, number
  | ReactFragment       // Array/iterator of ReactNode
  | ReactPortal         // Portals
  | boolean             // Render nothing if false
  | null                // Render nothing
  | undefined;          // Render nothing
```

**More specific children types:**
```typescript
// Accept only elements
type ReactElement = React.ReactElement;

// Accept only strings
type ReactText = string | number;

// Accept single child
type ReactChild = ReactElement | ReactText;
```

### Type for Event Handlers
```typescript
// Mouse events
type ClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;
type ClickHandler = (event: React.MouseEvent<HTMLDivElement>) => void;

// Change events
type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type ChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;

// Form events
type SubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;

// Generic event
type GenericEvent = React.SyntheticEvent<Element>;
```

### Type for Refs
```typescript
// HTML element refs
type ButtonRef = React.RefObject<HTMLButtonElement>;
type DivRef = React.RefObject<HTMLDivElement>;

// Callback refs
type CallbackRef = (element: HTMLButtonElement | null) => void;

// Usage in props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: ButtonRef;  // For useRef
  inputRef?: CallbackRef;  // For callback refs
}
```

---

## 17. Type Safety Best Practices

### 1. Enable Strict Mode
**File:** `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true  // Enables all strict checking
  }
}
```

**Benefits:**
- Catches more errors at compile time
- Makes code more predictable
- Better IDE support

### 2. Always Type Function Parameters and Return Values
```typescript
// ❌ Bad (no types)
function getStory(slug) {
  return getStoryData(slug);
}

// ✅ Good
function getStory(slug: string): Promise<StoryData> {
  return getStoryData(slug);
}
```

### 3. Use Type Imports for Types
```typescript
// ✅ Good (imports only types)
import type { StoryData, Locale } from '@/types';

// ❌ Bad (imports types and values)
import { StoryData, Locale } from '@/types';
```

### 4. Prefer Interfaces for Object Shapes
```typescript
// ✅ Good (interface for objects)
interface User {
  name: string;
  age: number;
}

// ✅ Good (type alias for unions/types)
type Status = 'pending' | 'approved' | 'rejected';
type ID = string | number;
```

### 5. Use `any` Sparingly
```typescript
// ❌ Bad (defeats TypeScript purpose)
function processData(data: any): any {
  return data;
}

// ✅ Good (specific types)
function processData(data: StoryData): StoryData {
  return data;
}
```

**When `any` is acceptable:**
- Migration from JavaScript
- Working with third-party libraries without types
- Temporary: during development

### 6. Use Narrow Types
```typescript
// ❌ Bad (too broad)
function getCountry(story: StoryData): string {
  return story.country;
}

// ✅ Good (specific literal union)
type Country = 'USA' | 'UK' | 'Canada' | 'Australia';
type CountryStory = StoryData & { country: Country };

function getCountry(story: CountryStory): Country {
  return story.country;
}
```

### 7. Validate External Data
**File:** `src/lib/story-parser.ts`

```typescript
export async function parseStoryFile(fileName: string): Promise<StoryData> {
  // Parse data
  const data = matterResult.data as {
    title: string;
    firstName: string;
    age: number;
    // ... etc
  };

  // Type assertion (known structure)
  return {
    slug,
    contentHtml,
    ...data,
    language: data.language as Locale,
  };
}
```

**Better: Validate with type guard**
```typescript
function isValidStoryData(obj: any): obj is StoryData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.slug === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.firstName === 'string' &&
    typeof obj.age === 'number' &&
    typeof obj.country === 'string' &&
    typeof obj.previousReligion === 'string' &&
    typeof obj.profilePhoto === 'string' &&
    typeof obj.featured === 'boolean' &&
    (obj.language === 'en' || obj.language === 'ar') &&
    typeof obj.contentHtml === 'string'
  );
}
```

### 8. Use Narrowing in Conditionals
```typescript
function processStory(story: StoryData | null): void {
  if (story === null) {
    return;  // TypeScript knows story is null here
  }

  // TypeScript knows story is StoryData here
  console.log(story.title);
}
```

### 9. Avoid `!` Non-null Assertion (unless necessary)
```typescript
// ❌ Dangerous
function getElement(): HTMLElement {
  const elem = document.getElementById('my-element')!;
  // If element doesn't exist, runtime error!
  return elem;
}

// ✅ Safe
function getElement(): HTMLElement | null {
  const elem = document.getElementById('my-element');
  if (elem === null) {
    throw new Error('Element not found');
  }
  return elem;
}
```

### 10. Document Complex Types
```typescript
/**
 * Represents a story from a new Muslim's journey
 * @property slug - URL-friendly identifier (kebab-case)
 * @property title - Story title
 * @property firstName - Person's first name
 * @property age - Age when story was published
 * @property country - Country of origin
 * @property previousReligion - Religion before Islam
 * @property profilePhoto - Path to photo image
 * @property featured - Whether story appears on homepage
 * @property language - Two-letter locale code
 * @property contentHtml - Processed markdown content as HTML
 */
export interface StoryData {
  slug: string;
  title: string;
  firstName: string;
  age: number;
  country: string;
  previousReligion: string;
  profilePhoto: string;
  featured: boolean;
  language: Locale;
  contentHtml: string;
}
```

---

## 18. Advanced Patterns

### Conditional Types
```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;   // true
type Test2 = IsString<number>;   // false

// Extract string properties
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface User {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}

type StringPropertyNames = StringKeys<User>;  // 'name' | 'email'
```

### Infer Types in Conditional
```typescript
// Get return type
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;

// Get first parameter type
type FirstParam<T> = T extends (first: infer F, ...args: any) => any ? F : never;

// Usage:
function getStory(slug: string): StoryData { ... }
type Slug = FirstParam<typeof getStory>;  // string
```

### Recursive Types
```typescript
// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Usage:
type DeepStoryData = DeepReadonly<StoryData>;

// All nested properties are readonly
const story: DeepStoryData = { ... };
// story.country = 'new';  // Error (even if country is object)
```

### Template Literal Types (TypeScript 4.1+)
```typescript
type Theme = 'light' | 'dark';

// Create class names from theme
type ThemeClassName = `theme-${Theme}`;  // 'theme-light' | 'theme-dark'

const className: ThemeClassName = 'theme-light';  // ✅
const invalid: ThemeClassName = 'theme-blue';     // ❌ Error

// Extract and transform
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>;  // 'onClick'
```

### Branded Types (Nominal Typing)
```typescript
// Create a "branded" type to prevent mixing IDs
type UserId = string & { readonly brand: unique symbol };
type StoryId = string & { readonly brand: unique symbol };

function getUserById(id: UserId): User | null { ... }
function getStoryById(id: StoryId): StoryData | null { ... }

// Prevents accidental usage
const userId = 'user-123' as UserId;
const storyId = 'story-123' as StoryId;

getUserById(storyId);    // ❌ Error: Type mismatch
getStoryById(userId);    // ❌ Error: Type mismatch
```

### Type-safe Event Handlers
**File:** `src/components/Button.tsx`

```typescript
import type { ButtonProps } from '@/types/component.types';

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
```

**How it works:**
- `...props` spreads all additional properties
- Includes `onClick`, `onSubmit`, etc. from `React.ButtonHTMLAttributes`
- Type-safe - TypeScript checks all props

### Type-Safe API Responses
```typescript
// Generic API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  errors?: string[];
}

// Type-safe API functions
async function fetchStory(slug: string): Promise<ApiResponse<StoryData>> {
  const response = await fetch(`/api/stories/${slug}`);
  return response.json();
}

// Usage with type safety
const result = await fetchStory('barbara-story');

if (result.status === 200) {
  // TypeScript knows result.data is StoryData
  console.log(result.data.title);
} else {
  // TypeScript knows there might be errors
  console.error(result.errors);
}
```

### Type-Safe Routing
**File:** `src/app/[locale]/stories/[slug]/page.tsx`

```typescript
// Type-safe route parameters
export default async function StoryPage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  // TypeScript ensures:
  // - slug is string
  // - locale is 'en' | 'ar'
}
```

### Type-Safe Navigation
**File:** `src/components/StoryContentDisplay.tsx`

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function StoryContentDisplay({ story }: StoryContentDisplayProps) {
  const router = useRouter();  // Type-safe router

  return (
    <button
      onClick={() => {
        // Type-safe navigation
        router.back();          // ✅ Correct method
        router.push('/stories'); // ✅ Correct path
        router.replace('/home'); // ✅ Correct method

        // ❌ These would be type errors:
        // router.nonExistentMethod();
        // router.push(123);
      }}
    >
      Go Back
    </button>
  );
}
```

### Combining Types
**File:** `src/lib/index.ts`

```typescript
// Re-export types
export * from '@/types';

// Import and re-export values
import { StoryService } from './story-service';

// Create function aliases (for backward compatibility)
export const getSortedStoriesData = StoryService.getSortedStoriesData;
export const getStoryData = StoryService.getStoryData;
export const getAllStorySlugs = StoryService.getAllStorySlugs;
```

**Benefits:**
- Clean API - all exports from one file
- Backward compatibility - old code still works
- Single import point
- Easy to maintain

---

## Quick Reference

### Common TypeScript Patterns

```typescript
// 1. Interface for objects
interface User {
  name: string;
  age: number;
}

// 2. Type alias for unions
type Status = 'pending' | 'approved' | 'rejected';

// 3. Generic function
function identity<T>(arg: T): T {
  return arg;
}

// 4. Generic interface
interface Container<T> {
  value: T;
}

// 5. Extending interfaces
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

// 6. Utility types
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] };

// 7. Mapped types
type StoriesByLocale = {
  [K in Locale]: StoryData[];
};

// 8. Conditional types
type IsString<T> = T extends string ? true : false;

// 9. Template literal types
type ThemeClass = `theme-${Theme}`;

// 10. Branded types
type UserId = string & { readonly brand: unique symbol };
```

### Type Checking Cheat Sheet

```typescript
// typeof checks
if (typeof value === 'string') { /* value is string */ }
if (typeof value === 'number') { /* value is number */ }

// instanceof checks
if (value instanceof Date) { /* value is Date */ }

// null checks
if (value !== null) { /* value is not null */ }

// array checks
if (Array.isArray(value)) { /* value is array */ }

// custom type guard
if (isStoryData(value)) { /* value is StoryData */ }
```

### Common Errors and Solutions

```typescript
// Error: Property 'title' does not exist on type 'StoryData | null'
function printTitle(story: StoryData | null) {
  console.log(story.title);  // ❌ Error
}

// Solution: Check for null
function printTitle(story: StoryData | null) {
  if (story) {
    console.log(story.title);  // ✅ OK
  }
}

// Error: Argument of type 'string' is not assignable to parameter of type 'Locale'
setLocale('fr');  // ❌ Error: 'fr' is not in 'en' | 'ar'

// Solution: Use correct type
setLocale('en');  // ✅ OK

// Error: Type 'string' is not assignable to type 'number'
const count: number = '5';  // ❌ Error

// Solution: Convert type
const count: number = parseInt('5', 10);  // ✅ OK
```

---

## Best Practices Summary

### ✅ Do's
1. **Enable `strict` mode** - Catch more errors early
2. **Always type function parameters and return values** - Explicit is better
3. **Use `import type` for types** - Better tree-shaking
4. **Prefer interfaces for objects** - Better for OOP
5. **Use type aliases for unions/complex types** - More flexible
6. **Document complex types with JSDoc** - Self-documenting code
7. **Validate external data** - Don't trust the network
8. **Use utility types** - Reuse common patterns
9. **Narrow types in conditionals** - TypeScript helps you
10. **Prefer specific types over `any`** - Type safety is key

### ❌ Don'ts
1. **Don't use `any` unless necessary** - Defeats TypeScript purpose
2. **Don't ignore TypeScript errors** - Fix them
3. **Don't use type assertions (`as`) everywhere** - Sometimes types need fixing, not asserting
4. **Don't use `!` non-null assertion carelessly** - Can cause runtime errors
5. **Don't mix types and values in same import** - Use `import type`
6. **Don't define types inline** - Extract to separate files
7. **Don't use `any[]` for arrays** - Use specific types
8. **Don't ignore generic type parameters** - They provide safety
9. **Don't use `Object` type** - Be specific
10. **Don't forget to export your types** - Or they can't be used

---

## Configuration Reference

### tsconfig.json Essential Options
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Path Aliases
**File:** `tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

---

## Conclusion

This tutorial covered comprehensive TypeScript concepts using real examples from the New Muslim Stories project:

### Key Takeaways:
1. **TypeScript Configuration** - Proper setup is crucial
2. **Type System** - Primitives, unions, literals, objects
3. **Interfaces vs Type Aliases** - When to use each
4. **Advanced Types** - Mapped, conditional, template literals
5. **Generics** - Reusable type-safe code
6. **Utility Types** - Built-in helpers
7. **React Types** - Props, events, refs
8. **Best Practices** - Type safety, proper imports, strict mode

### Next Steps:
1. **Practice** - Modify types in the project
2. **Experiment** - Create new types and interfaces
3. **Read More** - [TypeScript Handbook](https://typescriptlang.org/docs)
4. **Type Challenges** - [type-challenges](https://github.com/type-challenges/type-challenges)

### Resources:
- [TypeScript Official Documentation](https://typescriptlang.org/docs)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Keep coding and TypeScript will make you a better JavaScript developer! 🚀
