---
title: "Data cube technology"
description: "Study notes on Data cube technology"
date: "2026-09-07"
tags: ["Data Cube", "Iceberg Cube", "Full Cube"]
---
# 📚 Data Cube Technology --- Easy Handwritten-Style Study Notes

> **Goal:** Understand the ideas quickly, remember the important terms,
> and revise before an exam without reading the whole lecture again.

------------------------------------------------------------------------

# 1. 🧊 What is a Data Cube?

A **Data Cube** is a way of organizing data using **multiple
dimensions** so that we can analyze the data from different views.

### 🛒 Simple example: Shop Sales

Imagine we have:

-   📍 **Location** → Colombo, Kandy, Galle
-   📦 **Product** → Apple, Shoes, Phone
-   📅 **Time** → January, February, March

A cell in the cube can answer:

> **"How many shoes were sold in Colombo in January?"**

### ⭐ Remember

**Data Cube = Data + Many Dimensions + Easy Analysis**

------------------------------------------------------------------------

# 2. 📦 Cuboid & Data Cube Lattice

A **cuboid** is a particular view of the data cube using some
dimensions.

Think of it as **zooming in or out**.

### Example: Dimensions

`Time + Item + Location + Supplier`

  Cuboid    Dimensions                          Meaning
  --------- ----------------------------------- ------------------------
  **0-D**   None                                Total sales
  **1-D**   Time                                Sales by time
  **2-D**   Time + Item                         Sales by time and item
  **3-D**   Time + Item + Location              Detailed sales
  **4-D**   Time + Item + Location + Supplier   Most detailed view

### 🧠 Important terms

-   **Apex cuboid** → **0-D** → highest level → very general
-   **Base cuboid** → contains **all dimensions** → most detailed
-   All cuboids together form a **cuboid lattice**

### 🔑 Memory trick

> **Apex = Big Picture**\
> **Base = Biggest Detail**

------------------------------------------------------------------------

# 3. 🧊 Full Cube vs. Iceberg Cube

## Full Cube

A **full cube** calculates and stores **all possible cells**.

✅ Complete\
❌ Can become extremely large

------------------------------------------------------------------------

## 🏔️ Iceberg Cube

An **iceberg cube** stores only cells that satisfy a **minimum
threshold**.

Example:

> Minimum sales = **100**

Then:

-   Sales = 150 → ✅ Keep
-   Sales = 100 → ✅ Keep
-   Sales = 20 → ❌ Ignore
-   Sales = 5 → ❌ Ignore

### Why use Iceberg Cubes?

-   💾 Saves storage
-   ⚡ Saves computation time
-   🚫 Removes unimportant cells
-   📈 Helps control the huge number of possible cells

### 🧠 Remember

> **Iceberg = Keep only the BIG / important values.**

------------------------------------------------------------------------

# 4. 🔒 Closed Cube

Sometimes many cube cells contain the **same value**.

A **closed cube** removes redundant information.

### Simple idea

If a higher-level cell has the same value as its detailed child cells,
we do not need to keep unnecessary duplicate information.

### 🧠 Remember

> **Iceberg → removes SMALL values**\
> **Closed cube → removes REDUNDANT values**

------------------------------------------------------------------------

# 5. 🐚 Cube Shell

A **cube shell** focuses on only a **small number of dimensions**
instead of building the complete high-dimensional cube.

Example:

Instead of using:

`A + B + C + D + E + F + G + H`

we may work with smaller combinations such as:

`A + B + C`

or

`D + E`

### Why?

Because analyzing every possible dimension combination can create an
enormous cube.

### 🧠 Remember

> **Shell = Small part of the big cube**

------------------------------------------------------------------------

# 6. ⚙️ Cube Computation Methods

There are several ways to compute data cubes.

### Main methods

1.  **Multi-Way Array Aggregation**
2.  **BUC (Bottom-Up Computation)**
3.  **Star-Cubing**
4.  **Shell-Fragment Approach**

### Quick comparison

  -----------------------------------------------------------------------
  Method                              Main idea
  ----------------------------------- -----------------------------------
  **Multi-Way Array**                 Bottom-up, array-based aggregation

  **BUC**                             Partition + prune

  **Star-Cubing**                     Hybrid approach

  **Shell-Fragments**                 Break high-dimensional cube into
                                      smaller pieces
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 7. 🔢 Multi-Way Array Aggregation

### Main idea

This is a **bottom-up** method.

Start with detailed data and gradually create higher-level summaries.

### How?

1.  Divide data into **chunks**
2.  Keep manageable pieces in memory
3.  Aggregate the data
4.  Reuse already calculated results
5.  Build higher-level summaries

