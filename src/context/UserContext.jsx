// save and make your data centerlize

import { createContext, useState} from "react";

export const UserData=createContext();

const UserContext = ({children}) => {
const [userdata,setUserdata]=useState("")

  return (
   <UserData.Provider value={{userdata,setUserdata}}>
     <div>{children}</div>
   </UserData.Provider>
  );
};

export default UserContext