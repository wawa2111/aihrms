from typing import Protocol, Any, Dict, List

class AgentInterface(Protocol):
    def perform_task(self, task: str) -> Any:
        ...

class RecruitmentAgentInterface(AgentInterface, Protocol):
    def post_job(self, job_details: Dict[str, Any]) -> str:
        ...
    
    def screen_candidates(self, candidates: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        ...
    
    def schedule_interview(self, candidate_id: str, interview_details: Dict[str, Any]) -> str:
        ...

class OnboardingAgentInterface(AgentInterface, Protocol):
    def create_onboarding_plan(self, employee_id: str) -> Dict[str, Any]:
        ...
    
    def track_progress(self, employee_id: str) -> Dict[str, Any]:
        ...
    
    def facilitate_training(self, employee_id: str) -> str:
        ...

class PayrollAgentInterface(AgentInterface, Protocol):
    def calculate_salary(self, employee_id: str) -> float:
        ...
    
    def manage_deductions(self, employee_id: str) -> Dict[str, float]:
        ...
    
    def generate_payslip(self, employee_id: str) -> str:
        ...

class PerformanceAgentInterface(AgentInterface, Protocol):
    def set_performance_goals(self, employee_id: str, goals: List[str]) -> None:
        ...
    
    def conduct_evaluation(self, employee_id: str) -> Dict[str, Any]:
        ...
    
    def provide_feedback(self, employee_id: str, feedback: str) -> None:
        ...

class LegalComplianceAgentInterface(AgentInterface, Protocol):
    def monitor_compliance(self) -> Dict[str, Any]:
        ...
    
    def update_policies(self, new_policy: Dict[str, Any]) -> None:
        ...
    
    def handle_legal_inquiries(self, inquiry: str) -> str:
        ...

class EngagementAgentInterface(AgentInterface, Protocol):
    def conduct_survey(self, survey_details: Dict[str, Any]) -> Dict[str, Any]:
        ...
    
    def organize_event(self, event_details: Dict[str, Any]) -> str:
        ...
    
    def analyze_engagement_metrics(self) -> Dict[str, Any]:
        ...