class ReportGenerator:
    def __init__(self, agents):
        self.agents = agents

    def generate_agent_activity_report(self):
        report = "Agent Activity Report\n"
        report += "=" * 30 + "\n"
        for agent in self.agents:
            report += f"Agent: {agent.__class__.__name__}\n"
            report += f"Activities: {agent.get_activity_log()}\n"
            report += "-" * 30 + "\n"
        return report

    def generate_compliance_report(self, legal_agent):
        report = "Compliance Report\n"
        report += "=" * 30 + "\n"
        compliance_status = legal_agent.check_compliance()
        report += f"Compliance Status: {compliance_status}\n"
        report += "-" * 30 + "\n"
        return report

    def export_report(self, report, filename):
        with open(filename, 'w') as file:
            file.write(report)

    def generate_full_report(self, legal_agent, filename):
        activity_report = self.generate_agent_activity_report()
        compliance_report = self.generate_compliance_report(legal_agent)
        full_report = activity_report + compliance_report
        self.export_report(full_report, filename)