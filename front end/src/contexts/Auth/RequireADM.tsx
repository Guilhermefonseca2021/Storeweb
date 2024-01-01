// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";
// import Login from "../../pages/Login/Login";
// import { api } from "../../hooks/useApi";

// export function RequireAuth({ children }: { children: JSX.Element }) {
//   const auth = useContext(AuthContext);
//   const adm = api.get('/admin')

//   if(auth?.user.id == adm?.user.id) {
//     return <Login />
//   }
  
//   return children;
// }
