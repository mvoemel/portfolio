# Website Builder

**Website Builder** is a powerful full-stack application that enables users to design, build, and host websites via an intuitive drag-and-drop interface. It features sub-domain hosting, project management tools, and a robust recursive editor architecture.

[View Live Demo](https://websitebuilder-mvoemel.vercel.app/)

## Tech Stack

- **Framework:** Next.js (TypeScript)
- **Runtime:** Bun
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js
- **Storage:** UploadThing
- **Styling:** Tailwind CSS (Inferred)

## Key Features

- **Drag & Drop Editor:** Seamlessly construct layouts using a component-based interface.
- **Subdomain Hosting:** Automatically publish sites to custom subdomains.
- **Project Management:** Integrated Kanban board for managing tasks.
- **Recursive Architecture:** Supports complex, nested layouts (containers within containers).
- **State Management:** Built-in history (Undo/Redo) and device preview modes.

## Editor Architecture

The core of the application is the **Recursive Editor Engine**, designed to handle complex nested structures.

### The Element System

The editor treats every component as a node in a tree structure. A **Master Recursive Element** dynamically renders components based on their type:

- **Static Elements:** Leaf nodes like Text, Video, or Links.
- **Recursive Elements:** Containers (e.g., "2-Column Layout") that hold arrays of other elements.

### Data Structure Example

The state is persisted as a JSON tree, allowing for easy serialization and restoration:

```json
{
  "id": "uuid-123",
  "type": "2col",
  "name": "Two Columns",
  "content": [
    {
      "type": "container",
      "content": [{ "type": "video", "src": "..." }]
    },
    {
      "type": "container",
      "content": [{ "type": "text", "innerText": "Hello World" }]
    }
  ]
}
```
