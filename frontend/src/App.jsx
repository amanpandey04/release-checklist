import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import ReleasesPage from "./pages/ReleasesPage";
import CreateReleasePage from "./pages/CreateReleasePage";
import ReleaseDetailsPage from "./pages/ReleaseDetailsPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ReleasesPage />} />
        <Route path="/releases/new" element={<CreateReleasePage />} />
        <Route path="/releases/:id" element={<ReleaseDetailsPage />} />
      </Routes>
    </Layout>
  );
}
