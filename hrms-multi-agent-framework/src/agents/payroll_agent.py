class PayrollAgent:
    def __init__(self):
        self.salary_data = {}
        self.deductions = {}
    
    def calculate_salary(self, employee_id):
        base_salary = self.salary_data.get(employee_id, 0)
        deductions = self.deductions.get(employee_id, 0)
        return base_salary - deductions
    
    def manage_deductions(self, employee_id, deduction_amount):
        if employee_id in self.deductions:
            self.deductions[employee_id] += deduction_amount
        else:
            self.deductions[employee_id] = deduction_amount
    
    def generate_payslip(self, employee_id):
        salary = self.calculate_salary(employee_id)
        payslip = {
            "employee_id": employee_id,
            "salary": salary,
            "deductions": self.deductions.get(employee_id, 0)
        }
        return payslip
    
    def update_salary_data(self, employee_id, salary):
        self.salary_data[employee_id] = salary