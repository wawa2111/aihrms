from transformers import pipeline
import json
import os

class RAGPipeline:
    def __init__(self, model_name="facebook/rag-token-nq"):
        self.retriever = pipeline("document-retrieval", model=model_name)
        self.generator = pipeline("text2text-generation", model=model_name)
        self.dataset_path = os.path.join(os.path.dirname(__file__), 'datasets', 'malaysian_hr_law.json')
        self.load_dataset()

    def load_dataset(self):
        with open(self.dataset_path, 'r') as file:
            self.dataset = json.load(file)

    def process_query(self, query):
        retrieved_docs = self.retriever(query, self.dataset)
        response = self.generator(query, context=retrieved_docs)
        return response

    def update_compliance_info(self, new_info):
        self.dataset.append(new_info)
        with open(self.dataset_path, 'w') as file:
            json.dump(self.dataset, file)

    def generate_report(self):
        # Placeholder for report generation logic
        return "Report generated based on the current dataset."