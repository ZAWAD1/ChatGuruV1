import React, { use } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      ChatPage
      <button onClick={logout} className="z-10">
        Logout
      </button>
    </div>
  );
}

export default ChatPage;
