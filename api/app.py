from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Sample data for whale intelligence responses
WHALE_CLUSTERS = [
    {
        "name": "USELESS Alpha Group",
        "wallets": 8,
        "accuracy": 87.4,
        "folder": "USELESS_Whales",
        "status": "ACCUMULATING"
    },
    {
        "name": "SOL Ecosystem Pros", 
        "wallets": 23,
        "accuracy": 91.2,
        "folder": "SOL_Veterans",
        "status": "HOLDING"
    },
    {
        "name": "DeFi Arbitrage Masters",
        "wallets": 15,
        "accuracy": 83.7,
        "folder": "DeFi_Specialists", 
        "status": "ACTIVE"
    }
]

TRENDING_TOKENS = [
    {"token": "USELESS", "rank": 1, "volume_24h": 2400000, "market_cap": 18500000, "price_change_24h": 12.5},
    {"token": "BONK", "rank": 2, "volume_24h": 1850000, "market_cap": 1200000000, "price_change_24h": -5.2},
    {"token": "WIF", "rank": 3, "volume_24h": 3200000, "market_cap": 875000000, "price_change_24h": 8.7}
]

def generate_whale_transaction():
    """Generate realistic whale transaction data"""
    wallets = [
        '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        'ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ',
        'B8KQm5vP2kJhEwC9NzLx7mR3WqYzAcDfGh9VtXsRnKpM'
    ]
    
    return {
        "wallet": random.choice(wallets),
        "action": random.choice(["BUY", "SELL"]),
        "amount": random.choice([500000, 1200000, 2400000, 850000]),
        "confidence": random.randint(85, 95),
        "value_usd": random.randint(200, 1500),
        "timestamp": datetime.now().isoformat(),
        "token": "USELESS"
    }

@app.route('/schema', methods=['GET'])
def get_schema():
    """Return available RPC methods for ChatGPT"""
    return jsonify({
        "methods": {
            "get_trending_memecoins_by_source": {
                "params": ["source"],
                "description": "Returns top trending meme tokens from CoinGecko or Dune"
            },
            "get_whale_cluster_analysis": {
                "params": [],
                "description": "Returns ML whale cluster analysis with accuracy rates"
            },
            "get_recent_whale_activity": {
                "params": ["token"],
                "description": "Returns recent whale wallet activity for a specific token"
            },
            "get_trading_opportunities": {
                "params": [],
                "description": "Returns Linda Bradford Raschke trading opportunities based on whale patterns"
            },
            "get_whale_intelligence_summary": {
                "params": [],
                "description": "Returns comprehensive whale intelligence dashboard summary"
            }
        }
    })

@app.route('/rpc', methods=['POST'])
def handle_rpc():
    """Handle JSON-RPC requests from ChatGPT"""
    try:
        data = request.get_json()
        method = data.get('method')
        params = data.get('params', {})
        
        if method == 'get_trending_memecoins_by_source':
            source = params.get('source', 'coingecko')
            response_data = []
            
            for token in TRENDING_TOKENS:
                token_data = token.copy()
                token_data['source'] = source
                response_data.append(token_data)
            
            return jsonify({
                "status": "success",
                "data": response_data,
                "source": source,
                "timestamp": datetime.now().isoformat()
            })
        
        elif method == 'get_whale_cluster_analysis':
            return jsonify({
                "status": "success", 
                "data": {
                    "clusters": WHALE_CLUSTERS,
                    "total_whales": sum(c['wallets'] for c in WHALE_CLUSTERS),
                    "average_accuracy": round(sum(c['accuracy'] for c in WHALE_CLUSTERS) / len(WHALE_CLUSTERS), 1),
                    "methodology": "Linda Bradford Raschke 40-year trading wisdom + ML clustering"
                },
                "timestamp": datetime.now().isoformat()
            })
        
        elif method == 'get_recent_whale_activity':
            token = params.get('token', 'USELESS')
            
            # Generate 5 recent whale transactions
            transactions = [generate_whale_transaction() for _ in range(5)]
            
            return jsonify({
                "status": "success",
                "data": {
                    "token": token,
                    "transactions": transactions,
                    "whale_alerts_count": len([t for t in transactions if t['value_usd'] > 500]),
                    "confidence_range": f"{min(t['confidence'] for t in transactions)}-{max(t['confidence'] for t in transactions)}%"
                },
                "timestamp": datetime.now().isoformat()
            })
        
        elif method == 'get_trading_opportunities':
            opportunities = [
                {
                    "token": "BONK",
                    "pattern": "Triangle Breakout",
                    "confidence": 92,
                    "entry": "$0.000024",
                    "target": "$0.000031",
                    "analysis": "Linda Bradford Raschke methodology: Multiple whale clusters coordinated accumulation with volume confirmation",
                    "risk_level": "MEDIUM",
                    "time_horizon": "2-6 hours"
                },
                {
                    "token": "WIF", 
                    "pattern": "Support Hold",
                    "confidence": 87,
                    "entry": "$2.45",
                    "target": "$3.20", 
                    "analysis": "40 years trading wisdom: Whale support at key level with bullish divergence",
                    "risk_level": "LOW",
                    "time_horizon": "1-3 days"
                }
            ]
            
            return jsonify({
                "status": "success",
                "data": {
                    "opportunities": opportunities,
                    "methodology": "Linda Bradford Raschke patterns + whale intelligence",
                    "risk_assessment": "Based on 87-91% whale cluster accuracy"
                },
                "timestamp": datetime.now().isoformat()
            })
        
        elif method == 'get_whale_intelligence_summary':
            return jsonify({
                "status": "success",
                "data": {
                    "market_overview": {
                        "useless_price": "$0.000234",
                        "price_change_24h": "+12.5%",
                        "volume_24h": "$2.4M",
                        "active_whales": 46
                    },
                    "whale_clusters": WHALE_CLUSTERS,
                    "recent_alerts": [
                        {
                            "type": "WHALE_ALERT",
                            "action": "BUY",
                            "amount": "2.4M $USELESS", 
                            "value": "$562",
                            "confidence": "95%",
                            "wallet": "9WzDXwBb...9zYtAW"
                        }
                    ],
                    "trading_status": "BULLISH",
                    "linda_raschke_signal": "Triangle breakout pattern confirmed with whale accumulation"
                },
                "timestamp": datetime.now().isoformat()
            })
        
        else:
            return jsonify({
                "status": "error",
                "message": f"Unknown method: {method}",
                "available_methods": list(get_schema().get_json()['methods'].keys())
            }), 400
            
    except Exception as e:
        return jsonify({
            "status": "error", 
            "message": str(e)
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "Deluxe
