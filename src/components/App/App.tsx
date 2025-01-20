import React from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'

import UsersList from '../Users/List/UsersList'
import UsersDetail from '../Users/Detail/UsersDetail'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UsersDetail />} />
      </Routes>
    </Router>
  )
}

export default App
