import Login from '../components/Login'
import MyShelf from '../components/MyShelf'
import Books from '../components/Books';
import BooksToLend from '../components/BooksToLend';
import Registration from '../components/Registration';
import { ProtectedRoute } from '../components/AuthRoutes'
import Home from '../components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  createBrowserRouter
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
        element: < MyShelf />
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
