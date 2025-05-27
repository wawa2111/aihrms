class SampleAgent:
    def __init__(self, name):
        self.name = name

    def execute(self, task):
        return f"{self.name} is executing the task: {task}"