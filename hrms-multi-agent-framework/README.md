# HRMS Multi-Agent Framework

## Overview
The HRMS Multi-Agent Framework is designed to autonomously manage Human Resource Management System (HRMS) workflows through a specialized multi-agent architecture. Each agent focuses on a core HR function, ensuring efficient and effective management of various HR processes.

## Agents
- **Recruitment Agent**: Manages recruitment workflows, including posting job openings, screening candidates, and scheduling interviews.
- **Onboarding Agent**: Oversees the onboarding process, creating onboarding plans, tracking progress, and facilitating training sessions.
- **Payroll Agent**: Handles payroll processing, calculating salaries, managing deductions, and generating payslips.
- **Performance Agent**: Focuses on performance management, setting performance goals, conducting evaluations, and providing feedback.
- **Legal Compliance Agent**: Ensures adherence to Malaysian HR laws, monitoring compliance, updating policies, and handling legal inquiries.
- **Engagement Agent**: Manages employee engagement initiatives, conducting surveys, organizing events, and analyzing engagement metrics.

## Memory and Communication
The framework utilizes a shared memory system to facilitate communication and data sharing between agents. This allows for efficient collaboration and task management.

## Protocols
- **Task Delegation**: Manages the delegation of tasks among agents based on their specialization and tracks task completion.
- **Decision Making**: Implements decision-making protocols for agents, including consensus building and conflict resolution.

## Retrieval-Augmented Generation (RAG)
The framework integrates language models with retrieval-augmented generation capabilities to provide real-time compliance updates, respond to employee queries, and generate reports.

## Reporting
The reporting module generates comprehensive reports based on agent activities and compliance metrics, providing insights into HR processes.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd hrms-multi-agent-framework
   ```
3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage
To start the HRMS Multi-Agent Framework, run the main application:
```
python src/app.py
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.