import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

function logout() {
  signOut(auth);
}

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (user)
    return (
      <div>
        <p>{user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  return <div>not logged in</div>;
}
