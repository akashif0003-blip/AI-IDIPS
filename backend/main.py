from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from pathlib import Path
from typing import Optional

app = FastAPI(title="AI-IDIPS API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = Path(__file__).resolve().parent.parent / "database" / "ai_idips.db"

STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
    "Uttarakhand", "West Bengal"
]

SECTORS = [
    "Agriculture", "Renewable Energy", "Healthcare", "Education", "Tourism",
    "IT", "Manufacturing", "Infrastructure", "Mining", "Transport",
    "Water Resources", "Fisheries", "Textiles", "Skill Development"
]

STATE_DATA = {
    "Andhra Pradesh": {
        "strengths": "ports, pharma and agri-linked logistics",
        "priority_sectors": ["Ports", "Pharma", "Agriculture", "Renewable Energy"],
        "advantages": ["coastal access", "industrial corridors", "strong logistics potential"],
        "outlook": "High"
    },
    "Arunachal Pradesh": {
        "strengths": "hydropower, ecotourism and forestry",
        "priority_sectors": ["Hydropower", "Tourism", "Forestry", "Renewable Energy"],
        "advantages": ["clean energy potential", "ecological tourism", "emerging infrastructure"],
        "outlook": "Moderate"
    },
    "Assam": {
        "strengths": "tea, oil and tourism",
        "priority_sectors": ["Tea", "Oil", "Tourism", "Handloom"],
        "advantages": ["strong cultural identity", "regional connectivity", "natural resource base"],
        "outlook": "High"
    },
    "Bihar": {
        "strengths": "agriculture, food processing and education",
        "priority_sectors": ["Agriculture", "Food Processing", "Education", "Textiles"],
        "advantages": ["large workforce", "rural demand", "growing urban services"],
        "outlook": "High"
    },
    "Chhattisgarh": {
        "strengths": "mining, steel and energy",
        "priority_sectors": ["Mining", "Steel", "Energy", "Manufacturing"],
        "advantages": ["resource base", "industrial corridors", "cost-effective power"],
        "outlook": "High"
    },
    "Goa": {
        "strengths": "tourism, hospitality and marine services",
        "priority_sectors": ["Tourism", "Hospitality", "Ports", "Healthcare"],
        "advantages": ["high visitor demand", "coastal economy", "service-led growth"],
        "outlook": "High"
    },
    "Gujarat": {
        "strengths": "manufacturing, ports and solar energy",
        "priority_sectors": ["Manufacturing", "Ports", "Renewable Energy", "Petrochemicals"],
        "advantages": ["excellent logistics", "industrial clusters", "strong export network"],
        "outlook": "Very High"
    },
    "Haryana": {
        "strengths": "automobile, food processing and logistics",
        "priority_sectors": ["Automobile", "Food Processing", "Logistics", "IT"],
        "advantages": ["urban-industrial base", "high connectivity", "strong supply chains"],
        "outlook": "High"
    },
    "Himachal Pradesh": {
        "strengths": "tourism, hydropower and healthcare",
        "priority_sectors": ["Tourism", "Hydropower", "Healthcare", "Education"],
        "advantages": ["mountain economy", "clean energy", "high-quality services"],
        "outlook": "Moderate"
    },
    "Jharkhand": {
        "strengths": "mining, steel and industrial corridors",
        "priority_sectors": ["Mining", "Steel", "Manufacturing", "Energy"],
        "advantages": ["resource depth", "industrial potential", "policy support"],
        "outlook": "High"
    },
    "Karnataka": {
        "strengths": "IT, AI and startup-led innovation",
        "priority_sectors": ["IT", "AI", "Semiconductors", "Biotechnology", "Startups"],
        "advantages": ["research ecosystem", "venture capital", "high digital adoption"],
        "outlook": "Very High"
    },
    "Kerala": {
        "strengths": "tourism, healthcare and fisheries",
        "priority_sectors": ["Tourism", "Healthcare", "Fisheries", "Education"],
        "advantages": ["human development", "service quality", "coastal economy"],
        "outlook": "High"
    },
    "Madhya Pradesh": {
        "strengths": "agriculture, mining and renewable energy",
        "priority_sectors": ["Agriculture", "Mining", "Renewable Energy", "Manufacturing"],
        "advantages": ["large land base", "industrial readiness", "energy potential"],
        "outlook": "High"
    },
    "Maharashtra": {
        "strengths": "finance, IT and manufacturing",
        "priority_sectors": ["Finance", "IT", "Manufacturing", "Logistics"],
        "advantages": ["strong capital markets", "large consumer base", "advanced infrastructure"],
        "outlook": "Very High"
    },
    "Manipur": {
        "strengths": "handloom, horticulture and ecotourism",
        "priority_sectors": ["Handloom", "Tourism", "Agriculture", "Hydropower"],
        "advantages": ["cultural exports", "natural beauty", "emerging energy capacity"],
        "outlook": "Moderate"
    },
    "Meghalaya": {
        "strengths": "tourism, hydropower and agriculture",
        "priority_sectors": ["Tourism", "Hydropower", "Agriculture", "Mining"],
        "advantages": ["natural resources", "eco-tourism", "rural productivity"],
        "outlook": "Moderate"
    },
    "Mizoram": {
        "strengths": "handloom, tourism and renewable energy",
        "priority_sectors": ["Handloom", "Tourism", "Renewable Energy", "Agriculture"],
        "advantages": ["cultural products", "clean energy potential", "niche tourism"],
        "outlook": "Moderate"
    },
    "Nagaland": {
        "strengths": "agriculture, handloom and tourism",
        "priority_sectors": ["Agriculture", "Handloom", "Tourism", "Hydropower"],
        "advantages": ["heritage economy", "local enterprise", "regional growth"],
        "outlook": "Moderate"
    },
    "Odisha": {
        "strengths": "steel, mining and ports",
        "priority_sectors": ["Steel", "Mining", "Ports", "Energy"],
        "advantages": ["resource-heavy industry", "coastal gateways", "industrial readiness"],
        "outlook": "High"
    },
    "Punjab": {
        "strengths": "agriculture, food processing and textiles",
        "priority_sectors": ["Agriculture", "Food Processing", "Textiles", "Dairy"],
        "advantages": ["strong farm base", "processing potential", "export competitiveness"],
        "outlook": "High"
    },
    "Rajasthan": {
        "strengths": "solar energy, mining and tourism",
        "priority_sectors": ["Renewable Energy", "Mining", "Tourism", "Infrastructure"],
        "advantages": ["vast land area", "sunlight abundance", "heritage tourism"],
        "outlook": "Very High"
    },
    "Sikkim": {
        "strengths": "tourism, hydropower and organic farming",
        "priority_sectors": ["Tourism", "Hydropower", "Agriculture", "Renewable Energy"],
        "advantages": ["eco-tourism", "clean energy", "sustainability leadership"],
        "outlook": "High"
    },
    "Tamil Nadu": {
        "strengths": "automobile, electronics and ports",
        "priority_sectors": ["Automobile Manufacturing", "Electronics", "IT", "Ports", "Renewable Energy"],
        "advantages": ["excellent coastal logistics", "skilled workforce", "high export potential"],
        "outlook": "Very High"
    },
    "Telangana": {
        "strengths": "IT, biotechnology and startups",
        "priority_sectors": ["IT", "Biotechnology", "Healthcare", "Startups"],
        "advantages": ["research-driven growth", "digital infrastructure", "new economy jobs"],
        "outlook": "Very High"
    },
    "Tripura": {
        "strengths": "handloom, tourism and agriculture",
        "priority_sectors": ["Handloom", "Tourism", "Agriculture", "Renewable Energy"],
        "advantages": ["cultural industries", "small-scale entrepreneurship", "regional trade"],
        "outlook": "Moderate"
    },
    "Uttar Pradesh": {
        "strengths": "agriculture, manufacturing and logistics",
        "priority_sectors": ["Agriculture", "Manufacturing", "Logistics", "Infrastructure"],
        "advantages": ["large market", "industrial corridors", "demographic strength"],
        "outlook": "High"
    },
    "Uttarakhand": {
        "strengths": "tourism, hydropower and education",
        "priority_sectors": ["Tourism", "Hydropower", "Education", "Healthcare"],
        "advantages": ["wellness economy", "natural assets", "quality institutions"],
        "outlook": "High"
    },
    "West Bengal": {
        "strengths": "manufacturing, ports and textiles",
        "priority_sectors": ["Manufacturing", "Ports", "Textiles", "IT"],
        "advantages": ["trade gateways", "industrial heritage", "large talent pool"],
        "outlook": "High"
    }
}

