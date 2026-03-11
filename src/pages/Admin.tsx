import React, { useState, useEffect } from "react";

// Direct Supabase API call
const supabaseUrl = 'https://tixxvcxcrgxscmprldmi.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzA5MzksImV4cCI6MjA2OTA0NjkzOX0.bhWFkJAMPAnEf9c1rRjEbyYG4XjQnOIP2dsVVeK_H3U';

interface Order {
  id: number;
  created_at: string;
  name: string;
  number: string;
  adres: string;
  count: number;
  type: string;
  delivery_date: string;
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
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/orders?select=*&order=created_at.desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': anonKey,
            'Authorization': `Bearer ${anonKey}`,
          }
        }
      );
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setError(`Error: ${response.status} - ${errorText}`);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));
      
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data && typeof data === 'object') {
        const ordersArray = data.data || data.orders || Object.values(data).flat();
        setOrders(Array.isArray(ordersArray) ? ordersArray : []);
      } else {
        setOrders([]);
      }
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
        
        {/* Debug Info */}
        <div style={{ 
          backgroundColor: "#2c3e50", 
          padding: "15px", 
          borderRadius: "8px", 
          marginBottom: "20px",
          border: "2px solid #e74c3c"
        }}>
          <h3 style={{ margin: "0 0 10px 0" }}>Debug Info:</h3>
          <p style={{ margin: "5px 0" }}>Orders Array Length: {orders.length}</p>
          <p style={{ margin: "5px 0" }}>Is Array: {Array.isArray(orders) ? 'YES' : 'NO'}</p>
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
                  <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid #e94560" }}>Delivery</th>
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
                    <td style={{ padding: "15px" }}>{order.delivery_date || '-'}</td>
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
