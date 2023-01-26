import Login from './Pages/auth/Login'
import Myshelf from './Pages/auth/Myshelf';
import Books from './Pages/auth/Books';
import BooksToLend from './Pages/auth/BooksToLend';
import Registration from './Pages/auth/Registration';
import { ProtectedRoute } from './Pages/auth/AuthRoutes'
import Home from './Pages/auth/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "signin",
    element: <Login />
  },
  {
    path: "signup",
    element: <Registration />
  },
  {
    path: "/my-shelf",
    element: <ProtectedRoute />,
    children: [
      {
        path: ":username",
        element: < Myshelf />
      },
      {
        path: ":username/books",
        element: <Books />
      },
      {
        path: ":username/books-available",
        element: <BooksToLend />
      }
    ],

  }
])
function App() {
  return (
    <div className="App">
    </div>
  )
}

export default App
