// App.js
import { Provider } from "react-redux";
import store from "./store/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/container/auth";
import Login from "./component/container/login";
import Dashboard from "./component/Features/dashboard/container/dashboard";
import Profile from "./component/Features/profile/container/profile";
import AccountManagePage from "./component/Features/ManageAccount/container/AccountManagePage";
import ManageContacts from "./component/Features/Contacts/ManageContact";
import WhatsAppInbox from "./component/Features/Conversations/container/whatsapp";
import NotFound from "./component/pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signUp"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountManagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <ManageContacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/conversations/whatsapp"
            element={
              <ProtectedRoute>
                <WhatsAppInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
