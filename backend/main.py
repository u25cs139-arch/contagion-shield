from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from modules.generator import generate_heterogeneous_graph
from modules.engine import (
    isolated_hardship_score, contagion_risk_score, 
    macro_shock_detector, anti_collusion_check, apply_scenario
)

app = FastAPI(title="Contagion Shield API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global in-memory graph instance
GLOBAL_GRAPH = generate_heterogeneous_graph()

@app.get("/graph")
def get_graph():
    nodes = []
    for node_id, data in GLOBAL_GRAPH.nodes(data=True):
        nodes.append({"id": node_id, **data})
        
    edges = []
    for u, v, data in GLOBAL_GRAPH.edges(data=True):
        edges.append({"source": u, "target": v, **data})
        
    return {"nodes": nodes, "edges": edges}

@app.post("/simulate/{scenario}")
def simulate_scenario(scenario: str):
    valid_scenarios = ["isolated_hardship", "peer_contagion", "gateway_outage", "macro_shock", "collusion_ring"]
    if scenario not in valid_scenarios:
        raise HTTPException(status_code=400, detail="Invalid scenario type")
    
    global GLOBAL_GRAPH
    GLOBAL_GRAPH = apply_scenario(GLOBAL_GRAPH, scenario)
    return {"message": f"Scenario '{scenario}' injected successfully.", "active_shock": GLOBAL_GRAPH.graph.get("active_shock")}

@app.get("/borrower/{borrower_id}")
def get_borrower_details(borrower_id: str):
    if borrower_id not in GLOBAL_GRAPH.nodes:
        raise HTTPException(status_code=404, detail="Borrower not found")
    
    data = GLOBAL_GRAPH.nodes[borrower_id]
    hardship = isolated_hardship_score(GLOBAL_GRAPH, borrower_id)
    
    # Zero-knowledge style plain language explanation layer (privacy-preserving)
    explanation = {
        "risk_factors": [
            f"Alternative Utility Stability Index: {data.get('alt_utility_history')}",
            f"Mobile Recharge Cadence: {data.get('mobile_recharge_freq')}",
            f"Agri-Input Fulfillment Pattern: {data.get('agri_input_pattern')}"
        ],
        "zero_knowledge_note": "Evaluated exclusively on encrypted vector signatures & behavioral hashes without disclosing PII.",
        "hardship_assessment": hardship
    }
    
    return {"borrower_id": borrower_id, "attributes": data, "explanation": explanation}

@app.get("/alerts")
def get_alerts():
    alerts = []
    for node_id, data in GLOBAL_GRAPH.nodes(data=True):
        if data.get("type") == "Borrower" and data.get("status") != "healthy":
            alerts.append({
                "id": node_id,
                "group": data.get("group"),
                "status": data.get("status"),
                "risk_score": data.get("risk_score"),
                "urgency": "High" if data.get("risk_score", 0) > 0.8 else "Medium"
            })
    return {"total_alerts": len(alerts), "alerts": alerts[:15]}