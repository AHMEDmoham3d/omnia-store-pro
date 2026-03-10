import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Order } from "../types";

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@beyondholistic.com";
  const ADMIN_PASSWORD = "BH2026Secure!";

useEffect(() => {
    checkAuth();
}, []);

const checkAuth=()=>{
    try{
        var storedAuth=localStorage.getItem("admin_auth");
        if(storedAuth==="true"){setIsAuthenticated(true);}
    }
catch(err){console.error("Auth error:",err);}
};

const handleLogin=(e:React.FormEvent)=>{
e.preventDefault();
setLoading(true);
setErrorMsg("");

if(email===ADMIN_EMAIL && password===ADMIN_PASSWORD){
localStorage.setItem("admin_auth","true");
setIsAuthenticated(true);
}
else{
setErrorMsg("Invalid email or password");
}
setLoading(false);
};

const fetchOrders=async()=>{
    try{
        let { data: ordersData, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) {
            console.error('Error fetching orders:', error);
        } else if (ordersData) {
            setOrders(ordersData as Order[]);
        }
    } catch(err){
        console.error('Fetch error:', err);    
    }
};

useEffect(() => {
    if (isAuthenticated) {
        fetchOrders();
    }
}, [isAuthenticated]);

const logout=()=>{localStorage.removeItem("admin_auth");window.location.href="/";};

return (
<div style={{padding:"40px",color:"#fff",minHeight:"100vh",backgroundColor:"#1a1a2e"}}>
<h1 style={{textAlign:"center",marginBottom:"30px"}}>Admin Panel</h1>

 {isAuthenticated ? (
   <div style={{maxWidth:"900px",margin:"0 auto"}}>
     <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
       <h2>Orders List</h2>
       <button onClick={logout} style={{padding:"10px 20px",backgroundColor:"#e74c3c",color:"#fff",border:"none",borderRadius:"5px",cursor:"pointer"}}>Logout</button>
     </div>
     
     {orders.length === 0 ? (
       <p style={{textAlign:"center",marginTop:"40px"}}>No orders found.</p>
     ) : (
       <div style={{overflowX:"auto"}}>
         <table style={{width:"100%",borderCollapse:"collapse",backgroundColor:"#16213e",borderRadius:"10px",overflow:"hidden"}}>
           <thead>
             <tr style={{backgroundColor:"#0f3460"}}>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>ID</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Name</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Phone</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Address</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Quantity</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Type</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Delivery Date</th>
               <th style={{padding:"15px",textAlign:"left",borderBottom:"2px solid #e94560"}}>Date</th>
             </tr>
           </thead>
           <tbody>
             {orders.map((order) => (
               <tr key={order.id} style={{borderBottom:"1px solid #0f3460"}}>
                 <td style={{padding:"15px"}}>{order.id}</td>
                 <td style={{padding:"15px"}}>{order.name}</td>
                 <td style={{padding:"15px"}}>{order.number}</td>
                 <td style={{padding:"15px"}}>{order.adres}</td>
                 <td style={{padding:"15px"}}>{order.count}</td>
                 <td style={{padding:"15px"}}>{order.type}</td>
                 <td style={{padding:"15px"}}>{order.delivery_date || '-'}</td>
                 <td style={{padding:"15px"}}>{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
   </div>
 ) : (
   <div style={{maxWidth:"400px",marginTop:"20px",marginLeft:"auto",marginRight:"auto",backgroundColor:"#16213e",padding:30,"borderRadius":10}}>
     <h2 style={{textAlign:"center",marginBottom:"20px"}}>Login</h2>
     <form onSubmit={handleLogin}>
       <div style={{marginBottom:15}}>
         <label style={{display:"block",marginBottom:5}}>Email:</label>
         <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required 
           style={{width:'100%',padding:'10px',borderRadius:'5px',border:'1px solid #ccc',boxSizing:'border-box'}} />
       </div>

<div style={{marginBottom:15}}><label style={{display:"block",marginBottom:5}}>Password:</label><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required 
style={{width:'100%',padding:'10px','borderRadius':'5px','border':'1px solid #ccc','boxSizing':'border-box'}}/></div>

      {errorMsg && <p style={{color:"#e74c3c"}}>{errorMsg}</p>}
       
       <button type="submit" disabled={loading} style={{width:'100%',padding:'12px',backgroundColor:'#e94560',color:'#fff',border:'none',borderRadius:'5px',cursor:'pointer',marginTop:'10px'}}>
         {loading ? 'Loading...' : 'Login'}
       </button>
     </form></div>)}

</div>);
};

