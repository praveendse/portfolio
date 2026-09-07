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

## 🤔 WHY SEPARATE DATA WAREHOUSE?

### Performance Optimization
**Operational DB (OLTP):** Tuned for fast, small transactions (deposits, updates, deletes).

**Data Warehouse (OLAP):** Tuned for heavy, complex queries on millions of records.

Mixing them would slow both down!

### Different Needs

| Need | Operational DB | Data Warehouse |
|------|---|---|
| **Time span** | Current data only | 5-10+ years history |
| **Data scope** | Department-specific | Consolidated across org |
| **Data quality** | Different formats from each source | Cleaned & standardized |

### Key Challenges a Warehouse Solves

📊 **Missing History:** Operational systems don't keep long-term records. Decision support needs years of data.

🧩 **Data Consolidation:** A warehouse combines data from many different sources (sales DB, marketing DB, customer service system) into one unified place.

✅ **Data Quality:** Different systems use different formats or codes. The warehouse cleans and standardizes everything so it matches.

**Note:** Nowadays, some systems run OLAP directly on relational databases, but traditionally, separating them gives best performance and clarity.

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

### Understanding "CONSOLIDATED" Data 🧩
**Consolidated** means unified, cleaned, and integrated data from multiple sources:
- Multiple databases merged into one place
- Different formats standardized
- One consistent version of truth for the whole organization
- Example: Sales DB (Oracle) + Customer Service DB (SQL Server) + Marketing spreadsheets → all merged in warehouse

**Why it matters:** Instead of scattered, inconsistent records across departments, decision-makers have one reliable dataset.

---

### ER + Application vs. Star + Subject 📊
**Operational Database (ER + Application):**
- Entity-Relationship model designed for transactions
- Organized by application needs (payroll, inventory, banking)
- Normalized design (less redundancy, but complex for analysis)

**Data Warehouse (Star + Subject):**
- Star schema with central fact table
- Organized by subject themes (sales, customers, products)
- Denormalized design (easier analysis, more storage)

---

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
- **Fact table** in center with measures (sales amount, units sold)
- Multiple **dimension tables** around it
- **Simple & intuitive** structure
- **Denormalized** - some data duplication

**Best for:** Quick queries, straightforward analysis

**Advantage:** 
- ✅ Easy to understand & query
- ✅ Fast query performance

**Disadvantage:** 
- ❌ Data redundancy
- ❌ Storage inefficiency

---

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
- Dimensions **normalized** into smaller, related tables
- Looks like snowflake shape (branching structure)

**Best for:** Organizations concerned with storage space

**Advantage:**
- ✅ Less redundancy
- ✅ Efficient storage

**Disadvantage:**
- ❌ More complex queries (more joins)
- ❌ Slower query performance

---

### 3️⃣ FACT CONSTELLATION 🌌
Multiple fact tables **sharing** the same dimension tables
- Also called: **Galaxy Schema**
- Supports multiple business processes together

**Best for:** Complex enterprises with multiple analysis needs

**Advantage:**
- ✅ Supports multiple fact tables
- ✅ Dimensions reused across tables

**Disadvantage:**
- ❌ Most complex to manage
- ❌ Design & maintenance overhead

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

### Back-End Tools & Utilities (ETL Process):

1. **Extraction** 📤
   - Pull data from multiple, heterogeneous sources (different databases, files, systems)

2. **Cleaning** 🧹
   - Detect errors and fix them
   - Remove duplicates, handle missing values, correct spellings

3. **Transformation** 🔄
   - Convert data into standard warehouse format
   - Change date formats, unify currency, standardize codes

4. **Load** 📥
   - Insert cleaned data into warehouse
   - Sort data, build indexes (for faster search), create partitions (for manageability)

5. **Refresh** 🔁
   - Keep warehouse updated as source data changes
   - Regular updates to reflect new transactions/changes

---

## 💾 METADATA REPOSITORY

### What is Metadata?
**Metadata = "data about data"** — It's not the actual business data, but information *describing* the data.

### Library Analogy 📚
Think of the warehouse as a **giant library**:

