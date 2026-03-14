import React, { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';

interface Order {
  id: number;
  created_at: string;
  name: string;
  number: string;
  adres: string;
  count: number;
  type: string;
  notes: string;
}

export const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const fetchData = async () => {
    // SECURITY: Check password first
    const savedPassword = localStorage.getItem('adminPassword');
    if (!savedPassword) {
      const password = prompt('Enter admin password (first time sets it):');
      if (!password) return;
      localStorage.setItem('adminPassword', btoa(password)); // Simple base64
      return fetchData();
    }
    const inputPassword = prompt('Admin Password:');
    if (inputPassword && btoa(inputPassword) !== savedPassword) {
      setError('❌ Invalid password. Access denied.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(`Error: ${error.message}`);
        setLoading(false);
        return;
      }
      
      console.log('Fetched data:', data);
      setOrders(data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Force refresh
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Inline rendering - no complex conditionals
  return (
    <div style={{ 
      paddingTop: "120px", // Space for fixed header
      paddingLeft: "40px", 
      paddingRight: "40px",
      paddingBottom: "40px", 
      color: "#fff", 
      minHeight: "100vh", 
      backgroundColor: "#1a1a2e",
      fontFamily: 'Arial, sans-serif',
      position: "relative",
      zIndex: 1
    }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "32px" }}>
        Admin Panel - Orders
      </h1>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "30px",
          backgroundColor: "#16213e",
          padding: "20px",
          borderRadius: "10px"
        }}>
          <h2 style={{ margin: 0 }}>Orders List ({orders.length})</h2>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            style={{ 
              padding: "12px 24px", 
              backgroundColor: loading ? "#7f8c8d" : "#27ae60", 
              color: "#fff", 
              border: "none", 
              borderRadius: "5px", 
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px"
            }}
          >
            {loading ? '⏳ Loading...' : '🔄 Refresh'}
          </button>
        </div>
        
        {/* Welcome Message */}
        <div style={{ 
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          padding: "30px", 
          borderRadius: "16px", 
          marginBottom: "30px",
          border: "1px solid rgba(251, 191, 36, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, transparent 70%)",
            borderRadius: "50%"
          }}></div>
          <div style={{
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "150px",
            height: "150px",
            background: "radial-gradient(circle, rgba(109, 40, 217, 0.2) 0%, transparent 70%)",
            borderRadius: "50%"
          }}></div>
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
              <span style={{ fontSize: "28px" }}>🌟</span>
              <h3 style={{ margin: 0, color: "#fbbf24", fontSize: "22px", fontWeight: 700, letterSpacing: "0.5px" }}>
                Welcome to Omnia Community
              </h3>
            </div>
            <p style={{ margin: 0, color: "#d1d5db", lineHeight: "1.9", fontSize: "15px", fontWeight: 400 }}>
              This page is not just for tracking orders, but the beginning of a community that belongs to Omnia.{' '}
              <span style={{ color: "#fbbf24", fontWeight: 600 }}>You are not just running a business,</span> but creating a real impact.{' '}
              And the disappearance of this message one day means that the community has indeed been born.
            </p>
            <div style={{ 
              marginTop: "20px", 
              paddingTop: "15px", 
              borderTop: "1px solid rgba(251, 191, 36, 0.2)",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "13px" }}>
                <span style={{ color: "#27ae60" }}>✓</span> Track Orders
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "13px" }}>
                <span style={{ color: "#27ae60" }}>✓</span> Build Community
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "13px" }}>
                <span style={{ color: "#27ae60" }}>✓</span> Create Impact
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div style={{ 
            backgroundColor: "#c0392b", 
            color: "#fff", 
            padding: "15px", 
            borderRadius: "8px", 
            marginBottom: "20px"
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            backgroundColor: "#16213e", 
            borderRadius: "10px",
            color: "#ccc"
          }}>
            Loading orders...
          </div>
        )}
        
        {/* Table - always rendered if orders exist */}
        {orders && orders.length > 0 && (
          <div style={{ overflowX: "auto", borderRadius: "10px" }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse", 
              backgroundColor: "#16213e"
            }}>
              <thead>
                <tr style={{ backgroundColor: "#0f3460" }}>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>ID</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Name</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Phone</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Address</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Qty</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Type</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Notes</th>
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid #0f3460" }}>
                    <td style={{ padding: "15px" }}>{order.id}</td>
                    <td style={{ padding: "15px" }}>{order.name}</td>
                    <td style={{ padding: "15px" }}>{order.number}</td>
                    <td style={{ padding: "15px" }}>{order.adres}</td>
                    <td style={{ padding: "15px" }}>{order.count}</td>
                    <td style={{ padding: "15px" }}>{order.type}</td>
                    <td style={{ padding: "15px" }}>{order.notes || '-'}</td>
                    <td style={{ padding: "15px" }}>
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Show if no orders */}
        {(!orders || orders.length === 0) && (
          <div style={{ 
            textAlign: "center", 
            padding: "40px", 
            backgroundColor: "#16213e", 
            borderRadius: "10px",
            color: "#ccc"
          }}>
            No orders found. Click Refresh to load data.
          </div>
        )}
      </div>
    </div>
  );
};
