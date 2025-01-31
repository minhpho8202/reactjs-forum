// import { IUser } from "@/types/models";
// import { createContext, useState } from "react";

// export const AuthConText = createContext({
//     id: "",
//     username: "",
//     email: "",
//     role: "",
//     bio: "",
//     profilePicture: "",
// })

// export const AuthWrapper = (props) => {
//     const [user, setUser] = useState({
//         id: "",
//         username: "",
//         email: "",
//         role: "",
//         bio: "",
//         profilePicture: "",
//     });

//     return <AuthConText.Provider value={{ user, setUser }}>
//         {props.children}
//     </AuthConText.Provider>
// }