# Havadash — User Stories (Firmware & Software)

## Summary
This file lists user stories split into Firmware (drone-side) and Software (backend, frontend, infra) for the Havadash MVP. Each story includes a short description, acceptance criteria, priority and an estimate.

---

## Firmware User Stories

1. Telemetry publish — basic  
   - Description: As a drone, I publish periodic telemetry (timestamp, lat, lon, alt, speed, heading, battery, status) to MQTT topic `havadash/telemetry/{drone_id}`.  
   - Acceptance criteria: Telemetry JSON published at configured interval; payload validates against schema; includes device timestamp and drone_id.  
   - Priority: High — Estimate: 3

2. Telemetry QoS & retry  
   - Description: As a drone, I deliver telemetry reliably using MQTT QoS and retry logic when network is flaky.  
   - Acceptance criteria: Configurable QoS honored; failed publishes retried with backoff; buffer persists across transient disconnects.  
   - Priority: High — Estimate: 5

3. Command subscribe & ACK  
   - Description: As a drone, I subscribe to `havadash/commands/{drone_id}`, execute commands (land, pause, cancel) and publish ACKs to `havadash/commands/{drone_id}/ack`.  
   - Acceptance criteria: Commands parsed/validated; ACK contains command_id and status; ACK sent within configured timeout.  
   - Priority: High — Estimate: 5

4. Command execution safety checks  
   - Description: As a drone, I validate incoming commands against current state and safety rules before execution.  
   - Acceptance criteria: Unsafe/invalid commands rejected with ACK status; unsafe conditions logged locally.  
   - Priority: High — Estimate: 3

5. Flight session signaling  
   - Description: As a drone, I emit flight state transitions (takeoff, in_flight, landed) via telemetry so backend can detect flights.  
   - Acceptance criteria: Status transitions emitted with timestamps.  
   - Priority: Medium — Estimate: 2

6. Time sync & timestamp handling  
   - Description: As a drone, I maintain accurate timestamps and include a time-source marker in telemetry.  
   - Acceptance criteria: Telemetry includes timestamp and time source; server tolerates clock skew.  
   - Priority: Medium — Estimate: 2

7. OTA & configuration (stretch)  
   - Description: As a drone, I support secure OTA updates and remote configuration.  
   - Acceptance criteria: Accepts signed updates; can apply config changes; rollback on failure.  
   - Priority: Low — Estimate: 8

8. Local logging & diagnostics  
   - Description: As a drone, I record recent telemetry/command events locally for debugging and upload logs on request.  
   - Acceptance criteria: Circular log buffer; log upload or extract available on maintenance command.  
   - Priority: Low — Estimate: 3

---

## Software (Backend / Frontend / Infra) User Stories

1. Telemetry ingestion API  
   - Description: As backend, accept telemetry (HTTP + MQTT), validate and persist telemetry and flight_location records.  
   - Acceptance criteria: POST `/api/v1/telemetry` and MQTT consumer validate schema and persist records; return 200/201.  
   - Priority: High — Estimate: 5

2. Latest-state cache & GET drones  
   - Description: As an operator, fetch active drones with latest telemetry via GET `/api/v1/drones` using cached latest-state.  
   - Acceptance criteria: GET returns list with last_seen and latest telemetry; response latency < 200ms typical.  
   - Priority: High — Estimate: 3

3. Command creation & persistence  
   - Description: As an operator, create a command via POST `/api/v1/drone-commands` which persists the command and publishes to MQTT.  
   - Acceptance criteria: POST returns command_id and status; drone_commands record created; MQTT publish attempted.  
   - Priority: High — Estimate: 5

4. Command ACK tracking & status endpoint  
   - Description: As backend, track command ACKs and expose GET `/api/v1/drone-commands/:id`.  
   - Acceptance criteria: ACK updates ack_at and ack_payload; GET returns state transitions and timestamps.  
   - Priority: High — Estimate: 3

5. Flight detection & flight records  
   - Description: As backend, detect flight start/end from telemetry and create flight records with bounding box and summary.  
   - Acceptance criteria: Flight created on in_flight; ended on landed or inactivity; record includes start/end and summary_json.  
   - Priority: High — Estimate: 5

6. Flight-location query API  
   - Description: As a user, query flight-location samples via GET `/api/v1/flight-locations` for visualization/export.  
   - Acceptance criteria: Supports flight_id, time range, pagination; returns geo-ordered samples.  
   - Priority: High — Estimate: 3

7. Frontend live map & markers  
   - Description: As an operator, view active drones on a map with live updates and click marker for details.  
   - Acceptance criteria: Map shows markers from GET `/api/v1/drones`; updates via websocket or polling <2s typical.  
   - Priority: High — Estimate: 5

8. Frontend drone detail & command UI  
   - Description: As an operator, open drone panel showing telemetry, history and command buttons (Land, Pause, Cancel).  
   - Acceptance criteria: Panel shows latest telemetry and last N samples; POST creates commands and UI shows command state.  
   - Priority: High — Estimate: 5

9. Auth endpoints & basic user CRUD  
   - Description: As an admin, sign in via POST `/api/v1/auth/login` and manage users via `/api/v1/users`.  
   - Acceptance criteria: Login returns JWT; protected endpoints enforce auth middleware; user CRUD works.  
   - Priority: Medium — Estimate: 3

10. PRM reference endpoints  
    - Description: As UI, fetch PRM data (command types, states, drone models) for controls/validation.  
    - Acceptance criteria: GET `/api/v1/prm/*` returns reference sets; frontend uses for dropdowns/validation.  
    - Priority: Medium — Estimate: 2

11. Orders & delivery integration  
    - Description: As an operator, create/assign orders (pickup/drop coords) to drones and view associated flight history.  
    - Acceptance criteria: Order CRUD works; orders link to flights and customers; map overlays available.  
    - Priority: Medium — Estimate: 5

12. Dev environment & orchestration  
    - Description: As a developer, run full stack locally via Docker Compose (backend, frontend, mosquitto, postgres, redis).  
    - Acceptance criteria: Single `docker compose up` boots services per `apps/backend/local-setup.md`; migrations/seeds documented.  
    - Priority: High — Estimate: 3

13. Observability & logging  
    - Description: As operator/engineer, view structured logs and metrics for ingestion rates, ACK latency and errors.  
    - Acceptance criteria: Backend logs structured JSON to stdout; basic metrics for counts/latencies available.  
    - Priority: Medium — Estimate: 3

14. Tests — unit, integration, e2e  
    - Description: As QA, run unit/integration tests and an e2e scenario simulating a drone with `test-tools/mock-drone`.  
    - Acceptance criteria: Test scripts runnable via npm; integration validates telemetry->DB->flight detection->command ACK.  
    - Priority: High — Estimate: 5

15. Security & transport config  
    - Description: As operator, configure secure transports for production (HTTPS + MQTTS/TLS) via environment toggles.  
    - Acceptance criteria: TLS config supported; dev defaults to unsecured documented; switch to secure mode documented.  
    - Priority: Medium — Estimate: 3

16. Data retention & cleanup  
    - Description: As admin, configure retention policies for telemetry and flights and run cleanup jobs.  
    - Acceptance criteria: Retention config applied by DB job; cleanup runnable and schedulable; documented.  
    - Priority: Low — Estimate: 3