- **Books** = actual data (sales, customers, products)
- **Catalog cards** = metadata (where books are, what's inside, who owns them)
- **Librarian** = metadata repository

Without metadata, you'd have a huge library but no way to find or understand anything!

### What Metadata Stores

📋 **Structure**
- Schemas, views, dimensions, hierarchies
- How data is organized

📍 **Operational Info**
- Data lineage (history of where data came from, how it was transformed)
- Currency of data (is it current, archived, or purged?)
- Monitoring (usage statistics, error logs, audit trails)

⚙️ **Technical**
- Algorithms used for summarization
- Mappings from operational to warehouse format
- Performance data (indexes, partitions, efficiency)

💼 **Business**
- Definitions of business terms
- Data ownership & responsibilities
- Access policies & charging rules

✅ **In short:** Metadata is the instruction manual + logbook of the warehouse.

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
**What it is:**
- Data warehouse stored inside a **relational database** (Oracle, SQL Server, PostgreSQL)
- Fact & dimension tables stored as regular DB tables
- Uses OLAP middleware to add analysis capabilities

**Strengths:** 
- ✅ **Highly scalable** - relational DBs can handle huge volumes
- ✅ Works well for enterprise-level warehouses (billions of records)

**Weaknesses:**
- ❌ **Slower queries** - summaries calculated on-the-fly, not pre-stored
- ❌ Complex joins across tables take time

**Analogy:** Like a giant warehouse with endless shelves — you can store anything, but finding items takes time.

---

### 2. **MOLAP** (Multidimensional OLAP) 🧊
**What it is:**
- Data stored in **multidimensional cube format** (not rows/columns)
- **Pre-computed summaries** stored inside the cube
- Array-based storage engine

**Strengths:**
- ✅ **Super fast queries** - answers already calculated
- ✅ Excellent for interactive exploration (roll-up, drill-down, pivot)

**Weaknesses:**
- ❌ **Limited scalability** - cubes get large and sparse with more data
- ❌ High storage overhead for pre-computed summaries

**Analogy:** Like a smaller warehouse with pre-packed kits — you grab results instantly, but storage is limited.

---

### 3. **HOLAP** (Hybrid OLAP) 🔄
**What it is:**
- **Combines best of ROLAP + MOLAP**
- **Low-level:** Detail data in relational DB (like ROLAP)
- **High-level:** Summaries in multidimensional cubes (like MOLAP)

**Strengths:**
- ✅ **Flexibility** - handles both detailed & summarized queries
- ✅ **Balanced** - scalability + speed
- ✅ Only essential summaries are pre-computed

**Weaknesses:**
- ❌ More complex to manage
- ❌ Performance depends on balance between storage types

**Example:** Microsoft SQL Server Analysis Services (SSAS)

---

### ⚖️ Quick Comparison

| Type | Storage | Speed | Scalability | Best For |
|------|---------|-------|-------------|----------|
| **ROLAP** | Relational DB | Slower | Very high | Large enterprises |
| **MOLAP** | Cube arrays | Very fast | Lower | Interactive reporting |
| **HOLAP** | Hybrid | Balanced | Good | Most enterprises |

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

## 💧 DATA LAKE vs DATA WAREHOUSE

### Key Differences

| Feature | Data Lake | Data Warehouse |
|---------|-----------|---|
| **Data Type** | Raw (structured, semi-structured, unstructured) | Processed, structured |
| **Purpose** | Store everything first, decide later | Organized for specific analysis |
| **Schema** | Schema-on-read (structure when used) | Schema-on-write (structure before saving) |
| **Users** | Data scientists, engineers (ML, AI, exploration) | Business analysts, managers (reports, dashboards) |
| **Cost** | Lower (cheap storage) | Higher (processing + structure) |
| **Flexibility** | Highly flexible | Rigid, harder to change |

### Simple Analogy 🎨
- **Data Lake** = Giant storage pool where you dump everything (unsorted box of photos), decide later
- **Data Warehouse** = Organized library where books are cataloged, labeled, and easy to find

### When to Use Each
✅ **Use Data Lake if:**
- Need to store huge amounts of diverse data cheaply
- Planning machine learning or advanced analytics
- Don't yet know all the questions you'll ask

✅ **Use Data Warehouse if:**
- Need fast, reliable business reports
- Users are managers/analysts who prefer structured dashboards
- Want consistent, high-quality data for decisions

⚠️ **Modern Approach:** Many companies use BOTH together!
- Store raw data in a lake
- Move cleaned subsets into a warehouse for reporting

---

## 🚀 FROM OLAP → OLAM (Online Analytical Mining)

### OLAP (Online Analytical Processing)
- Analyzes data with queries, summaries, and reports
- Supports slicing, dicing, drilling, pivoting
- Helps managers explore data

### OLAM (Online Analytical Mining)
- **Combines OLAP with Data Mining**
- Not just analyze, but discover hidden patterns & predictions
- Integrates multiple mining algorithms, models, and tasks

### Why OLAM?
✅ **High-quality data** - DW already has integrated, consistent, cleaned data

✅ **Tools ready** - DW has strong query tools (ODBC, OLEDB, web access, dashboards)

✅ **Seamless integration** - OLAP operations (slice, dice, drill) can extend into mining

✅ **Flexible exploration** - Users select mining functions online and swap between algorithms

### Evolution
```
Traditional Databases
         ↓
      OLTP (transactions)
         ↓
   Data Warehouses
         ↓
      OLAP (analysis)
         ↓
     OLAM ← Mining + Analytics Combined! ⭐
```

### OLAM System Layers
1. **Layer 1:** Data Repository (warehouse + metadata + integration)
2. **Layer 2:** MDDB (Multidimensional Database - cubes)
3. **Layer 3:** OLAP/OLAM Engines (perform analysis & mining)
4. **Layer 4:** User Interface (GUI, dashboards, visualization)

✅ **In short:** OLAM = powerful analytics that discovers insights, not just reports data.

---

## 📈 THREE USES OF DATA WAREHOUSE

### 1. Information Processing 📊
- Basic queries, reports, charts, tables
- Statistical analysis
- Example: "Show monthly sales totals by region"

### 2. Analytical Processing (OLAP) 🔍
- Multidimensional analysis
- Slice, dice, drill-down, pivot operations
- Example: "Compare TV sales in Canada vs. USA by quarter"

### 3. Data Mining 🔎
- Discover hidden patterns & knowledge
- Association rules, classification, prediction
- Example: "Which products are frequently bought together?"

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