### 👍 Good for

-   A **small number of dimensions**
-   Data that can be efficiently represented as arrays

### 👎 Problem

With many dimensions, the cube becomes too large.

### 🧠 Memory trick

> **Multi-Way = Build summaries while reusing previous work.**

------------------------------------------------------------------------

# 8. 🔄 Traversing Order

When computing a cube, the order in which cells/dimensions are processed
matters.

### Goal

> Visit/process the data in an order that minimizes unnecessary work.

A good traversal order can make cube computation **much faster**.

------------------------------------------------------------------------

# 9. 📉 3-D → 2-D → 1-D Reduction

A multi-dimensional array can be reduced step by step.

### Example

**3-D**

`A + B + C`

⬇️

**2-D**

`A + B`

⬇️

**1-D**

`A`

### Memory idea

Keep the **smallest useful structure in memory** and process larger
structures in manageable chunks.

### 🧠 Remember

> **Reduce dimensions step by step → save memory.**

------------------------------------------------------------------------

# 10. 🌳 BUC --- Bottom-Up Computation

BUC stands for **Bottom-Up Computation**.

⚠️ The name can be confusing:

> BUC is called "bottom-up", but its computation strategy works by
> **partitioning the data from the top and recursively breaking it
> down**.

### Main idea

**Partition → Check → Prune → Continue**

------------------------------------------------------------------------

## ✂️ Partition

Split the data into smaller groups.

Example:

All sales

⬇️

`Apple | Shoes | Phone`

------------------------------------------------------------------------

## ✂️ Pruning

If a group does not satisfy the minimum support/threshold, **stop
processing its children**.

Example:

Minimum sales = 10

`Apple = 50` → ✅ Continue

`Shoes = 3` → ❌ Stop / prune

There is no need to calculate all detailed combinations under Shoes.

### 🔥 Important

> **BUC is especially useful for Iceberg Cubes because it can prune
> unimportant branches early.**

### If minimum support = 1

Almost everything qualifies.

➡️ BUC effectively has to compute the **full cube**.

------------------------------------------------------------------------

# 11. 🚀 BUC Optimizations

BUC can be improved using:

-   **Sorting**
-   **Hashing**
-   **Good dimension ordering**
-   **Collapsing duplicates**
-   **Partitioning**
-   **Pruning**

### Why dimension order matters?

If we choose a good dimension first, we may discover small/unimportant
groups early.

➡️ More pruning\
➡️ Less work\
➡️ Faster computation

### 🧠 Memory trick

> **BUC = Break + Understand + Cut**

**Break** data → **Understand** threshold → **Cut** useless branches.

------------------------------------------------------------------------

# 12. 🌌 High-Dimensional OLAP

**OLAP** = Online Analytical Processing.

The problem:

> More dimensions → many more possible combinations.

This is called the:

## ⚠️ Curse of Dimensionality

Imagine:

`3 dimensions` → manageable

`20 dimensions` → huge

`100 dimensions` → 🚨 enormous

Even an iceberg cube may still become too large.

### 🧠 Remember

> **More dimensions = Cube explosion**

------------------------------------------------------------------------

# 13. 🐚 Shell-Fragment Approach

For very high-dimensional data, we do not need to build the entire cube.

Instead:

1.  Split dimensions into **smaller fragments**
2.  Compute smaller cubes
3.  Store useful information such as **TID lists**
4.  Combine fragments when a query arrives

### Example

5 dimensions:

`A + B + C + D + E`

Instead of one huge cube:

`ABCDE`

Use:

`ABC` + `DE`

------------------------------------------------------------------------

# 14. 🆔 TID --- Transaction ID

**TID = Transaction ID**

It identifies a particular record/transaction.

Example:

  TID   A    B    C
  ----- ---- ---- ----
  T1    a1   b1   c1
  T2    a1   b2   c1
  T3    a2   b1   c2

For a value such as:

`A = a1`

we can keep:

`{T1, T2}`

This is basically an **inverted index**:

> Value → Which transactions contain it?

------------------------------------------------------------------------

# 15. 🔗 Combining Shell Fragments

Suppose we need:

`A=a1, B=b2, C=c1, D=d1, E=e2`

We can obtain matching TID lists from different fragments.

For example:

`ABC` gives → `{T2, T5, T8}`

`DE` gives → `{T2, T4, T8}`

Intersection:

`{T2, T8}`

These are the transactions satisfying **both fragments**.

### 🧠 Key idea

> **Fragment → Get TIDs → Intersect TIDs → Answer query**

------------------------------------------------------------------------

# 16. 💻 Online Query Computation with Shell Fragments

A query may contain:

