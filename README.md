#  Project Tracker UI

A multi-view project management frontend application built using React + TypeScript.

##  Features

### 1. Multi-View System
- Kanban Board (To Do, In Progress, Review, Done)
- List View (sortable table with virtual scrolling)
- Timeline View (basic Gantt-style representation)

All views use the same dataset — no re-fetching.

---

### 2. Custom Drag-and-Drop
- Implemented using native drag events (no libraries)
- Tasks can be moved across Kanban columns
- Placeholder shown during drag to prevent layout shift
- Drop zones highlighted visually
- Smooth snap-back if dropped outside valid area

---

### 3. Virtual Scrolling (List View)
- Only visible rows are rendered
- Buffer rows added for smooth scrolling
- Handles 500+ tasks efficiently
- No external libraries used

---

### 4. Filters & URL State
- Filter by status and priority
- Filters reflected in URL query params
- Supports browser back navigation
- Clear filters option available

---

### 5. UI & UX
- Built with Tailwind CSS
- Responsive layout (desktop + tablet)
- Clean spacing, shadows, and modern design

---

##  Tech Stack

- React + TypeScript
- Zustand (state management)
- Tailwind CSS
- Vite

---

## State Management Decision

Zustand was chosen because:
- Lightweight and simple compared to Redux
- Minimal boilerplate
- Direct state updates with good performance
- Suitable for centralized task data shared across views

---

##  Virtual Scrolling Implementation

- Calculated visible rows using scroll position
- Rendered only required rows + buffer
- Used container height simulation (`totalHeight = rowHeight * totalRows`)
- Applied `translateY` to position visible rows correctly
- Ensured no flickering or blank gaps

---

##  Drag-and-Drop Approach

- Used native `dragstart`, `dragover`, and `drop` events
- Stored dragged task globally
- Highlighted drop zones dynamically
- Used placeholder div with fixed height to avoid layout shift
- Updated task status on drop

---

## Setup Instructions

```bash
npm install
npm run dev