STATE_LOOKUP = {state.lower().replace(" ", " "): state for state in STATE_DATA}

TOPIC_DATA = {
    "investment": {
        "label": "Investment",
        "focus": "investment opportunities",
        "next_steps": "prioritize high-growth sectors and capital allocation"
    },
    "trade": {
        "label": "Trade",
        "focus": "trade and export competitiveness",
        "next_steps": "expand export logistics and market access"
    },
    "development": {
        "label": "Development",
        "focus": "balanced development",
        "next_steps": "align infrastructure, policy and public services"
    },
    "gdp": {
        "label": "GDP",
        "focus": "economic output",
        "next_steps": "improve productivity and industrial depth"
    },
    "employment": {
        "label": "Employment",
        "focus": "job creation",
        "next_steps": "expand skilling and industry-linked jobs"
    },
    "tourism": {
        "label": "Tourism",
        "focus": "tourism and hospitality",
        "next_steps": "expand destination planning and visitor services"
    },
    "renewable": {
        "label": "Renewable Energy",
        "focus": "renewable energy deployment",
        "next_steps": "scale solar, wind and storage systems"
    },
    "it": {
        "label": "IT",
        "focus": "technology and digital services",
        "next_steps": "strengthen digital infrastructure and talent"
    },
    "manufacturing": {
        "label": "Manufacturing",
        "focus": "manufacturing competitiveness",
        "next_steps": "upgrade clusters, automation and supplier networks"
    },
    "healthcare": {
        "label": "Healthcare",
        "focus": "healthcare delivery",
        "next_steps": "build hospitals, diagnostics and digital health"
    },
    "education": {
        "label": "Education",
        "focus": "education and skills",
        "next_steps": "expand training, campuses and applied learning"
    },
    "agriculture": {
        "label": "Agriculture",
        "focus": "agriculture and food systems",
        "next_steps": "improve irrigation, cold chains and processing"
    },
    "transport": {
        "label": "Transport",
        "focus": "mobility and connectivity",
        "next_steps": "improve roads, rail and multimodal logistics"
    },
    "economy": {
        "label": "Economy",
        "focus": "economic resilience",
        "next_steps": "support enterprise, exports and capital flows"
    },
    "future": {
        "label": "Future Growth",
        "focus": "future growth",
        "next_steps": "prepare sectors for the next five years"
    },
    "roadmap": {
        "label": "Roadmap",
        "focus": "development roadmap",
        "next_steps": "sequence short-term, medium-term and long-term action"
    },
    "exports": {
        "label": "Exports",
        "focus": "exports and trade",
        "next_steps": "expand competitiveness and market reach"
    },
    "imports": {
        "label": "Imports",
        "focus": "import substitution and supply chains",
        "next_steps": "build local manufacturing and sourcing"
    },
    "startup": {
        "label": "Startups",
        "focus": "startup ecosystems",
        "next_steps": "scale incubation, venture support and talent"
    },
    "ai": {
        "label": "AI",
        "focus": "artificial intelligence adoption",
        "next_steps": "invest in research, talent and deployment"
    },
    "technology": {
        "label": "Technology",
        "focus": "technology-led growth",
        "next_steps": "expand digital infrastructure and innovation"
    },
    "policy": {
        "label": "Policy",
        "focus": "policy support",
        "next_steps": "strengthen governance and incentives"
    },
    "industry": {
        "label": "Industry",
        "focus": "industry-led growth",
        "next_steps": "develop clusters and supply chains"
    },
    "water": {
        "label": "Water",
        "focus": "water and irrigation",
        "next_steps": "improve storage, reuse and conservation"
    },
    "power": {
        "label": "Power",
        "focus": "power and energy",
        "next_steps": "expand generation, transmission and efficiency"
    }
}