### 1. Fixed value

Example:

`City = Colombo`

### 2. `*` --- Aggregate / All

Means consider **all values**.

### 3. `?` --- Inquiry

Means we want more detailed information.

------------------------------------------------------------------------

## Query process

``` text
Query
  ↓
Break into shell fragments
  ↓
Get TID lists
  ↓
Find intersection
  ↓
Create smaller base table
  ↓
Compute required result
```

### ⭐ Main benefit

We avoid storing the entire giant cube.

Instead:

> **Pre-compute small pieces + compute the requested part when needed.**

------------------------------------------------------------------------

# 17. 📊 Why Shell Fragments Are Useful

### Full high-dimensional cube

❌ Huge storage\
❌ Huge computation\
❌ Cube explosion

### Shell fragments

✅ Smaller storage\
✅ Avoid unnecessary combinations\
✅ Faster query processing\
✅ Suitable for high-dimensional data

### Important idea

Shell fragments provide a **lossless reduction**:

> We reduce what is stored, but can still obtain the required exact
> result.

------------------------------------------------------------------------

# 18. 🧩 General Cube Computation Tricks

Different techniques can reduce repeated work.

### 🔹 Sort

Put data in a useful order.

### 🔹 Hash

Group similar values efficiently.

### 🔹 Use Previous Results

Do not calculate the same thing again.

### 🔹 Smallest-Child

Start from the smaller/cheaper structure when possible.

### 🔹 Cache

Store previously calculated results.

### 🔹 Amortize Scans

Do multiple useful operations during one data scan.

### 🔹 Share Sorts / Partitions

If several computations need the same sorting or partitioning, reuse it.

### 🧠 Big idea

> **Do work once → reuse it many times.**

------------------------------------------------------------------------

# 19. 🌟 Star-Cubing

**Star-Cubing** is a more advanced cube computation method.

### Main idea

It combines ideas from different approaches, especially:

-   Bottom-up processing
-   Top-down partitioning
-   Efficient pruning

### 🧠 Remember

> **Star-Cubing = Hybrid approach**

------------------------------------------------------------------------

# 20. 🔬 Multi-Feature Cubes

A **multi-feature cube** supports more complex analysis using multiple
aggregate functions/features.

Instead of asking only:

> "What are total sales?"

we can ask several things at different levels.

### Example

Group by:

`Item + Region + Month`

Then:

1.  Find the **maximum price**
2.  Find the **sales associated with that price**
3.  Examine **shelf life**
4.  Compare groups

### Main idea

> A multi-feature cube allows **complex, multi-step analysis** inside
> cube space.

------------------------------------------------------------------------

# 21. ⛏️ Data Cubes + Data Mining

Data cubes can make data mining easier.

### Four important ideas

#### 1. Define mining space

Use cube dimensions to define which data we want to mine.

#### 2. Create features

Use OLAP queries to create useful features.

Example:

`Sales by Month`

#### 3. Put mining models into cube space

Example:

Prediction-related models.

#### 4. Reuse cube computations

Use previously calculated cube information to make repeated mining tasks
faster.

### 🧠 Remember

> **Cube + Mining = Better organized features + faster analysis**

------------------------------------------------------------------------

# 22. 🔎 Discovery-Driven Exploration

Sometimes we don't know exactly what we are looking for.

The cube may contain **millions of values**.

So instead of checking everything manually:

> Find the **surprising / unusual values** first.

These are called **exceptions**.

------------------------------------------------------------------------

## 🚨 What is an Exception?

An **exception** is a value that is very different from what we
expected.

Example:

Normal monthly sales:

`100, 105, 98, 102, 101`

Suddenly:

`20` 🚨

That is an **exception**.

------------------------------------------------------------------------

# 23. 🚨 Types of Exceptions

### 1. SelfExp --- Self Exception

A cell is surprising compared with other cells at the **same level**.

### 2. InExp --- Internal Exception

A cell becomes surprising when we **look deeper inside it**.

### 3. PathExp --- Path Exception

A surprising pattern appears along a **drill-down path**.

### 🧠 Easy memory

  Type          Think
  ------------- ---------------------------
  **SelfExp**   Surprise at **itself**
  **InExp**     Surprise **inside**
  **PathExp**   Surprise along a **path**

------------------------------------------------------------------------

# 24. 🎨 Why Discovery-Driven Exploration?

Exceptions can be detected/pre-computed and stored.

Then, during cube exploration:

🚨 Interesting areas can be highlighted.

For example:

``` text
Sales
─────────────────
January    100
February   105
March       98
April       20  ← 🚨 EXCEPTION
May        102
```

Instead of checking every number:

