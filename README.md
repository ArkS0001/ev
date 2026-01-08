```
enterprise-portal/
│
├── angular.json
├── package.json
├── package-lock.json
├── README.md
│
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
│
├── node_modules/
├── public/
├── backend/
│
└── src/
    │
    ├── index.html
    ├── styles.css
    │
    ├── main.ts
    ├── main.server.ts
    ├── server.ts
    │
    └── app/
        │
        ├── app.ts
        ├── app.html
        ├── app.css
        ├── app.spec.ts
        │
        ├── app.config.ts
        ├── app.config.server.ts
        │
        ├── app.routes.ts
        ├── app.routes.server.ts
        │
        └── battery/
            │
            ├── api/
            │   ├── battery-api.ts
            │   ├── battery-api.spec.ts
            │   └── battery-controller/
            │
            ├── domain/
            │   └── battery.domain.ts
            │
            ├── guards/
            │   └── battery.guards.ts
            │
            ├── services/
            │   ├── warranty.ts
            │   └── warranty.spec.ts
            │
            └── ui/
                │
                └── add-battery/
                    ├── add-battery.ts
                    ├── add-battery.html
                    ├── add-battery.css
                    └── add-battery.spec.t

```
EV Battery Lifecycle & Warranty Management System
1. Purpose of the System

The EV Battery Lifecycle & Warranty Management System is designed to manage, track, and evaluate electric vehicle battery data throughout its lifecycle—from manufacturing to retirement—while dynamically determining warranty eligibility based on battery health metrics.

The system ensures:

Long-term battery data persistence

Accurate warranty evaluation based on business rules

Clear separation of frontend, backend, and domain logic

Extensibility for enterprise-scale EV platforms

2. High-Level Architecture

The system follows a client–server architecture with three major components:

Angular Frontend

Node.js Backend (Express)

Persistent Data Store (JSON-based using lowdb)

The frontend communicates with the backend through REST APIs. The backend manages business rules and persistence. The database stores long-lived battery records.

3. Backend Implementation
3.1 Technology Stack

Node.js

Express.js

lowdb (JSON-based database)

3.2 Data Persistence Layer

Battery data is stored persistently in a db.json file using the lowdb library.

The persistence layer:

Initializes the database with a default structure

Ensures data survives server restarts

Abstracts database read/write logic from API handlers

Each battery record contains:

Identification details

Lifecycle status

Manufacturing and installation dates

Health metrics (SOC, SOH, charge cycles)

3.3 REST API Layer

The backend exposes RESTful endpoints to manage batteries and evaluate warranty eligibility.

Supported Endpoints
Method	Endpoint	Description
GET	/api/battery	Retrieve all batteries
GET	/api/battery/:id	Retrieve a specific battery
POST	/api/battery	Add a new battery
PATCH	/api/battery/:id/health	Update battery health
POST	/api/battery/warranty	Check warranty eligibility
3.4 Warranty Evaluation Logic

Warranty eligibility is calculated dynamically and is not stored in the database.

The warranty logic evaluates:

State of Health (SOH)

Charge cycles

Battery lifecycle status

The response includes:

Battery ID

Eligibility status

Reason for eligibility or rejection

This approach ensures compliance, auditability, and flexibility when business rules change.

4. Frontend Implementation (Angular)
4.1 Angular Architecture

The frontend uses Angular standalone components with feature-based folder organization.

Key characteristics:

No NgModules

Centralized routing

Strong separation between UI, services, and domain models

4.2 Application Configuration

Routing and application bootstrap are handled through:

app.config.ts

app.routes.ts

These files define global providers and navigation paths for the application.

4.3 API Communication Layer

All backend communication is handled via a dedicated Angular service.

Responsibilities:

Centralize HTTP calls

Return Observables to components

Abstract backend URLs and request formats

This ensures consistency and simplifies future API changes.

4.4 Battery Dashboard

The main dashboard:

Displays all batteries in a tabular format

Highlights warranty eligibility visually

Allows per-battery warranty checks

The dashboard fetches real-time data from the backend and does not maintain any hardcoded state.

4.5 Add Battery Feature

The Add Battery feature provides a form-based UI to create new battery records.

The form captures:

Battery identification details

Lifecycle status

Manufacturing date

Health metrics (SOH, cycles)

Optional vehicle association

Upon submission:

Data is validated

Sent to the backend

Persisted in db.json

Reflected immediately in the dashboard

5. Domain Modeling

Battery data is modeled as a domain entity rather than a flat object.

Key design decisions:

Health metrics are grouped into a dedicated object

Lifecycle status is explicit

Warranty is derived from health data

This design mirrors real-world EV battery systems and supports long-term evolution.

6. Data Flow Summary

User interacts with Angular UI

Angular calls backend REST APIs

Backend reads/writes battery data from JSON storage

Warranty logic evaluates eligibility dynamically

Response is returned to frontend

UI updates based on backend response

7. Scalability and Extensibility

The implementation supports future enhancements such as:

Migration to MongoDB or PostgreSQL

Role-based access control

Advanced warranty rules

Battery recycling and second-life tracking

Event-driven health updates

8. Key Benefits of the Implementation

Clear separation of concerns

Persistent, audit-friendly data storage

Centralized business rules

Modern Angular architecture

Enterprise-ready design patterns
