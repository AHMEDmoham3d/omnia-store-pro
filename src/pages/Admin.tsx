import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

interface Analytics {
  totalVisits: number;
  totalOrders: number;
  countriesCount: number;
  sectionsViewed: { [key: string]: number };
}

export const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalVisits: 0,
    totalOrders: 0,
    countriesCount: 0,
    sectionsViewed: {},
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const loadData = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      const { data: analyticsData, error: analyticsError } = await supabase
        .from('visitor_analytics')
        .select('*');

      if (analyticsError) throw analyticsError;

      const countries = new Set(
        analyticsData?.map(item => item.country).filter(Boolean)
      );

      const sections: { [key: string]: number } = {};
      analyticsData?.forEach(item => {
        if (item.section_viewed) {
          sections[item.section_viewed] = (sections[item.section_viewed] || 0) + 1;
        }
      });

      setAnalytics({
        totalVisits: analyticsData?.length || 0,
        totalOrders: ordersData?.length || 0,
        countriesCount: countries.size,
        sectionsViewed: sections,
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-container">
        <div style={{ maxWidth: '400px', margin: '100px auto' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-container">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Monitor your store performance and manage orders</p>
      </div>

      <div className="admin-grid">
        <div className="stats-card">
          <div className="stats-label">Total Visits</div>
          <div className="stats-value">{analytics.totalVisits}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Total Orders</div>
          <div className="stats-value">{analytics.totalOrders}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Countries</div>
          <div className="stats-value">{analytics.countriesCount}</div>
        </div>
        <div className="stats-card">
          <div className="stats-label">Most Viewed Section</div>
          <div className="stats-value" style={{ fontSize: '20px' }}>
            {Object.keys(analytics.sectionsViewed).length > 0
              ? Object.entries(analytics.sectionsViewed).sort((a, b) => b[1] - a[1])[0][0]
              : 'N/A'}
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header">
          <h3 className="table-title">Recent Orders</h3>
        </div>
        <div className="table-wrapper">
          {orders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Delivery Date</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>{order.name}</td>
                    <td>{order.number}</td>
                    <td>{order.type}</td>
                    <td>{order.count}</td>
                    <td>
                      {order.delivery_date
                        ? new Date(order.delivery_date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>{order.adres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
              No orders yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
