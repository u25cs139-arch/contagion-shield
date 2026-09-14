import random
import networkx as nx

def generate_heterogeneous_graph():
    G = nx.MultiDiGraph()
    
    # Zones & Payment Gateways
    zones = ["North-East Agri", "Central Plains", "Southern Coastal", "Western Semi-Arid"]
    gateways = ["UPI_Axis_PG", "UPI_Paytm_PG", "IMPS_Switch_A", "Wallet_Ind_PG"]
    
    for gw in gateways:
        G.add_node(gw, type="PaymentGateway", status="healthy", latency_ms=45)

    borrower_id_counter = 1
    groups = [f"JLG_Circle_{i:02d}" for i in range(1, 21)]
    
    for group in groups:
        G.add_node(group, type="Group", region=random.choice(zones), status="healthy")
        
        group_borrowers = []
        for _ in range(7 + random.randint(0, 3)): # ~150 total borrowers across 20 groups
            b_id = f"B_{borrower_id_counter:03d}"
            borrower_id_counter += 1
            
            # Attributes
            alt_score = round(random.uniform(0.4, 0.95), 2)
            trust_score = round(random.uniform(0.5, 1.0), 2)
            
            G.add_node(b_id, 
                type="Borrower",
                group=group,
                alt_utility_history=alt_score,
                mobile_recharge_freq=random.choice(["Daily", "Weekly", "Erratic"]),
                agri_input_pattern=random.choice(["Regular", "Delayed", "None"]),
                tenure_months=random.randint(3, 24),
                risk_score=round(1.0 - alt_score, 2),
                trust_score=trust_score,
                hardship_flag=False,
                par_status="PAR-0",
                status="healthy",
                region=G.nodes[group]["region"]
            )
            group_borrowers.append(b_id)
            
            # Connect to group membership
            G.add_edge(b_id, group, relation="group_membership")
            
            # Connect to payment gateway
            pg = random.choice(gateways)
            G.add_edge(b_id, pg, relation="same_payment_rail")

        # Create joint guarantees inside group (Ring structure)
        for i in range(len(group_borrowers)):
            b1 = group_borrowers[i]
            b2 = group_borrowers[(i + 1) % len(group_borrowers)]
            G.add_edge(b1, b2, relation="joint_guarantee", weight=random.uniform(0.7, 1.0))

    # Inject cross-group informal ties & supply chains
    borrowers = [n for n, d in G.nodes(data=True) if d.get("type") == "Borrower"]
    for _ in range(25):
        b1, b2 = random.sample(borrowers, 2)
        if b1 != b2:
            G.add_edge(b1, b2, relation="informal_tie", weight=random.uniform(0.3, 0.8))

    return G