> **The system points us toward the interesting one.**

### 🧠 Main idea

> **Discovery-driven = Find surprises first.**

------------------------------------------------------------------------

# 25. 🧠 The Whole Lecture in One Picture

``` text
                    DATA CUBE
                       │
          ┌────────────┴────────────┐
          │                         │
       CUBOIDS                  MATERIALIZATION
          │                         │
     0-D → 1-D → 2-D...       Full / Iceberg
          │                         │
          └────────────┬────────────┘
                       │
                CUBE COMPUTATION
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   Multi-Way          BUC        Star-Cubing
        │              │
        │           Partition
        │              ↓
        │           Pruning
        │
        └──────────────┬──────────────┘
                       │
             HIGH DIMENSIONAL DATA
                       │
                       ↓
                Shell Fragments
                       │
                TID Intersection
                       │
                       ↓
                Online Queries
                       │
                       ↓
               Data Mining / OLAP
                       │
                       ↓
          Discovery-Driven Exploration
                       │
                       ↓
                   Exceptions 🚨
```

------------------------------------------------------------------------

# 26. 🎯 Exam-Focused Cheat Sheet

## Data Cube

> Multidimensional organization of data for analysis.

## Cuboid

> A particular view/combination of dimensions in a data cube.

## Apex Cuboid

> **0-D** cuboid; gives the overall/general result.

## Base Cuboid

> Contains **all dimensions**; most detailed.

## Full Cube

> Stores all possible cube cells.

## Iceberg Cube

> Stores only cells satisfying a **minimum threshold**.

## Closed Cube

> Removes redundant cells/information.

## Cube Shell

> Uses only selected groups of dimensions instead of the complete cube.

## Multi-Way Array Aggregation

> Bottom-up, array-based cube computation using chunks and reuse of
> results.

## BUC

> Partitions data and **prunes** branches that do not satisfy the
> threshold.

## Star-Cubing

> Hybrid cube computation approach.

## Curse of Dimensionality

> Too many dimensions cause the number of cube combinations to become
> extremely large.

## Shell Fragment

> A smaller pre-computed cube covering a subset of dimensions.

## TID

> Transaction ID used to identify records.

## Discovery-Driven Exploration

> Finds and highlights unusual/interesting cube cells.

## Exception

> A value that is significantly different from what is expected.

------------------------------------------------------------------------

# 27. ⚡ Super-Short Memory Map

``` text
CUBE
 ↓
Many dimensions
 ↓
Cuboids
 ↓
Full cube can become HUGE
 ↓
Iceberg → remove small values
 ↓
Closed → remove redundancy
 ↓
Shell → use fewer dimensions
 ↓
BUC → partition + prune
 ↓
High dimensions → Shell fragments
 ↓
TIDs → identify matching records
 ↓
Intersect TIDs → answer query
 ↓
OLAP + Mining
 ↓
Discovery-driven
 ↓
Find EXCEPTIONS 🚨
```

------------------------------------------------------------------------

# 28. 📝 Last-Minute Revision Questions

### Q1. What is a data cube?

A multidimensional structure used to organize and analyze data from
different views.

### Q2. What is the difference between apex and base cuboid?

**Apex = 0-D, general result.**\
**Base = all dimensions, detailed result.**

### Q3. Why use an iceberg cube?

To store only important cells and reduce storage/computation.

### Q4. What does BUC do?

It **partitions data and prunes** branches that cannot satisfy the
threshold.

### Q5. What is the curse of dimensionality?

As dimensions increase, the number of possible combinations becomes
extremely large.

### Q6. Why use shell fragments?

To avoid building the complete high-dimensional cube.

### Q7. What is a TID?

A transaction/record identifier.

### Q8. How does a shell-fragment query work?

**Get TIDs → intersect TIDs → create smaller data → compute result.**

### Q9. What is discovery-driven exploration?

Finding unusual/interesting cells instead of manually examining the
whole cube.

### Q10. What are SelfExp, InExp and PathExp?

Different ways of identifying exceptions:

**Self → Inside → Path**

------------------------------------------------------------------------

# 🧠 FINAL MEMORY TRICK

> ### 🧊 CUBE → 🏔️ ICEBERG → 🔒 CLOSED → 🐚 SHELL → ✂️ BUC → 🆔 TID → 🔎 QUERY → 🚨 EXCEPTION

If you remember this chain, you can reconstruct most of the lecture
during the exam.

------------------------------------------------------------------------

## ✍️ One-Sentence Summary

> **Data Cube Technology organizes multidimensional data so we can
> compute, query, mine, and explore it efficiently without being
> overwhelmed by the huge number of possible combinations.**
