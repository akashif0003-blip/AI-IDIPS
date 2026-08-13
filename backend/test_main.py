import unittest

from main import chat, get_roadmap, STATES, SECTORS


class MainApiTests(unittest.TestCase):
    def test_roadmap_supports_full_state_and_sector_catalog(self):
        response = get_roadmap(state="Punjab", sector="Healthcare")
        self.assertIn("data", response)
        self.assertTrue(response["data"])
        self.assertEqual(response["data"][0]["state"], "Punjab")
        self.assertEqual(response["data"][0]["sector"], "Healthcare")

    def test_roadmap_handles_20_diverse_combinations(self):
        combinations = [
            ("Karnataka", "IT"), ("Kerala", "Tourism"), ("Punjab", "Agriculture"), ("Rajasthan", "Renewable Energy"),
            ("Tamil Nadu", "Manufacturing"), ("Odisha", "Mining"), ("Assam", "Tourism"), ("Gujarat", "Infrastructure"),
            ("Maharashtra", "Healthcare"), ("Telangana", "IT"), ("Uttar Pradesh", "Education"), ("West Bengal", "Textiles"),
            ("Haryana", "Transport"), ("Bihar", "Skill Development"), ("Goa", "Tourism"), ("Himachal Pradesh", "Water Resources"),
            ("Jharkhand", "Mining"), ("Madhya Pradesh", "Renewable Energy"), ("Chhattisgarh", "Manufacturing"), ("Andhra Pradesh", "Fisheries")
        ]
        for state, sector in combinations:
            response = get_roadmap(state=state, sector=sector)
            self.assertIn("data", response)
            self.assertEqual(response["data"][0]["state"], state)
            self.assertEqual(response["data"][0]["sector"], sector)
            self.assertIn("Year 1", response["data"][0]["short_term"])

    def test_chat_answers_with_state_specific_keywords(self):
        answer = chat(question="Compare Gujarat and Maharashtra for renewable energy")
        self.assertIn("Gujarat", answer["answer"])
        self.assertIn("Maharashtra", answer["answer"])
        self.assertIn("renewable", answer["answer"].lower())

    def test_chat_handles_20_questions(self):
        questions = [
            "Best investment in Karnataka",
            "Future of Gujarat",
            "Compare Tamil Nadu and Maharashtra",
            "How can Rajasthan improve?",
            "Healthcare in Kerala",
            "Tourism in Goa",
            "Agriculture in Punjab",
            "Manufacturing in Tamil Nadu",
            "Roadmap for Odisha",
            "Export growth in Gujarat",
            "Trade in Maharashtra",
            "Education in Uttar Pradesh",
            "Renewable energy in Rajasthan",
            "Employment in Bihar",
            "Water resources in Himachal Pradesh",
            "Mining in Jharkhand",
            "Fisheries in Andhra Pradesh",
            "Skill development in Haryana",
            "Infrastructure in Telangana",
            "Future of Assam"
        ]
        for question in questions:
            answer = chat(question=question)
            self.assertTrue(answer["answer"])
            self.assertNotEqual(answer["answer"], "AI-IDIPS can help with investment ideas, trade analysis, development simulation, roadmap planning, and policy strategy for Indian states.")

    def test_new_chat_questions_return_state_and_topic_specific_answers(self):
        questions = [
            ("How is investment in Tamil Nadu?", "Tamil Nadu", "Investment"),
            ("Future of Karnataka IT sector", "Karnataka", "IT"),
            ("Compare Kerala and Gujarat", "Category", "Winner"),
            ("Healthcare in Kerala", "Kerala", "Healthcare"),
            ("Agriculture in Punjab", "Punjab", "Agriculture"),
            ("Renewable Energy in Rajasthan", "Rajasthan", "Renewable Energy"),
            ("Trade of Maharashtra", "Maharashtra", "Trade"),
            ("GDP of Gujarat", "Gujarat", "GDP"),
            ("Employment in Bihar", "Bihar", "Employment"),
            ("Roadmap for Assam Tourism", "Assam", "Roadmap")
        ]
        for question, state_name, topic_name in questions:
            answer = chat(question=question)
            self.assertIn(state_name, answer["answer"])
            self.assertTrue(answer["answer"].strip())
            if topic_name in {"Investment", "IT", "Healthcare", "Agriculture", "Renewable Energy", "Trade", "GDP", "Employment", "Roadmap"}:
                self.assertTrue(any(term in answer["answer"] for term in [topic_name, topic_name.lower()]))

    def test_state_and_sector_catalogs_are_complete(self):
        self.assertGreaterEqual(len(STATES), 28)
        self.assertGreaterEqual(len(SECTORS), 14)


if __name__ == "__main__":
    unittest.main()