TOPIC_ALIASES = {
    "investment": ["investment", "invest", "investing", "capital", "funding"],
    "trade": ["trade", "trading", "commerce", "export", "exports", "import", "imports"],
    "development": ["development", "develop", "developing", "growth", "expansion"],
    "gdp": ["gdp", "economy", "economic"],
    "employment": ["employment", "jobs", "job", "workforce", "livelihood"],
    "tourism": ["tourism", "tourist", "hotel", "travel", "holiday", "heritage"],
    "renewable": ["renewable", "renewable energy", "solar", "wind", "hydrogen", "green energy", "power"],
    "it": ["it", "information technology", "software", "tech", "digital"],
    "manufacturing": ["manufacturing", "industry", "industrial", "factory", "production"],
    "healthcare": ["healthcare", "health", "hospital", "medical", "clinic", "pharma"],
    "education": ["education", "school", "college", "skill", "skills", "training"],
    "agriculture": ["agriculture", "agri", "farm", "farming", "crop", "food processing"],
    "transport": ["transport", "transportation", "railway", "rail", "metro", "airport", "road", "logistics", "port"],
    "future": ["future", "forecast", "next five years"],
    "roadmap": ["roadmap", "plan", "planning"],
    "startup": ["startup", "startups", "entrepreneurship"],
    "ai": ["ai", "artificial intelligence", "machine learning"],
    "technology": ["technology", "innovation", "research"],
    "policy": ["policy", "policies", "governance"],
    "industry": ["industry", "industrial"],
    "water": ["water", "irrigation", "river", "reservoir"],
    "power": ["power", "electricity", "energy"]
}


