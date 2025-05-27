class TaskDelegation:
    def __init__(self, agents):
        self.agents = agents

    def assign_task(self, task):
        agent = self.select_agent(task)
        if agent:
            agent.receive_task(task)
            return f"Task '{task}' assigned to {agent.__class__.__name__}"
        return "No suitable agent found for the task."

    def select_agent(self, task):
        # Logic to select an agent based on task specialization
        for agent in self.agents:
            if agent.can_handle(task):
                return agent
        return None

    def track_task_completion(self, task, agent):
        if agent.complete_task(task):
            return f"Task '{task}' completed by {agent.__class__.__name__}"
        return f"Task '{task}' not completed by {agent.__class__.__name__}"