---
title: "Database GUI Design"
subtitle: "Multithreaded Administrative Desktop Application"
abstract: "An in-depth Python-based graphical user interface implemented using Tkinter with multithreading architecture. Features data logging, multi-parameter filtering, persistent storage, and secure administrative credential management."
order: 6
category: ["Software"]
date: "2021"
featured: true
thumbnail: "/images/projects/gui_python.webp"
links:
  code: "https://github.com/YouFoundJK/CollageDatabaseGUI.git"
---

### Architecture & Engineering
Engineered a performant desktop GUI utilizing Python's native Tkinter combined with background threading to avoid UI lockups during intensive SQLite queries.

### Key System Capabilities
- **Non-blocking Multithreaded Workers**: Search, sort, and query execution without freezing UI event loops.
- **Robust Schema & Persistent Storage**: SQLite database backend with automated table migration and transactional integrity.
- **Role-based Authentication**: Admin and viewer permissions for record creation, editing, and deletion.
- **Data Export & Visualization**: Integrated CSV and report export capabilities.