def normalize_text(text: str) -> str:
    return " ".join(text.lower().replace("-", " ").replace(",", " ").split())


def detect_states(question: str):
    normalized = normalize_text(question)
    found = []
    for state_name in STATE_DATA:
        if normalize_text(state_name) in normalized:
            found.append(state_name)
    return found


def detect_topics(question: str):
    normalized = normalize_text(question)
    found = []
    for topic_key, aliases in TOPIC_ALIASES.items():
        if any(alias in normalized for alias in aliases):
            found.append(topic_key)
    return list(dict.fromkeys(found))


def build_state_topic_answer(state_name: str, topics, question: str):
    state_profile = STATE_DATA[state_name]
    parts = [f"{state_name} has strong potential for {', '.join(TOPIC_DATA[topic]['label'].lower() for topic in topics)} because of {state_profile['strengths']}."]
    for topic in topics:
        topic_profile = TOPIC_DATA[topic]
        sector_matches = [sector for sector in state_profile['priority_sectors'] if any(keyword in sector.lower() for keyword in [topic_profile['label'].lower(), topic.lower()])]
        if not sector_matches:
            sector_matches = state_profile['priority_sectors'][:3]
        parts.append(f"Top {topic_profile['label']} areas: {', '.join(sector_matches[:4])}.")
        parts.append(f"Advantages: {', '.join(state_profile['advantages'][:3])}.")
        parts.append(f"{topic_profile['label']} outlook: {state_profile['outlook']} with {topic_profile['next_steps']}.")
    return " ".join(parts)


def build_state_only_answer(state_name: str):
    state_profile = STATE_DATA[state_name]
    return f"{state_name} stands out for {state_profile['strengths']}. Its main strengths are {', '.join(state_profile['priority_sectors'][:4])}, with advantages in {', '.join(state_profile['advantages'])}."


def build_topic_only_answer(topics):
    if not topics:
        return "The AI-IDIPS engine can provide investment, trade, infrastructure and development guidance for Indian states."
    topic_profiles = [TOPIC_DATA[topic]['label'] for topic in topics]
    return f"The analysis focuses on {', '.join(topic_profiles)} with sector-specific guidance for growth, policy support and execution planning."


def build_comparison_answer(first_state: str, second_state: str, topics):
    first_profile = STATE_DATA[first_state]
    second_profile = STATE_DATA[second_state]
    topic_text = ", ".join(TOPIC_DATA[topic]['label'] for topic in topics) if topics else "growth"
    return (
        f"Category | {first_state} | {second_state} | Winner\n"
        f"GDP | {first_profile['outlook']} | {second_profile['outlook']} | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}\n"
        f"Major Industries | {', '.join(first_profile['priority_sectors'][:3])} | {', '.join(second_profile['priority_sectors'][:3])} | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}\n"
        f"Employment | Skilled workforce | Skilled workforce | Balanced\n"
        f"Infrastructure | {first_profile['advantages'][0]} | {second_profile['advantages'][0]} | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}\n"
        f"Technology | {first_profile['strengths']} | {second_profile['strengths']} | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}\n"
        f"Exports | High export potential | High export potential | Balanced\n"
        f"Investment | {topic_text} | {topic_text} | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}\n"
        f"Future Growth | Strong | Strong | {first_state if first_profile['outlook'] >= second_profile['outlook'] else second_state}"
    )


class SimulatorRequest(BaseModel):
    state: str
    sector: str
    investment: int
    years: int


class ChatRequest(BaseModel):
    question: str


class SimulatorResponse(BaseModel):
    state: str
    sector: str
    investment: int
    years: int
    predicted_gdp_growth: float
    employment_generated: int
    economic_impact: float
    development_index: int
    sustainability_score: int
    summary: str


