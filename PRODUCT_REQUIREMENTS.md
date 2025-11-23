# Havadash — Product Requirements Document (PRD)

## 1. Overview
Purpose: define scope, requirements and acceptance criteria for the Havadash MVP — an IoT platform to monitor and control delivery drones with real-time telemetry, command delivery, and flight history visualization.

Primary users: drone operators, fleet managers, and developers integrating drones into logistics workflows.

## 2. Goals & Success Metrics
Goals
- Real-time telemetry (location, battery, speed) for each drone.
- Send control commands to drones (land, cancel, pause) reliably.
- Persist and visualize flight history and telemetry.
- Provide a simple web UI for monitoring and control.

Success metrics
- Telemetry latency ≤ 2s from device to UI for 90% of messages.
- Command delivery ACK rate ≥ 95% within 5s.
- System uptime ≥ 99% during business hours.
- End-to-end test suite ≥ 80% coverage for core services.

## 3. Scope (MVP)
Included
- MQTT broker (Mosquitto) integrated with backend.
- Backend service to ingest telemetry and publish commands.
- PostgreSQL storage for telemetry and flight records.
- REST API to query active telemetry and flight history.
- React-based web UI with map view for active drones and command controls.
- Docker Compose for local orchestration.

Excluded (MVP out-of-scope)
- User authentication/roles (deferred).
- Advanced route optimization, mobile app, geo-fence alerts.

## 4. User Personas
- Fleet Operator: monitors multiple drones, issues commands.
- Field Technician: inspects drones and reviews flight logs.
- Developer/Integrator: uses API to integrate Havadash into other systems.

## 5. Key Features & Requirements

5.1 Telemetry Ingestion
- Devices publish telemetry to MQTT topics: havadash/telemetry/{drone_id}
- Telemetry payload (JSON): timestamp, lat, lon, alt, speed, heading, battery, status.
- Backend accepts telemetry via telemetry-data controller and persists telemetry and flight_location samples.
- Latest-state available via drones endpoints and PRM for drone states.
Acceptance criteria
- Telemetry received via POST /api/v1/telemetry or MQTT ingestion pipeline is persisted and queryable.

5.2 Commanding
- Commands sent to MQTT topic: havadash/commands/{drone_id}
- Command schema (JSON): command_id, type, issued_by, params, issued_at
- Drone must ACK on havadash/commands/{drone_id}/ack with command_id and status.
- API: POST /api/v1/drones/{id}/commands -> returns command_id and status
- Track delivery state and ACKs in DB.
- Commands can be created via POST /api/v1/drone-commands and statuses are tracked in drone_commands table.
- PRM tables define available command types and states.

Acceptance criteria
- Commands persisted and status retrievable via GET /api/v1/drone-commands/:id.

Acceptance criteria
- Backend returns ACKed or queued state; ACK recorded when received.

5.3 Flight History & Reporting
- Flight session detection: start when drone changes status to "in_flight" or telemetry indicates motion; end when status "landed" or motion stops for X minutes.
- Store flight sessions with start/end time, bounding box, telemetry samples.
- UI: list of flights and route visualization on map.
- Flights and flight_locations persisted; flight controller exposes list and detail endpoints.

Acceptance criteria
- Flights listed; route plotted; exportable as JSON.
- Flights and location samples returned by GET /api/v1/flights and GET /api/v1/flight-locations.

5.4 Web UI (React)
- Map (Leaflet) showing active drones with markers and live updates.
- Drone detail panel with telemetry, recent history, and command controls.
- Command buttons: Land, Pause, Cancel + confirmation modal.
- Backend endpoints provide data needed by frontend (apps/frontend) for maps, drone lists, commands and flight visualizations.

Acceptance criteria
- Map updates within telemetry latency SLA; commands can be issued and show status.

5.5 Infrastructure & DevOps
- Docker Compose for local dev (services: backend, frontend, mosquitto, postgres, redis).
- Basic logging and error handling; logs aggregated to stdout.
- DB migrations and seed data scripts.

Acceptance criteria
- dev environment bootstraps with a single `docker compose up` on macOS.

## 6. Data Model (high level)
The backend (apps/backend) contains implemented models, controllers and routes that are part of the MVP. Use these when scoping features and acceptance criteria.

Implemented model areas (DB tables / domain objects)
- drones (id, model, state, last_seen, metadata)
- drone_commands (id, drone_id, type_id, params, status_id, issued_by, issued_at, ack_at, ack_payload)
- telemetry / flight_locations (id, drone_id, timestamp, lat, lon, alt, speed, heading, battery, raw_payload)
- flights (id, drone_id, start_at, end_at, summary_json)
- orders (id, customer_id, status, pickup/drop coords)
- customers, addresses, customer_address_map
- prm_* tables (prm_command_type, prm_command_state, prm_drone_model, prm_drone_state, prm_alarm_type, prm_alarm_severity)
- alarm_data (id, drone_id, type_id, severity_id, timestamp, payload)
- users (id, email, role, ...)
- city, country

