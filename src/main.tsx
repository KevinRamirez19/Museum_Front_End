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
import VisitorManagementScreen from "./Components/screens/visitorManagementScreen/VisitorManagementScreen.tsx";
import LoginScreen from "./Components/screens/loginScreen/LoginScreen.tsx";
import ArtRoomsScreen from "./Components/screens/artRoomsScreen/ArtRoomsScreen.tsx";
import EmployeesScreen from "./Components/screens/employeesScreen/EmployeesScreen.tsx";
import GameMenu from "./Components/screens/GameMenu/GameMenu.tsx";
import TriviaGame from "./Components/screens/GameMenu/TriviaGame.tsx";
import HangmanGame from "./Components/screens/GameMenu/HangmanGame.tsx";
import JuegosScreen from "./Components/screens/JuegosScreen/JuegosScreen.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/exhibition" element={<ExhibitionsScreens />} />
      <Route path="/collectInventory" element={<CollectionInventoryScreen />} />
      <Route path="/reports" element={<ReportesScreen />} />
      <Route path="/visitorManagement" element={<VisitorManagementScreen/>} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path= "/artRooms" element={<ArtRoomsScreen/>}/>
      <Route path= "/employees" element={<EmployeesScreen/>}/>
      <Route path="/GameMenu" element={<GameMenu />} />
      <Route path="/TriviaGame" element={<TriviaGame  />} />
      <Route path="/HangmanGame" element={<HangmanGame />} />
      <Route path="/JuegosScreen" element={<JuegosScreen/>} />
  
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