SECTOR_FOCUS = {
    "Agriculture": {
        "year1": "Modern irrigation and soil-health upgrades",
        "year2": "Cold-chain and storage expansion",
        "year3": "Food processing and agri-logistics clusters",
        "year4": "Export-ready value chains",
        "year5": "Farmer income growth and resilient crop ecosystems"
    },
    "Renewable Energy": {
        "year1": "Pilot solar and wind deployment",
        "year2": "Grid integration and storage adoption",
        "year3": "Green manufacturing and local supplier ecosystems",
        "year4": "Utility-scale clean energy corridors",
        "year5": "Low-carbon industrial growth"
    },
    "Healthcare": {
        "year1": "Primary-care and diagnostics expansion",
        "year2": "Digital health and telemedicine rollout",
        "year3": "Hospital network strengthening",
        "year4": "Medical manufacturing and skilling hubs",
        "year5": "Universal access and preventive care"
    },
    "Education": {
        "year1": "Skill and digital learning outreach",
        "year2": "Campus modernization and teacher training",
        "year3": "Research partnerships and labs",
        "year4": "Applied learning ecosystems",
        "year5": "Knowledge-led workforce transformation"
    },
    "Tourism": {
        "year1": "Eco-tourism and destination planning",
        "year2": "Infrastructure improvement and visitor services",
        "year3": "Hotel investment and local entrepreneurship",
        "year4": "International marketing and heritage promotion",
        "year5": "Employment generation and regional prosperity"
    },
    "IT": {
        "year1": "Digital infrastructure and connectivity",
        "year2": "Startup incubation and policy support",
        "year3": "AI research centres and talent pipelines",
        "year4": "Global investment and enterprise expansion",
        "year5": "International export growth and software ecosystem depth"
    },
    "Manufacturing": {
        "year1": "Factory setup and cluster planning",
        "year2": "Supplier development and workforce skilling",
        "year3": "Automation and quality systems",
        "year4": "Export-focused industrial corridors",
        "year5": "Industrial competitiveness and jobs"
    },
    "Infrastructure": {
        "year1": "Core project prioritization",
        "year2": "Connectivity and utility upgrades",
        "year3": "Public-private delivery models",
        "year4": "Regional mobility and logistics corridors",
        "year5": "Long-term urban and industrial resilience"
    },
    "Mining": {
        "year1": "Resource mapping and safety protocols",
        "year2": "Processing and beneficiation scaling",
        "year3": "Local value addition and environmental compliance",
        "year4": "Export-ready mineral logistics",
        "year5": "Sustainable mining and community benefits"
    },
    "Transport": {
        "year1": "Mobility gap analysis and priority corridors",
        "year2": "Road and rail modernization",
        "year3": "Multimodal freight and warehousing",
        "year4": "Passenger and cargo efficiency upgrades",
        "year5": "Integrated logistics competitiveness"
    },
    "Water Resources": {
        "year1": "Water audits and source mapping",
        "year2": "Irrigation and recharge projects",
        "year3": "Treatment and reuse systems",
        "year4": "River and watershed management",
        "year5": "Climate-resilient water security"
    },
    "Fisheries": {
        "year1": "Harbour and cold-chain upgrades",
        "year2": "Aquaculture and marine processing support",
        "year3": "Cooperative expansion and traceability",
        "year4": "Export market access",
        "year5": "Blue-economy growth and livelihoods"
    },
    "Textiles": {
        "year1": "Design, weaving, and raw-material modernization",
        "year2": "Cluster-based production support",
        "year3": "Branding and quality certification",
        "year4": "Export and retail market expansion",
        "year5": "Competitive textile value chains"
    },
    "Skill Development": {
        "year1": "Training need assessment",
        "year2": "Industry-linked certification programs",
        "year3": "Employer partnerships and placement cells",
        "year4": "Micro-enterprise and entrepreneurship support",
        "year5": "Future-ready workforce mobility"
    }
}

