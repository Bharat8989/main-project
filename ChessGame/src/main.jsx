import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Play from './components/Play/Play.jsx'

// import Alarm from './component/Alarm/Alarm.jsx';
// import Clock from './component/Clock/Clock.jsx';
// import Stopwatch from './component/Stopwatch/Stopwatch.jsx';
// import Timer from './component/Timer/Timer.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Play />,
      },
      // {
      //   path: 'clock',
      //   element: <Clock/>, 
      // },
      // {
      //   path: 'stopwatch',
      //   element: <Stopwatch />,
      // },
      // {
      //   path: 'timer',
      //   element: <Timer />,
      
      // },
     
      
    ],
  },
]);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout />}>
//       <Route index element={<Home />} />
//       <Route path='about' element={<About />} />
//       <Route path='contact' element={<Contact />} />
//       {/* Uncomment this route if the Github component and loader are defined */}
//       {/* <Route 
//         loader={githubInfoLoader}
//         path='github' 
//         element={<Github />}
//       /> */}
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
