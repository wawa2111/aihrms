from transformers import pipeline

class RecruitmentAgent:
    def __init__(self):
        self.job_postings = []
        self.candidates = []
        self.interviews = []

    def post_job(self, job_description):
        self.job_postings.append(job_description)
        return f"Job posted: {job_description}"

    def screen_candidates(self, resumes):
        # Using a language model to screen resumes
        screening_pipeline = pipeline("text-classification", model="distilbert-base-uncased")
        screened_candidates = []
        for resume in resumes:
            result = screening_pipeline(resume)
            if result[0]['label'] == 'positive':
                screened_candidates.append(resume)
        self.candidates = screened_candidates
        return f"Screened candidates: {len(screened_candidates)} selected."

    def schedule_interview(self, candidate, interview_time):
        self.interviews.append({'candidate': candidate, 'time': interview_time})
        return f"Interview scheduled for {candidate} at {interview_time}."