Implemented controllers (representing working API surface)
- address.controller.js
- alarm-data.controller.js
- auth.controller.js
- city.controller.js
- country.controller.js
- customer-address-map.controller.js
- customer.controller.js
- drone-command.controller.js
- drone.controller.js
- flight-location.controller.js
- flight.controller.js
- order.controller.js
- prm.controller.js
- telemetry-data.controller.js
- user.controller.js



## 7. APIs (summary)
API endpoints (summary of implemented routes)
- Auth
  - POST /api/v1/auth/login
  - POST /api/v1/auth/logout
- Drone & Telemetry
  - GET /api/v1/drones
  - GET /api/v1/drones/:id
  - POST /api/v1/telemetry (or POST /api/v1/telemetry-data)
  - GET /api/v1/drones/:id/telemetry
  - GET /api/v1/flight-locations (stream/query flight location samples)
- Commanding
  - POST /api/v1/drone-commands (issue command to drone)
  - GET /api/v1/drone-commands/:id (command status)
- Flights & History
  - GET /api/v1/flights
  - GET /api/v1/flights/:id
  - Flight-location samples related endpoints
- Orders & Customers
  - GET/POST /api/v1/orders
  - GET/POST /api/v1/customers
  - Address and customer-address-map endpoints
- Admin / PRM
  - GET /api/v1/prm/* (command types, states, drone models, etc.)
- Alarm data
  - GET /api/v1/alarm-data
- Users & reference data
  - GET/POST /api/v1/users
  - GET /api/v1/cities
  - GET /api/v1/countries

API contracts should return JSON, use standard HTTP status codes, and include pagination for list endpoints.


Note: exact path prefixes /api/v1/ are used by the app; route names follow controller names. Check apps/backend/docs/swagger/api-docs.yml for full contract.

## 8. Telemetry & Command Schemas (examples)
Telemetry example
{
  "drone_id": "drone-123",
  "timestamp": "2025-11-23T12:34:56Z",
  "lat": 41.0,
  "lon": 29.0,
  "alt": 120.5,
  "speed": 5.2,
  "heading": 180,
  "battery": 76,
  "status": "in_flight"
}

Command example
{
  "command_id": "cmd-456",
  "type": "land",
  "params": {},
  "issued_by": "operator-1",
  "issued_at": "2025-11-23T12:35:10Z"
}

## 9. Non-functional Requirements
- Latency & availability targets (see section 2).
- Secure transport for production (MQTTS/TLS, HTTPS). MVP can use unsecured MQTT locally but must be configurable.
- Scalability: design to support horizontal scaling of backend consumers.
- Observability: structured logs, basic metrics (message counts, latencies).

## 10. Testing & QA
- Unit tests for backend ingestion, command handling, and DB logic.
- Integration tests: telemetry-to-DB, command roundtrip with a simulated MQTT client.
- E2E test: simulate a drone session, ensure flight detection and UI visualization.
- Backend includes unit and integration test directories (apps/backend/tests).
- There is test tooling and a mock-drone utility under test-tools/mock-drone to simulate telemetry/commands.

Developer run notes
- Backend local setup: see apps/backend/local-setup.md and apps/backend/README.md
- Start local dev stack: docker compose up (project's top-level docker compose includes backend, frontend, mosquitto, postgres, redis)

## 11. Milestones & Timeline (example)
- Week 0–1: Infrastructure + MQTT + DB + basic backend ingestion
- Week 2: Command API + ACK handling + persistent state
- Week 3: Frontend map + live updates + command UI
- Week 4: Flight history, tests, Docker Compose, QA & polish

## 12. Risks & Mitigations
- Message loss: use QoS and persistent topics; implement retries and ACK tracking.
- Time sync issues: use device timestamps + server ingestion timestamp; tolerate clock skew.
- Scale: monitor and add consumer workers; use Redis for latest-state cache.

## 13. Open Questions
- Authentication & multi-tenant support timeline?
- Required retention period for telemetry and flights?
- Should commands support scheduling or only immediate execution?

## 14. Acceptance Criteria (MVP)
- Backend ingests telemetry from MQTT and persists it.
- Latest telemetry is queryable via REST.
- Commands can be issued via API and delivered via MQTT with ACK tracking.
- Frontend displays active drones on a map, shows details and allows command issuance.
- Developer experience: local dev setup with Docker Compose and documented run steps.
- The existing backend implementation must:
  - Persist telemetry and flight_location samples.
  - Expose drones, telemetry, commands and flights via REST as implemented controllers.
  - Allow creating commands (drone-commands) and exposing their status.
  - Provide PRM reference data for command types and states.
- Frontend consumes these endpoints to render live map and command UI.