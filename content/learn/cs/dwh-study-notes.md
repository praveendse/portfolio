---
title: "Data Warehouse Modeling"
description: "Study notes on DW characteristics, OLTP vs OLAP, multidimensional models, and OLAP operations"
date: "2026-09-06"
tags: ["Data Warehousing", "Databases"]
---

# 📊 DATA WAREHOUSE MODELING - Study Notes
## *Quick Reference Guide for Memorization*

---

## 🎯 WHAT IS A DATA WAREHOUSE?

### Definition (W.H. Inmon)
> A **subject-oriented, integrated, time-variant, and nonvolatile** collection of data in support of management's decision-making process.

**Simple:** A separate database that holds cleaned, historical data for business analysis and decision-making.

---

## ⭐ THE 4 KEY CHARACTERISTICS

### 1. **SUBJECT-ORIENTED** 🎯
- Organized around **major subjects** (customer, product, sales)
- Focus on decision support, NOT daily operations
- Excludes unnecessary data
- **vs Process-Oriented:** Traditional databases organize by business process

### 2. **INTEGRATED** 🔗
- Data from **multiple heterogeneous sources** combined:
  - Relational databases
  - Flat files
  - Online transaction records
- **Data Cleaning & Conversion** applied
- Ensures **consistency** in:
  - Naming conventions
  - Encoding structures
  - Attribute measures

### 3. **TIME-VARIANT** ⏰
- Contains **historical data** (5-10 years)
- Operational DB: Current values only
- DW: Provides perspective from past
- Every data element has **time dimension**

### 4. **NONVOLATILE** 💾
- **No updates** after initial load
- Read-only access
- Only 2 operations:
  1. Load data (initial)
  2. Access data (queries)
- **vs Volatile (Transactional):** Insert, Update, Delete, Read

---

## ⚡ OLTP vs OLAP (Key Differences)

| Feature | OLTP (DBMS) | OLAP (DW) |
|---------|------------|----------|
| **Purpose** | Run business | Optimize business |
| **Users** | Clerk, IT staff | Knowledge workers |
| **Data** | Current, detailed | Historical, summarized |
| **DB Design** | ER + Application | Star + Subject |
| **Access** | Read/Write | Read-heavy |
| **Unit of Work** | Short transaction | Complex query |
| **Records** | Tens | Millions |
| **DB Size** | 100MB-GB | 100GB-TB |

---

## 🧊 MULTIDIMENSIONAL DATA MODEL

### The Data Cube Concept
Instead of **flat tables** → Think in **multiple dimensions**

**Example:** Sales data by:
- 📅 **Time** (day, week, month, quarter, year)
- 🏪 **Location** (city, state, country, region)
- 📦 **Product** (category, type, brand)

### Cuboids (Levels of Summarization)
```
          ALL (0-D Apex Cuboid) ← Highest level
           ↓
    1-D Cuboids (one dimension)
           ↓
    2-D Cuboids (two dimensions)
           ↓
    3-D Cuboids (three dimensions)
           ↓
Base Cuboid (all dimensions) ← Lowest level
```

---

## 🔄 THREE SCHEMA DESIGNS

### 1️⃣ STAR SCHEMA ⭐
```
        Time
         ↑
         ↓
Product → [FACT TABLE] ← Location
         ↑
         ↓
      Branch
```
- **Fact table** in center
- Multiple **dimension tables** around it
- **Advantage:** Simple, easy to understand
- **Disadvantage:** Denormalization

### 2️⃣ SNOWFLAKE SCHEMA ❄️
```
    Time ← Normalized
      ↑      Dimensions
      ↓
Product → [FACT TABLE] ← Location
      ↑        ↓
      ↓      City ← Normalized
    Branch    ↓
           Country
```
- **Refinement** of star schema
- Dimensions **normalized** into smaller tables
- **Advantage:** Less redundancy
- **Disadvantage:** More complex queries

### 3️⃣ FACT CONSTELLATION 🌌
Multiple fact tables **sharing** dimension tables
- Also called: **Galaxy Schema**
- Supports multiple business processes
- Complex but comprehensive

---

## 🎮 TYPICAL OLAP OPERATIONS

### 1. **ROLL-UP (Drill-Up)** 📈
- **Summarize** data by climbing hierarchy
- Move from **detailed → general**
- Example: Daily sales → Weekly → Monthly → Yearly

### 2. **DRILL-DOWN (Roll-Down)** 📉
- **Reverse** of roll-up
- Move from **general → detailed**
- Example: Yearly → Quarterly → Monthly → Daily

### 3. **SLICE** 🔪
- Select **ONE** value from a dimension
- Example: "Show all sales for USA only"

### 4. **DICE** 🎲
- Select **MULTIPLE** values from dimensions
- Example: "Show sales for USA & Canada for Q1 & Q2"

### 5. **PIVOT (Rotate)** 🔄
- **Reorient** the cube view
- 3D → Multiple 2D planes
- Change perspective of analysis

---

## 🏗️ DATA WAREHOUSE ARCHITECTURE

