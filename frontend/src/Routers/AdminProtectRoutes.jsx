import { useNavigate , Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AdminProtectRoutes({children}){
    console.log("successsss")
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);
console.log(user,"jjjjjj");
    
    if(user && user.role == "admin"){
    
        return children;
    }
     return <Navigate to="/login" replace/>
}
export default AdminProtectRoutes;