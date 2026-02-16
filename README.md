# Code Challenge Submission

This repository contains solutions for Problem 1, Problem 2, and Problem 3.

The focus of this submission is code quality, computational efficiency, and identifying anti-patterns.

---

# ✅ Problem 1

## Objective
Refactor and improve the provided implementation while ensuring correctness and efficiency.

## Improvements Made

- Simplified logic for better readability
- Removed redundant conditions
- Improved variable naming for clarity
- Reduced unnecessary operations
- Ensured edge cases are handled properly

## Key Considerations

- Avoided repeated calculations
- Reduced time complexity where possible
- Ensured clean and maintainable structure

---

# ✅ Problem 2

## Objective
Optimize logic and improve structural clarity.

## Improvements Made

- Eliminated duplicated logic
- Reduced nested conditionals
- Improved type safety
- Increased readability with clearer abstraction
- Ensured consistent return behavior

## Performance Improvements

- Removed unnecessary loops
- Avoided recalculating derived values
- Improved algorithm efficiency

---

# ✅ Problem 3

## Objective
Identify computational inefficiencies and anti-patterns in a React + TypeScript functional component using Hooks.

---

## 🔎 Issues Identified

### 1. Missing Type Definitions
- `blockchain` was used but not defined in `WalletBalance`.
- This breaks type safety and can cause runtime errors.

### 2. Usage of `any`
- Weakens TypeScript’s guarantees.
- Reduces maintainability and safety.

### 3. Switch-Case for Priority Mapping
- Not scalable.
- Harder to maintain.
- Lookup map provides O(1) access and cleaner structure.

### 4. Incorrect Filter Logic
- Referenced undefined variable (`lhsPriority`).
- Included zero balances unintentionally.

### 5. Sorting Mutates Original Array
- `Array.sort()` mutates the source array.
- Risk of unintended side effects.

### 6. Unnecessary Dependency in `useMemo`
- `prices` was included but not used.
- Causes unnecessary recalculations.

### 7. Redundant Iteration
- `formattedBalances` created an additional map iteration.
- Increased computational overhead.

### 8. Unstable React Keys
- Used `index` as key.
- Can cause incorrect reconciliation and rendering bugs.

### 9. Potential NaN Issue
- `prices[balance.currency]` could be undefined.
- Could produce `NaN` values.

### 10. Lack of Strict Typing for Blockchain
- Using loose string values instead of union types.

---

## ✅ Refactoring Improvements

- Introduced strict union type for blockchain
- Replaced switch-case with lookup map
- Fixed filtering logic
- Removed redundant iterations
- Used stable composite key
- Removed unnecessary dependencies from `useMemo`
- Added defensive fallback for price calculation
- Improved sorting comparator
- Ensured immutability where necessary

---

## Refactored Code

See `problem3/.keep` for the improved implementation.

---

# 💡 Overall Approach

This submission prioritizes:

- Clean architecture
- Performance optimization
- Type safety
- Readability
- Maintainability
- Avoiding unnecessary re-renders
- Preventing side effects

---

# Conclusion

The refactored solutions improve performance, maintainability, and correctness while following modern React and TypeScript best practices.
