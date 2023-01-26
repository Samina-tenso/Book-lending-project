import Login from './Pages/auth/Login'
import Myshelf from './Pages/auth/Myshelf';
import Books from './Pages/auth/Books';
import BooksToLend from './Pages/auth/BooksToLend';
import { ProtectedRoute } from './Pages/auth/Auth'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'


export const router = createBrowserRouter([
  {
    path: "auth/signin",
    element: <Login />
  }, {
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
