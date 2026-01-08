# Refactoring Plan for Smaller Files

## Overview
This document outlines a practical approach to refactoring large files in the project to make them smaller and more maintainable, following best practices without over-engineering.

## Files Identified for Refactoring

### 1. PWAInstallPrompt.tsx (209 lines)
**Current Issues:**
- Mixes logic, UI, and multiple concerns
- Contains inline SVG icons
- Large JSX structure with feature list
- Complex state management

**Refactoring Strategy:**
```markdown
PWAInstallPrompt.tsx (current, 209 lines)
├── Extract: InstallIcon.tsx (new file)
├── Extract: CloseIcon.tsx (new file)
├── Extract: CheckIcon.tsx (new file)
├── Extract: FeatureList.tsx (new component)
├── Extract: usePWAInstallPrompt.ts (custom hook)
└── PWAInstallPrompt.tsx (refactored, ~80-100 lines)
```

**Implementation Steps:**
1. Create `src/components/icons/` directory
2. Move SVG icons to separate files
3. Extract feature list to `FeatureList.tsx`
4. Move prompt logic to custom hook
5. Simplify main component

### 2. ThemeToggle.tsx (78 lines)
**Current Issues:**
- Contains inline SVG components
- Mixes icon rendering with theme logic

**Refactoring Strategy:**
```markdown
ThemeToggle.tsx (current, 78 lines)
├── Extract: SunIcon.tsx
├── Extract: MoonIcon.tsx
└── ThemeToggle.tsx (refactored, ~40-50 lines)
```

**Implementation Steps:**
1. Create `src/components/icons/` directory
2. Move SunIcon and MoonIcon to separate files
3. Simplify main component to focus on theme logic

### 3. story-service.ts (87 lines)
**Current Issues:**
- Class with multiple responsibilities
- Mixes data fetching with business logic

**Refactoring Strategy:**
```markdown
story-service.ts (current, 87 lines)
├── Extract: story-filters.ts (filtering logic)
├── Extract: story-sorters.ts (sorting logic)
└── story-service.ts (refactored, ~50-60 lines)
```

**Implementation Steps:**
1. Extract filtering functions to `story-filters.ts`
2. Extract sorting functions to `story-sorters.ts`
3. Keep core service methods focused on data operations

### 4. story-parser.ts (81 lines)
**Current Issues:**
- Mixes file system operations with parsing
- Contains multiple responsibilities

**Refactoring Strategy:**
```markdown
story-parser.ts (current, 81 lines)
├── Extract: story-file-utils.ts (file operations)
├── Extract: markdown-processor.ts (remark processing)
└── story-parser.ts (refactored, ~40-50 lines)
```

**Implementation Steps:**
1. Move file system operations to `story-file-utils.ts`
2. Extract markdown processing to `markdown-processor.ts`
3. Keep parsing logic focused and clean

## Best Practices Applied

### 1. Single Responsibility Principle
- Each component/function should do one thing well
- Avoid mixing concerns (logic vs presentation)

### 2. Component Composition
- Break large components into smaller, reusable pieces
- Use props for communication between components

### 3. Custom Hooks for Logic
- Extract complex logic into reusable hooks
- Keep components focused on rendering

### 4. Sensible File Organization
- Group related files together (e.g., icons/)
- Use clear naming conventions
- Avoid creating too many small files unnecessarily

### 5. Progressive Enhancement
- Refactor incrementally
- Ensure each change maintains functionality
- Test after each refactoring step

## Expected Benefits

1. **Improved Maintainability**: Smaller files are easier to understand and modify
2. **Better Reusability**: Extracted components can be reused elsewhere
3. **Enhanced Testability**: Smaller units are easier to test
4. **Clearer Architecture**: Separation of concerns makes the codebase more logical
5. **Easier Collaboration**: Multiple developers can work on different parts simultaneously

## Implementation Recommendations

1. **Start with the largest file**: PWAInstallPrompt.tsx
2. **Work incrementally**: Refactor one file at a time
3. **Test thoroughly**: Ensure functionality remains intact
4. **Document changes**: Update any relevant documentation
5. **Review**: Get feedback on the refactored structure

## What NOT to Do (Avoiding Over-Engineering)

- ❌ Don't create abstract classes/interfaces unnecessarily
- ❌ Don't implement complex design patterns when simple solutions work
- ❌ Don't create too many layers of abstraction
- ❌ Don't refactor just for the sake of refactoring
- ❌ Don't break working functionality

## Success Metrics

- Reduced average file size by 30-50%
- Improved component reusability
- Maintained or improved code readability
- No regression in functionality
- Positive developer experience feedback
