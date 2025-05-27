# HRMS Multi-Agent Framework

## Overview
The HRMS Multi-Agent Framework is designed to facilitate various human resource management tasks through a multi-agent system. Utilizing Hugging Face Transformers and transformers-agents, this framework allows for the automation of recruitment, onboarding, payroll processing, performance evaluation, compliance, and employee engagement.

## Project Structure
```
hrms-multi-agent-framework
├── src
│   ├── agents
│   │   ├── __init__.py
│   │   ├── recruitment_agent.py
│   │   ├── onboarding_agent.py
│   │   ├── payroll_agent.py
│   │   ├── performance_agent.py
│   │   ├── compliance_agent.py
│   │   └── engagement_agent.py
│   ├── orchestrator
│   │   ├── __init__.py
│   │   └── main.py
│   ├── utils
│   │   └── __init__.py
│   └── config
│       └── settings.py
├── requirements.txt
├── README.md
└── .gitignore
```

## Installation
To set up the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd hrms-multi-agent-framework
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Usage
To run the multi-agent system, execute the following command:
```
python src/orchestrator/main.py
```

## Agents
The framework includes the following agents:

- **RecruitmentAgent**: Manages job postings and candidate screening.
- **OnboardingAgent**: Facilitates the onboarding process for new hires.
- **PayrollAgent**: Handles payroll processing and related queries.
- **PerformanceAgent**: Manages employee performance evaluations and feedback.
- **ComplianceAgent**: Ensures adherence to HR laws and regulations.
- **EngagementAgent**: Focuses on employee engagement and satisfaction initiatives.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.