KEYWORD_ALIASES = {
    "investment": "investment",
    "invest": "investment",
    "investing": "investment",
    "capital": "investment",
    "funding": "investment",
    "money": "investment",
    "trade": "trade",
    "trading": "trade",
    "commerce": "trade",
    "export": "export",
    "exports": "export",
    "exporting": "export",
    "import": "import",
    "imports": "import",
    "gdp": "gdp",
    "economy": "economy",
    "economic": "economy",
    "growth": "growth",
    "future": "future",
    "forecast": "future",
    "development": "development",
    "develop": "development",
    "policy": "policy",
    "policies": "policy",
    "budget": "budget",
    "finance": "finance",
    "banking": "finance",
    "education": "education",
    "school": "education",
    "college": "education",
    "skill": "skill",
    "skills": "skill",
    "training": "skill",
    "health": "health",
    "healthcare": "health",
    "hospital": "health",
    "medical": "health",
    "clinic": "health",
    "pharma": "health",
    "road": "infrastructure",
    "railway": "infrastructure",
    "rail": "infrastructure",
    "metro": "infrastructure",
    "airport": "infrastructure",
    "port": "infrastructure",
    "ports": "infrastructure",
    "infrastructure": "infrastructure",
    "renewable": "renewable",
    "solar": "renewable",
    "wind": "renewable",
    "hydrogen": "renewable",
    "green": "renewable",
    "energy": "renewable",
    "ai": "technology",
    "artificial intelligence": "technology",
    "machine learning": "technology",
    "deep learning": "technology",
    "it": "technology",
    "technology": "technology",
    "startup": "technology",
    "startups": "technology",
    "industry": "industry",
    "industries": "industry",
    "manufacturing": "industry",
    "factory": "industry",
    "tourism": "tourism",
    "hotel": "tourism",
    "travel": "tourism",
    "employment": "employment",
    "jobs": "employment",
    "workforce": "employment",
    "agriculture": "agriculture",
    "crop": "agriculture",
    "farm": "agriculture",
    "farming": "agriculture",
    "water": "water",
    "irrigation": "water",
    "river": "water",
    "electricity": "renewable",
    "smart city": "infrastructure",
    "logistics": "infrastructure",
    "mining": "industry",
    "steel": "industry",
    "textiles": "industry",
    "fisheries": "agriculture",
    "fish": "agriculture",
    "aquaculture": "agriculture",
    "state comparison": "comparison",
    "compare": "comparison",
    "comparison": "comparison",
    "versus": "comparison",
    "vs": "comparison",
    "msme": "industry",
    "industrial corridor": "infrastructure",
    "corridor": "infrastructure",
    "supply chain": "infrastructure",
    "digital": "technology",
    "startup ecosystem": "technology",
    "urban": "infrastructure",
    "rural": "development",
    "district": "development",
    "village": "development",
    "tourist": "tourism",
    "heritage": "tourism",
    "innovation": "technology",
    "research": "technology",
    "enterprise": "industry",
    "manufacture": "industry",
    "mobility": "infrastructure",
    "transport": "infrastructure",
    "logistics": "infrastructure",
    "warehouse": "infrastructure",
    "sustainability": "development",
    "climate": "development",
    "resilience": "development",
    "employment generation": "employment",
    "jobs": "employment",
    "work": "employment",
    "income": "growth",
    "poverty": "development"
}


class SimulatorRequest(BaseModel):
    state: str
    sector: str
    investment: int
    years: int


class ChatRequest(BaseModel):
    question: str


class SimulatorResponse(BaseModel):
    state: str
    sector: str
    investment: int
    years: int
    predicted_gdp_growth: float
    employment_generated: int
    economic_impact: float
    development_index: int
    sustainability_score: int
    summary: str


class SimulatorRequest(BaseModel):
    state: str
    sector: str
    investment: int
    years: int


class ChatRequest(BaseModel):
    question: str


class SimulatorResponse(BaseModel):
    state: str
    sector: str
    investment: int
    years: int
    predicted_gdp_growth: float
    employment_generated: int
    economic_impact: float
    development_index: int
    sustainability_score: int
    summary: str


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def _build_roadmap_entry(state: str | None = None, sector: str | None = None):
    state_name = state or "India"
    sector_name = sector or "development"
    if state_name in STATE_DATA:
        state_profile = STATE_DATA[state_name]
        strength_one, strength_two, strength_three, *_ = state_profile["priority_sectors"]
        strength_phrase = f"{strength_one.lower()}, {strength_two.lower()} and {strength_three.lower()}"
    else:
        strength_phrase = "infrastructure, skills and connectivity"
    focus = SECTOR_FOCUS.get(sector_name, {
        "year1": f"Launch pilot programs for {sector_name.lower()}",
        "year2": f"Build ecosystem support for {sector_name.lower()}",
        "year3": f"Expand scaling and partnerships for {sector_name.lower()}",
        "year4": f"Create export-ready market access for {sector_name.lower()}",
        "year5": f"Secure long-term resilience for {sector_name.lower()}"
    })
    return {
        "state": state_name,
        "sector": sector_name,
        "short_term": f"Year 1: {focus['year1']} in {state_name} by leveraging {strength_phrase}.",
        "medium_term": f"Years 2-3: {focus['year2']} with local clusters, workforce training, and policy support in {state_name}.",
        "long_term": f"Years 4-5: {focus['year3']} and {focus['year4']} anchored by regional strengths and {focus['year5'].lower()} across {state_name}.",
    }