```
DATA SOURCES
    ↓
    └─→ [EXTRACT] ──→ Cleaning & Integration
           ↓
        [TRANSFORM] ──→ Format conversion
           ↓
        [LOAD] ──→ Build indices, partitions
           ↓
    DATA WAREHOUSE (Central Repository)
           ↓
    ┌──────┴──────┐
    ↓             ↓
[OLAP Engine]  [Data Marts]
    ↓             ↓
  Analysis    Specific Groups
   Queries
    ↓
OUTPUT: Reports, Dashboards, Mining Results
```

### Back-End Tools & Utilities:
1. **Extraction** - Get data from multiple sources
2. **Cleaning** - Detect & fix errors
3. **Transformation** - Convert to warehouse format
4. **Load** - Sort, summarize, build indexes
5. **Refresh** - Update from data sources

---

## 💾 THREE DW MODELS

### 1. **ENTERPRISE DATA WAREHOUSE** 🏢
- Organization-wide
- All subjects covered
- Centralized, comprehensive
- Most complex

### 2. **DATA MART** 🎯
- **Subset** of corporate DW
- Specific user groups (e.g., Marketing)
- **Independent** or **Dependent** (from main DW)
- Quick implementation

### 3. **VIRTUAL WAREHOUSE** 👻
- Views over operational databases
- Only some summary views materialized
- No separate storage needed
- Limited scalability

---

## 🖥️ OLAP SERVER ARCHITECTURES

### 1. **ROLAP** (Relational OLAP)
- Uses **relational DBMS**
- OLAP middleware layer
- ✅ Greater scalability
- ❌ Slower queries

### 2. **MOLAP** (Multidimensional OLAP)
- **Array-based** storage
- Pre-computed summaries
- ✅ Fast indexing & queries
- ❌ Limited scalability

### 3. **HOLAP** (Hybrid OLAP)
- **Combines** ROLAP + MOLAP
- Low-level: Relational
- High-level: Array
- ✅ Flexibility
- Best of both worlds!

---

## 📈 DW USAGE (Three Levels)

### 1. **INFORMATION PROCESSING** 📊
- Querying & reporting
- Basic statistical analysis
- Charts, graphs, tables

### 2. **ANALYTICAL PROCESSING** (OLAP) 🔍
- Multidimensional analysis
- Drilling, slicing, pivoting
- Ad-hoc exploration

### 3. **DATA MINING** 🔎
- Discover hidden patterns
- Associations, classification, prediction
- Advanced analytics

---

## 🚀 FROM OLAP → OLAM

**OLAM** = On-Line Analytical Mining

### Why combine them?
✅ High quality data in DW (cleaned, integrated)
✅ OLAP tools already available
✅ Easy exploration with drilling/dicing
✅ Online selection of mining functions
✅ Multiple algorithms available

**The Evolution:**
```
Traditional Databases
        ↓
    OLTP
        ↓
    Data Warehouses
        ↓
    OLAP
        ↓
    OLAM ← Mining + Analytics Combined!
```

---

## 📋 SLOWLY CHANGING DIMENSIONS (SCD)

How to handle dimension attribute changes over time?

### **Type 1: Overwrite**
- Replace old value with new
- Lose historical data
- Simplest approach

### **Type 2: Add New Row**
- Keep old record, add new one
- Maintain complete history
- Most common approach

### **Type 3: Add Column**
- Add "Previous Department" column
- Keep current & previous value
- Limited history (only 1 previous)

---

## 🎓 KEY TERMS TO MEMORIZE

| Term | Meaning |
|------|---------|
| **Fact Table** | Central table with measures (sales, revenue) |
| **Dimension Table** | Descriptive attributes (time, location, product) |
| **Measure** | Numerical values to be analyzed (quantity, price) |
| **Aggregation** | Summarizing data (sum, average, count) |
| **Drill Down** | Go to more detail |
| **Roll Up** | Go to higher summary |
| **Metadata** | Data about data (schema, definitions) |
| **ETL** | Extract, Transform, Load |
| **Grain** | Level of detail in fact table |

---

## ✅ QUICK SUMMARY

**Data Warehouse = Decision Support System**

🎯 **Purpose:** Help managers make better decisions
📊 **Data:** Historical, integrated, cleaned
🔄 **Operations:** OLAP (drilling, slicing, dicing)
🏗️ **Structure:** Star/Snowflake schemas with dimensions & facts
⚙️ **Process:** ETL (Extract, Transform, Load)
📈 **Value:** Reports, dashboards, mining insights

---

## 💡 STUDY TIPS

1. **Remember the 4 characteristics** - They define what a DW IS
2. **OLTP vs OLAP** - Understand WHY they're different
3. **Schema types** - Star is simplest, Snowflake is normalized
4. **OLAP operations** - Drill-down, Roll-up, Slice, Dice, Pivot
5. **Architecture** - Know ETL pipeline & components
6. **The trend** - OLTP → OLAP → OLAM (integration of analytics & mining)

---

*Happy studying! 📚✨*