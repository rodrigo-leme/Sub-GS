import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const RenewableSources = lazy(() => import('../pages/RenewableSources'));
const SourceDetails = lazy(() => import('../pages/SourceDetails'));
const Stats = lazy(() => import('../pages/Stats'));
const Settings = lazy(() => import('../pages/Settings'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sources" element={<RenewableSources />} />
      <Route path="/source/:id" element={<SourceDetails />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
};

export default AppRoutes;