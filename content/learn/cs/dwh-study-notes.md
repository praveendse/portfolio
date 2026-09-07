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

**Consolidated = Unified & Clean**
- Brings together data from many different systems into ONE unified view
- Single version of truth (no scattered, inconsistent records)
- Standardizes data formats across all sources
- Example: Sales DB (Oracle) + Customer DB (SQL Server) + Marketing data (Excel) → ONE integrated warehouse

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
| **Users** | Clerk, IT staff | Knowledge workers, Managers |
| **Data** | Current, detailed, isolated | Historical, summarized, integrated |
| **DB Design** | ER + Application-oriented | Star/Snowflake + Subject-oriented |
| **View** | Current, local | Evolutionary, integrated |
| **Access** | Read/Write (updates) | Read-only (complex queries) |
| **Unit of Work** | Short, simple transaction | Long, complex query |
| **Records** | Tens | Millions |
| **DB Size** | 100MB-GB | 100GB-TB |

**🔑 Why Separate?**
- **High performance for both** — Each system tuned for its own workload
- **Missing data** — Operational DBs don't keep long history; warehouses do (5-10 years)
- **Consolidation** — Warehouse combines data from many sources into one unified view
- **Data quality** — Different sources use inconsistent formats; warehouse standardizes them

---

## 🎯 DATABASE DESIGN: ER+Application vs Star+Subject

### ER + Application Model (Operational DB)
- **Entity-Relationship** model for transaction processing
- Organized by **application needs** (payroll, inventory, banking)
- **Normalized design** — reduces redundancy, ensures consistency
- Focus: **Current, up-to-date values** for daily operations
- Complex for analytical queries

### Star + Subject Model (Data Warehouse)
- **Star/Snowflake schema** with dimensions and facts
- Organized by **subject themes** (sales, customers, products)
- **Denormalized design** — easier to query, supports OLAP
- Focus: **Historical, consolidated data** for decision-making
- Optimized for analytical queries

✅ **Bottom line:** ER+Application = Running the business | Star+Subject = Understanding & improving the business

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

## 💧 DATA LAKE vs DATA WAREHOUSE

| Aspect | Data Lake | Data Warehouse |
|--------|-----------|-----------------|
| **Data Type** | Raw (structured, semi, unstructured) | Processed, structured |
| **Purpose** | Store everything first, decide later | Organized for specific analysis |
| **Schema** | Schema-on-read (apply when used) | Schema-on-write (defined first) |
| **Users** | Data scientists, engineers | Analysts, managers |
| **Flexibility** | Highly flexible | More rigid |
| **Processing** | ELT (Extract → Load → Transform) | ETL (Extract → Transform → Load) |
| **Best For** | Machine learning, exploration, AI | Business reports, dashboards |
| **Cost** | Lower (cheap storage) | Higher (processing + structure) |

**📚 Library Analogy:**
- **Data Lake** = A giant storage pool where you dump everything (unsorted photos)
- **Data Warehouse** = A library where books are cataloged, labeled, and ready to find

✅ **Modern approach:** Use BOTH together! Store raw data in lake, move cleaned subsets to warehouse for reporting.

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

### 1. **ROLAP** (Relational OLAP) 🗄️
- Uses **relational databases** (Oracle, SQL Server) to store warehouse
- Data stored as fact + dimension tables in RDBMS
- OLAP middleware adds query logic on top
- **✅ Scalability** — Can handle huge data volumes (billions of records)
- **❌ Speed** — Summaries calculated on-the-fly; complex joins required
- Best for: Enterprise warehouses with massive datasets

**Why slower:** Queries compute aggregations at query time instead of storing them.

### 2. **MOLAP** (Multidimensional OLAP) 🧊
- Uses **multidimensional cube** storage (array-based)
- Data organized by dimensions (product, time, region)
- Summaries **pre-computed** and stored in cube
- **✅ Speed** — Ultra-fast queries; results already calculated
- **❌ Scalability** — Cubes get very large; can't handle unlimited growth
- Best for: Quick interactive reporting, specific summaries

**Why fast:** Pre-computed aggregations mean instant answers.

### 3. **HOLAP** (Hybrid OLAP) 🔄
- **Combines** ROLAP (scalability) + MOLAP (speed)
- Low-level detail → stored in relational DB (ROLAP)
- High-level summaries → stored in cube (MOLAP)
- **✅ Flexibility** — Scalable AND fast
- **✅ Efficient storage** — Only summaries pre-computed
- Best for: Balanced performance, large + complex data

**Example:** Microsoft SQL Server Analysis Services

| Feature | ROLAP | MOLAP | HOLAP |
|---------|-------|-------|-------|
| **Scalability** | High ✅ | Low ❌ | High ✅ |
| **Speed** | Slow ❌ | Fast ✅ | Fast ✅ |
| **Storage** | Minimal | High | Medium |
| **Flexibility** | High | Low | High |

---

## 📈 DW USAGE (Three Levels)

