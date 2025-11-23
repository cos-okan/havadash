# Technology Stack

# Autonomous Drone Technology Stack  
### For Real-Time Autonomous Navigation, SLAM, Obstacle Avoidance & Fleet Connectivity

This document defines the recommended **firmware, middleware, autonomy, AI, communication, and cloud technology stack** for a fully autonomous drone platform.

---

## 1. Flight Control Layer (Real-Time Firmware)

### **PX4 Autopilot (Recommended)**
- **Language:** C++ (NuttX RTOS)
- **Strengths:**
  - Deterministic real-time control loops  
  - EKF2/EKF3 state estimation  
  - Mission management  
  - microRTPS bridge → ROS2 autonomy  
  - Sensor drivers + failsafe engine  
- **Supported Hardware:** Pixhawk, Cube, CUAV, Holybro, custom FMU designs

### Alternatives (Not recommended for this project)
- **ArduPilot** – feature rich but heavier & less integrated with ROS2  
- **DJI OSDK** – closed system  

---

## 2. Companion Computer Layer (High-Level Autonomy)

### **OS: Ubuntu 22.04 LTS (Canonical ROS 2 target)**

### Recommended Hardware Options
| Hardware | Reason |
|---------|--------|
| **NVIDIA Jetson Orin Nano / NX** | Best performance for AI + SLAM (TensorRT) |
| Raspberry Pi 5 | Light/medium robotics workloads |
| Qualcomm RB5 | AI accelerator alternative |

---

## 3. Middleware (Core Autonomy Framework)

### **ROS 2 Humble / Iron (Recommended)**  
Used for:
- Planning & navigation  
- SLAM & mapping  
- Obstacle detection/avoidance  
- Multi-sensor fusion  
- Mission execution  
- Video pipeline  
- Telemetry and diagnostics  

### Essential ROS2 Packages
- `nav2` – local & global planners  
- `mavros2` – MAVLink bridge  
- `microRTPS_agent/client` – PX4 ↔ ROS2 DDS bridge  
- `slam_toolbox` / `rtabmap_ros` / ORB-SLAM3  
- `robot_localization` – EKF fusion  
- `vision_msgs`, `nav_msgs`, `sensor_msgs`  

---

## 4. AI & Perception Layer

### Sensors
- Wide-angle RGB Camera  
- Stereo or RGB-D Camera (Realsense / OAK-D)  
- LiDAR (2D or 3D)  
- Optical Flow  
- IMU + Barometer (via PX4)  

### AI Inference Stack
- **TensorRT** (Jetson optimized)  
- **PyTorch** (training)  
- **ONNX Runtime** (portable inference)

### AI Features
- Dynamic obstacle recognition  
- Semantic scene understanding  
- Terrain classification  
- Visual odometry enhancement  
- Target/person/vehicle detection  

---

## 5. SLAM & Mapping Stack

### Recommended SLAM Techniques
| SLAM Type | Library | Notes |
|----------|---------|-------|
| **Visual SLAM** | ORB-SLAM3 | Best for indoor autonomy |
| **RGB-D SLAM** | RTAB-Map | Dense maps + loop closure |
| **LiDAR SLAM** | FAST-LIO / Cartographer | Best outdoor accuracy |
| **Fusion** | `robot_localization` EKF | Combine IMU + GNSS + VO + LiDAR |

---

## 6. Communication Layer

### **Drone ↔ Cloud Communication**
- **MQTT (primary)**  
- TLS certificates  
- Topics: telemetry, health, logs, mission status  

### **Drone ↔ Autopilot**
- **Fast DDS** (via microRTPS)  
- **MAVLink** (fallback or RC/manual control)

### Optional
- **WebRTC** for low-latency video streaming  
- **REST/gRPC** for mission uploads & authentication  

---

## 7. Autonomy Features Achieved

| Feature | Technology |
|--------|------------|
| Obstacle Avoidance | AI vision + LiDAR + Nav2 local planner |
| SLAM | ORB-SLAM3 / RTAB-Map / FAST-LIO |
| Autonomous Path Planning | Nav2 global planner + custom AI |
| Indoor Navigation | Visual SLAM + sensor fusion |
| Outdoor Navigation | GPS/GNSS + RTK + LiDAR fusion |
| 3D Mapping | RTAB-Map / Cartographer |
| Multi-Sensor Fusion | `robot_localization` EKF |
| Mission Execution | PX4 missions + custom ROS2 mission node |


## 8. Programming Languages by Layer

| Layer | Language |
|-------|----------|
| PX4 Firmware | **C++ (hard real-time)** |
| ROS2 Nodes | **C++** (high performance), **Python** (simple nodes) |
| AI Models | Python → ONNX → TensorRT |
| Backend Services | Node.js / Python / Go |
| Mission UI | React / Next.js |

---

## 9. Security Requirements
- MQTT over TLS  
- Device certificate provisioning (X.509)  
- Encrypted mission files  
- Signed firmware (FCU + companion)  
- Secure boot (Jetson)  

---

## 10. Summary Table

| Layer | Recommended Tech |
|------|------------------|
| Flight Firmware | PX4 |
| OS | Ubuntu 22.04 |
| Middleware | ROS2 Humble/Iron |
| SLAM | ORB-SLAM3 / RTAB-Map / FAST-LIO |
| AI | TensorRT + PyTorch |
| Comms | MQTT + MAVLink + Fast DDS |
| Autonomy | Nav2 + mission executor |
| Hardware | Jetson Orin Nano/NX |
