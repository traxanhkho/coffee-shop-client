import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";

export default function Dashboard( ) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      {
        email: "tom@tom.com",
        password: "tom123",
        role: "user",
      },
      {
        email: "david@david.com",
        password: "david123",
        role: "user",
      },
      {
        email: "sara@sara.com",
        password: "sara123",
        role: "admin",
      },
    ]);
  }, []);

  
  const history = useNavigate();

  // useEffect(() => {
  // 	const userAsJSON = localStorage.getItem('user')

  // 	const user = JSON.parse(userAsJSON)

  // 	fetch('http://localhost:3030/users', {
  // 		method: 'GET',
  // 		headers: {
  // 			authorization: user.id,
  // 		},
  // 	})
  // 		.then(res => res.json())
  // 		.then(data => {
  // 			const users = data.users

  // 			console.log('Users GET request: ', data)

  // 			setUsers(users)
  // 		})
  // 		.catch(error => {
  // 			console.error('[ERROR]: ', error)

  // 			// history.push("/admin/not-authorized")
  // 		})
  // }, [])

  return (
    <main>
      <Sidebar /> 
    </main>
  );
}
