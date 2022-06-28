import { useEffect, useRef, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/doctorlogin";
import Patientinput from "./components/createpatient";
import Singlepatient from "./components/singlepatient";

import RequireAuth from "./components/RequireAuth";
import Patientlist from "./components/patientlist";
import Searchlist from "./components/searchlist";
import Addrecord from "./components/addrecord";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserLogin />} />


        <Route element={<RequireAuth />}>
        <Route path="/createpatient" element={<Patientinput />} />
        <Route path="/singlepatient/:id" element={<Singlepatient/>} />
        <Route path="/patientlist" element={<Patientlist/>} />
        <Route path="/search/:term" element={<Searchlist/>} />
        <Route path="/addrecord/:id" element={<Addrecord/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
