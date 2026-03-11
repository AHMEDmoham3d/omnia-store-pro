import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// Create a direct Supabase client with service_role key
const supabaseUrl = 'https://tixxvcxcrgxscmprldmi.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeHh2Y3hjcmd4c2NtcHJsZG1pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzQ3MDkzOSwiZXhwIjoyMDY5MDQ2OTM5fQ.hxMFYo5QuqMaGJhm8EWj2ZRT0cecdRa0Vp1KhL-rdZ4';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  }
});

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const ADMIN_EMAIL = "admin@beyondholistic.com";
  const ADMIN_PASSWORD = "BH2026Secure!";

  const addDebug = (msg: string) => {
    console.log(msg);
    setDebugInfo(prev => [...prev, msg]);
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("admin_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      addDebug("Login successful");
    } else {
      setErrorMsg("Invalid email or password");
      addDebug("Login failed: Invalid credentials");
    }
    setLoading(false);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    setDebugInfo([]);
    
    try {
      addDebug("1. Starting fetchOrders...");
      
      // Test direct fetch first
      addDebug("2. Testing direct fetch to Supabase...");
      
      const response = await fetch(
        `${supabaseUrl}/rest/v1/orders?select=*&order=created_at.desc`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
          }
        }
      );
      
      addDebug(`3. Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        addDebug(`4. Error response: ${errorText}`);
        setErrorMsg(`HTTP Error ${response.status}: ${errorText}`);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      addDebug(`4. Data received: ${JSON.stringify(data)}`);
      addDebug(`5. Number of orders: ${data.length}`);
      
      setOrders(data);
      
      if (data.length === 0) {
        addDebug("6. No orders in database");
      } else {
        addDebug(`6. Successfully loaded ${data.length} orders`);
      }
      
    } catch (err: any) {
      addDebug(`Error: ${err.message}`);
      setErrorMsg(err.message);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      addDebug("User authenticated, fetching orders...");
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px", color: "#fff", minHeight: "100vh", backgroundColor: "#1a1a2e" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Admin Panel</h1>

      {isAuthenticated ? (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Orders List</h2>
            <div>
              <button 
                onClick={fetchOrders} 
                disabled={loading} 
                style={{ padding: "10px 20px", backgroundColor: "#3498db", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </button>
              <button 
                onClick={logout} 
                style={{ padding: "10px 20px", backgroundColor: "#e74c3c", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Logout
              </button>
            </div>
          </div>
          
          {errorMsg && (
            <div style={{ backgroundColor: "#e74c3c", padding: "15px", borderRadius: "5px", marginBottom: "20px", color: "#fff" }}>
              Error: {errorMsg}
            </div>
          )}
          
          {/* Debug Info */}
          {debugInfo.length > 0 && (
            <div style={{ backgroundColor: "#2c3e50", padding: "15px", borderRadius: "5px", marginBottom: "20px", fontFamily: "monospace", fontSize: "12px" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>Debug Info:</h4>
              {debugInfo.map((msg, i) => (
                <div key={i} style={{ margin: "5px 0", color: "#2ecc71" }}>{msg}</div>
              ))}
            </div>
          )}
          
          {orders.length === 0 && !loading && !errorMsg ? (
            <p style={{ textAlign: "center", marginTop: "40px" }}>No orders found.</p>
          ) : orders.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#16213e", borderRadius: "10px", overflow: "hidden" }}>
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
                      <td style={{ padding: "15px" }}>{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ) : (
        <div style={{ maxWidth: "400px", margin: "20px auto 0", backgroundColor: "#16213e", padding: "30px", borderRadius: "10px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} 
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", boxSizing: "border-box" }} 
              />
            </div>
            {errorMsg && <p style={{ color: "#e74c3c" }}>{errorMsg}</p>}
            <button 
              type="submit" 
              disabled={loading} 
              style={{ width: "100%", padding: "12px", backgroundColor: "#e94560", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

