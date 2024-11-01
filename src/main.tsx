import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ExhibitionsScreens from "./Components/screens/exhibitionScreen/ExhibitionsScreen.tsx";
import CollectionInventoryScreen from "./Components/screens/collectionInventoryScreen/CollectionInventoryScreen.tsx";
import App from "./App.tsx";
import HomeScreen from "./Components/screens/homeScreen/HomeScreen.tsx";
import ReportesScreen from "./Components/screens/reportesScreen/ReportesScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route index path="/" element={<HomeScreen />} />

        <Route path="/Exhibition" element={<ExhibitionsScreens />} />
        <Route
          path="/collectInventory"
          element={<CollectionInventoryScreen />} />
          <Route
          path="/reports"
          element={<ReportesScreen />} />
      </Route>

      <Route/>
    </Route>
    
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
