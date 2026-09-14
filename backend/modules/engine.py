import networkx as nx

def isolated_hardship_score(G, borrower_id):
    data = G.nodes[borrower_id]
    utility_drop = data["alt_utility_history"] < 0.5
    erratic_recharge = data["mobile_recharge_freq"] == "Erratic"
    score = 0.8 if (utility_drop or erratic_recharge) else 0.2
    return {
        "borrower_id": borrower_id,
        "isolated_hardship_score": score,
        "recommendation": "Grant micro-liquidity / 30-day tenure extension without group penalty" if score > 0.5 else "Standard monitoring"
    }

def contagion_risk_score(G, group_id):
    members = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower" and d.get("group") == group_id]
    if not members:
        return {"group_id": group_id, "contagion_score": 0.0, "circuit_breaker": False}
    
    avg_risk = sum(G.nodes[m]["risk_score"] for m in members) / len(members)
    contagion_multiplier = 1.0
    for m in members:
        neighbors = G.neighbors(m)
        for n in neighbors:
            if n in G.nodes and G.nodes[n].get("type") == "Borrower" and G.nodes[n].get("risk_score", 0) > 0.7:
                contagion_multiplier += 0.15
                
    final_score = min(1.0, avg_risk * contagion_multiplier)
    circuit_breaker = final_score > 0.65
    
    return {
        "group_id": group_id,
        "contagion_score": round(final_score, 2),
        "circuit_breaker_triggered": circuit_breaker
    }

def macro_shock_detector(G, region_name):
    region_borrowers = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower" and d.get("region") == region_name]
    if not region_borrowers:
        return {"region": region_name, "macro_shock_detected": False}
    
    affected_count = sum(1 for b in region_borrowers if G.nodes[b].get("hardship_flag"))
    shock_ratio = affected_count / max(1, len(region_borrowers))
    
    is_macro = shock_ratio > 0.4 or "loan-waiver rumor" in str(G.graph.get("active_shock", ""))
    return {
        "region": region_name,
        "macro_shock_detected": is_macro,
        "affected_ratio": round(shock_ratio, 2),
        "action": "Isolate macro-shock from individual credit scoring matrices" if is_macro else "Normal operations"
    }

def anti_collusion_check(G):
    flagged_groups = []
    for node, data in G.nodes(data=True):
        if data.get("type") == "Group":
            members = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower" and d.get("group") == node]
            if data.get("collusion_ring", False) or len(members) > 8:
                flagged_groups.append(node)
    return flagged_groups

def apply_scenario(G, scenario_name):
    G.graph["active_shock"] = scenario_name
    borrowers = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower"]
    groups = [n for n, d in G.nodes(data=True) if d.get("type") == "Group"]
    
    for b in borrowers:
        G.nodes[b]["status"] = "healthy"
        G.nodes[b]["hardship_flag"] = False
    for g in groups:
        G.nodes[g]["status"] = "healthy"
        G.nodes[g]["collusion_ring"] = False

    if scenario_name == "isolated_hardship":
        target = borrowers[0]
        G.nodes[target]["hardship_flag"] = True
        G.nodes[target]["status"] = "hardship"
        
    elif scenario_name == "peer_contagion":
        target_group = groups[0]
        members = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower" and d.get("group") == target_group]
        for m in members[:3]:
            G.nodes[m]["risk_score"] = 0.92
            G.nodes[m]["status"] = "contagion-risk"
        G.nodes[target_group]["status"] = "quarantined"
        
    elif scenario_name == "gateway_outage":
        for n, d in G.nodes(data=True):
            if d.get("type") == "PaymentGateway":
                d["status"] = "latency_spike"
                d["latency_ms"] = 1200
        
    elif scenario_name == "macro_shock":
        target_region = "North-East Agri"
        G.graph["active_shock"] = "Regional loan-waiver rumor active"
        for b in borrowers:
            if G.nodes[b].get("region") == target_region:
                G.nodes[b]["hardship_flag"] = True
                G.nodes[b]["status"] = "macro-shock"
                
    elif scenario_name == "collusion_ring":
        target_group = groups[2]
        G.nodes[target_group]["collusion_ring"] = True
        members = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower" and d.get("group") == target_group]
        for m in members:
            G.nodes[m]["status"] = "collusion-flagged"
            
    return G