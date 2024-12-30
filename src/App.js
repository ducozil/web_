import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import { publicRoutes } from "~/routes";
import { privateRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layout";
import { Fragment } from "react";
import HeaderOnly from "~/components/Layout/HeaderOnly";
import { AuthProvider } from "./AuthContext"; // Đường dẫn đến file AuthContext
import DefaultLayoutAdmin from "./admin/Layout/DefaultLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayoutAdmin;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );

}
Kommunicate.init("b952240e4fa142ec51487875fe754072", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true
});
export default App;
