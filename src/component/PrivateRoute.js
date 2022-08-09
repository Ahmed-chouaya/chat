import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router'
import { AuthContext } from '../context/auth'

export const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(AuthContext)
  return (
    <Route 
        {...rest}
        exact
        render={(props) => 
            user ? <Component {...props} /> : <Navigate to='/login' />
        }
    />
  )
}