### 1. **INFORMATION PROCESSING** 📊
- Querying & reporting with crosstabs, tables, charts
- Basic statistical analysis
- Example: "Show me monthly sales totals"
- Purpose: Regular reporting for dashboards

### 2. **ANALYTICAL PROCESSING** (OLAP) 🔍
- Multidimensional analysis
- Drilling, slicing, pivoting, dicing
- Ad-hoc exploration and trend analysis
- Example: "Compare TV sales in Canada vs USA by quarter"
- Purpose: Decision support through flexible queries

### 3. **DATA MINING** 🔎
- Discover hidden patterns & knowledge
- Associations (products bought together)
- Classification (categorize customers)
- Prediction (forecast future trends)
- Advanced analytics with ML models
- Example: "Find which products are often bought together"
- Purpose: Strategic insights from complex patterns

---

## 🚀 FROM OLAP → OLAM

**OLAM** = On-Line Analytical Mining (OLAP + Data Mining Combined)

### Why combine OLAP with Mining?

**✅ High-quality data** — Warehouse contains integrated, cleaned, consistent data

**✅ Information processing infrastructure** — OLAP tools already built:
- ODBC, OLEDB for connectivity
- Web access, reporting tools
- Query optimization

**✅ OLAP-based exploration** — Can explore with drilling, dicing, pivoting before mining

**✅ Online algorithm selection** — Choose mining functions and swap algorithms interactively

**✅ Multiple mining functions** — Use different algorithms (classification, clustering, association) together

### The Evolution Path:
```
Traditional Databases (fragmented, inconsistent)
        ↓
    OLTP (fast transactions)
        ↓
    Data Warehouses (clean, integrated, historical)
        ↓
    OLAP (analyze & explore)
        ↓
    OLAM ← Mining + Analytics Combined!
           (discover patterns + make predictions)
```

**🎯 Benefit:** Instead of just asking "What happened?" (OLAP), now ask "Why did it happen?" and "What will happen?" (OLAM)

---

## 📋 SLOWLY CHANGING DIMENSIONS (SCD)

How to handle dimension attribute changes over time?

**Scenario:** A branch changes from "Retail" to "Wholesale"

### **Type 1: Overwrite** 🔄
- Replace old value with new
- **Lose historical data**
- Simplest approach
- Example: Department changes from "Education" → "Strategy" (just update it)

### **Type 2: Add New Row** 📝
- Keep old record, add new one with different key
- **Maintain complete history**
- Most common approach
- Example: Create two records — one for old dept, one for new dept
- Can track when change happened

### **Type 3: Add Column** 📌
- Add "Previous" column to track old value
- Keep current & previous value in same row
- Limited history (only 1 previous value)
- Example: New columns "Prior_Department" + "Current_Department"

👉 **Most used:** Type 2 (full history tracking)

---

## 📂 METADATA REPOSITORY

**Metadata = "Data about data"** — It's the instruction manual and logbook of the warehouse

### What Metadata Stores:
- **Structure** → schemas, views, dimensions, hierarchies, table definitions
- **Operational info** → data lineage (where did data come from?), currency (current/archived/purged), usage stats, error logs, audit trails
- **Algorithms** → how summaries and aggregations are calculated
- **Mappings** → how operational data converts to warehouse format
- **Performance data** → indexes, partitions, efficiency metrics
- **Business info** → definitions of terms, data ownership, access policies, charging policies

**📚 Library Analogy:**
- **Warehouse = Library** (holds all the books/data)
- **Metadata = Card Catalog** (explains what's inside, where it is, who owns it, how it's organized)

💡 **Why important?** Without metadata, you'd have a huge warehouse but no way to find or understand the data!

---

## 🎓 KEY TERMS TO MEMORIZE

| Term | Meaning |
|------|---------|
| **Fact Table** | Central table with numerical measures (sales, revenue, quantity) |
| **Dimension Table** | Descriptive attributes (time, location, product, customer) |
| **Measure** | Numerical values to be analyzed (quantity, price, profit) |
| **Aggregation** | Summarizing data (sum, average, count, min, max) |
| **Drill Down** | Go from summary to more detailed view |
| **Roll Up** | Go from detail to higher-level summary |
| **Slice** | Select one value from a dimension |
| **Dice** | Select multiple values from multiple dimensions |
| **Pivot** | Rotate cube to view from different perspective |
| **Cuboid** | A slice/view of the data cube at different levels of detail |
| **Metadata** | Data about data (schema, definitions, lineage, ownership) |
| **ETL** | Extract, Transform, Load (data warehouse process) |
| **OLTP** | Online Transaction Processing (operational databases) |
| **OLAP** | Online Analytical Processing (data warehouse queries) |
| **OLAM** | Online Analytical Mining (OLAP + data mining) |
| **Grain** | Level of detail/atomic level in fact table |
| **Schema** | Structure of database (star, snowflake, fact constellation) |
| **Slowly Changing Dimension** | How to handle changes in dimension attributes over time |

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