def init_db():
    conn.execute("""
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")
    conn = get_connection()
    conn.execute("DROP TABLE IF EXISTS investments")
    conn.execute("DROP TABLE IF EXISTS trade")
    conn.execute("DROP TABLE IF EXISTS roadmap")
    conn.execute("""
    CREATE TABLE investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        opportunity TEXT NOT NULL,
        score INTEGER NOT NULL,
        description TEXT NOT NULL
    )
    """)
    conn.execute("""
    CREATE TABLE trade (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        import_value INTEGER NOT NULL,
        export_value INTEGER NOT NULL,
        growth_rate REAL NOT NULL,
        risk_level TEXT NOT NULL,
        investment_score INTEGER NOT NULL
    )
    """)
    conn.execute("""
    CREATE TABLE roadmap (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        short_term TEXT NOT NULL,
        medium_term TEXT NOT NULL,
        long_term TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()

    seed_data()


def seed_data():
    conn = get_connection()
    conn.execute("DELETE FROM investments")
    conn.execute("DELETE FROM trade")
    conn.execute("DELETE FROM roadmap")

    investment_rows = []
    for state in STATES:
        for sector in SECTORS:
            score = 70 + (hash(state) % 20) + (hash(sector) % 10)
            score = min(99, score)
            opportunity = f"{sector} cluster in {state}"
            description = f"Strong demand for {sector.lower()} development and public-private partnerships in {state}."
            investment_rows.append((state, sector, opportunity, score, description))
    conn.executemany(
        "INSERT INTO investments (state, sector, opportunity, score, description) VALUES (?, ?, ?, ?, ?)",
        investment_rows
    )

    trade_rows = []
    for state in STATES:
        for sector in SECTORS:
            import_value = 80 + (hash(state) % 40) + (hash(sector) % 25)
            export_value = 90 + (hash(state) % 35) + (hash(sector) % 20)
            growth_rate = round(4.5 + ((hash(state) % 7) * 0.3) + ((hash(sector) % 5) * 0.2), 1)
            risk_level = "Low" if growth_rate > 6 else "Medium" if growth_rate > 5 else "High"
            investment_score = min(99, 60 + (import_value // 4) + (export_value // 5))
            trade_rows.append((state, sector, import_value, export_value, growth_rate, risk_level, investment_score))
    conn.executemany(
        "INSERT INTO trade (state, sector, import_value, export_value, growth_rate, risk_level, investment_score) VALUES (?, ?, ?, ?, ?, ?, ?)",
        trade_rows
    )

    roadmap_rows = []
    for state in STATES:
        for sector in SECTORS:
            entry = _build_roadmap_entry(state, sector)
            roadmap_rows.append((
                state,
                sector,
                entry["short_term"],
                entry["medium_term"],
                entry["long_term"]
            ))
    conn.executemany(
        "INSERT INTO roadmap (state, sector, short_term, medium_term, long_term) VALUES (?, ?, ?, ?, ?)",
        roadmap_rows
    )

    conn.commit()
    conn.close()


init_db()


@app.get("/")
def home():
    return {"message": "AI-IDIPS API is running"}


@app.get("/investment")
def get_investment(state: str | None = None, sector: str | None = None):
    conn = get_connection()
    if state and sector:
        rows = conn.execute("SELECT * FROM investments WHERE state=? AND sector=?", (state, sector)).fetchall()
    elif state:
        rows = conn.execute("SELECT * FROM investments WHERE state=?", (state,)).fetchall()
    elif sector:
        rows = conn.execute("SELECT * FROM investments WHERE sector=?", (sector,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM investments").fetchall()
    conn.close()
    return {"data": [dict(row) for row in rows]}

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str = ""
    message: str


@app.post("/contact")
def submit_contact(contact: ContactMessage):
    conn = get_connection()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.execute("DROP TABLE IF EXISTS investments")
    conn.execute("DROP TABLE IF EXISTS trade")
    conn.execute("DROP TABLE IF EXISTS roadmap")

    conn.execute("""
    CREATE TABLE investments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        opportunity TEXT NOT NULL,
        score INTEGER NOT NULL,
        description TEXT NOT NULL
    )
    """)

    conn.execute("""
    CREATE TABLE trade (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        import_value INTEGER NOT NULL,
        export_value INTEGER NOT NULL,
        growth_rate REAL NOT NULL,
        risk_level TEXT NOT NULL,
        investment_score INTEGER NOT NULL
    )
    """)

    conn.execute("""
    CREATE TABLE roadmap (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        state TEXT NOT NULL,
        sector TEXT NOT NULL,
        short_term TEXT NOT NULL,
        medium_term TEXT NOT NULL,
        long_term TEXT NOT NULL
    """)

    conn.commit()
    conn.close()

    

    return {
        "success": True,
        "message": "Contact message saved successfully."
    }
@app.get("/trade")
def get_trade(state: str | None = None, sector: str | None = None):
    conn = get_connection()
    if state and sector:
        row = conn.execute("SELECT * FROM trade WHERE state=? AND sector=?", (state, sector)).fetchone()
        conn.close()
        return {"data": [dict(row)] if row else []}

    if state:
        rows = conn.execute("SELECT * FROM trade WHERE state=?", (state,)).fetchall()
        conn.close()
        return {"data": [dict(row) for row in rows]}

    if sector:
        rows = conn.execute("SELECT * FROM trade WHERE sector=?", (sector,)).fetchall()
        conn.close()
        return {"data": [dict(row) for row in rows]}

    rows = conn.execute("SELECT * FROM trade").fetchall()
    conn.close()

    summary = []
    for state in STATES:
        matching_rows = [row for row in rows if row["state"] == state]
        if not matching_rows:
            continue
        import_value = round(sum(row["import_value"] for row in matching_rows) / len(matching_rows), 1)
        export_value = round(sum(row["export_value"] for row in matching_rows) / len(matching_rows), 1)
        growth_rate = round(sum(row["growth_rate"] for row in matching_rows) / len(matching_rows), 1)
        investment_score = round(sum(row["investment_score"] for row in matching_rows) / len(matching_rows), 1)
        risk_level = "Low" if growth_rate > 6 else "Medium" if growth_rate > 5 else "High"
        summary.append({
            "state": state,
            "sector": matching_rows[0]["sector"],
            "import_value": int(import_value),
            "export_value": int(export_value),
            "growth_rate": growth_rate,
            "risk_level": risk_level,
            "investment_score": int(investment_score)
        })

    return {"data": summary}


@app.post("/simulate", response_model=SimulatorResponse)
def simulate(payload: SimulatorRequest):
    base_growth = 3.2 + (payload.investment / 10000000) * 1.8 + (payload.years * 0.4)
    growth = round(min(14.5, base_growth), 1)
    employment = min(950000, 120000 + (payload.investment // 250000) + (payload.years * 18000))
    impact = round(payload.investment * 0.0018 * payload.years, 1)
    development_index = min(100, 45 + (payload.years * 4) + (payload.investment // 3000000))
    sustainability_score = min(100, 55 + (payload.years * 3) + (payload.investment // 4000000))

    return {
        "state": payload.state,
        "sector": payload.sector,
        "investment": payload.investment,
        "years": payload.years,
        "predicted_gdp_growth": growth,
        "employment_generated": employment,
        "economic_impact": impact,
        "development_index": development_index,
        "sustainability_score": sustainability_score,
        "summary": f"{payload.state} is projected to gain strong momentum in {payload.sector} over {payload.years} years with a balanced growth outlook."
    }


@app.get("/roadmap")
def get_roadmap(state: str | None = None, sector: str | None = None):
    conn = get_connection()
    if state and sector:
        rows = conn.execute("SELECT * FROM roadmap WHERE state=? AND sector=?", (state, sector)).fetchall()
    elif state:
        rows = conn.execute("SELECT * FROM roadmap WHERE state=?", (state,)).fetchall()
    else:
        rows = conn.execute("SELECT * FROM roadmap").fetchall()
    conn.close()
    if not rows:
        return {"data": [_build_roadmap_entry(state, sector)]}
    return {"data": [dict(row) for row in rows]}


@app.post("/chat")
def chat(payload: Optional[ChatRequest] = None, question: Optional[str] = None):
    if payload is not None:
        text = payload.question
    else:
        text = question or ""
    question_text = text
    states = detect_states(question_text)
    topics = detect_topics(question_text)

    if "compare" in normalize_text(question_text) or "versus" in normalize_text(question_text) or "vs" in normalize_text(question_text):
        if len(states) >= 2:
            return {"answer": build_comparison_answer(states[0], states[1], topics)}

    if states and topics:
        return {"answer": build_state_topic_answer(states[0], topics, question_text)}

    if states:
        return {"answer": build_state_only_answer(states[0])}

    if topics:
        return {"answer": build_topic_only_answer(topics)}

    return {"answer": "AI-IDIPS can help with investment ideas, trade analysis, development simulation, roadmap planning, and policy strategy for Indian states."}
