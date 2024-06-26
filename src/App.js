import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import Dashboard from "./pages/Dashboard"
import Booking from "./pages/Booking"
import Account from "./pages/Account"
import Cabins from "./pages/Cabins"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import Users from "./pages/Users"
import Settings from "./pages/Settings"

import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from './ui/AppLayout'
import { Toaster } from 'react-hot-toast'
import Bookings from './pages/Bookings'
import Checkin from './pages/Checkin'
import ProtctedRoute from './ui/ProtctedRoute'
import { DarkModeProvide } from './context/DarkModeContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //time that update date
      staleTime: 60 * 1000
    }
  }
})

function App() {


  return (
    <DarkModeProvide>

      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={
              <ProtctedRoute>
                <AppLayout />
              </ProtctedRoute>
            }>
              <Route index element={<Navigate replace to={"/dashboard"} />} />
              <Route path='/Hotel-Booketing' element={<Navigate replace to={"/dashboard"} />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='booking' element={<Bookings />} />
              <Route path='booking/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='setting' element={<Settings />} />
              <Route path='users' element={<Users />} />
              <Route path='account' element={<Account />} />
              <Route path='cabins' element={<Cabins />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 5000
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-gray-0)",
              color: "var(--color-gray-700)"
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvide>
  )
}

export default App


// import React from 'react'
// import styled from 'styled-components'
// import GlobalStyles from './styles/GlobalStyles'
// import Button from './ui/Button'
// import Input from './ui/Input'
// import Heading from './ui/Heading'
// import Row from './ui/Row'

// const StyledApp = styled.div`
//   /* background-color: orange; */
//   padding: 20px;
// `


// const App = () => {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row type="vertical">

//           <Row type="horizontal">
//             {/* we can add any name of props */}
//             <Heading typeof='h1'>App1</Heading>
//             <div>
//               <Heading typeof='h2'>App2</Heading>
//               {/* this one must be (as) because we want to render a h3 element in our code not a h1 element with h3 style */}
//               <Button variation="primary" size="medium" onClick={() => alert("Check in")}>Check in</Button>
//               <Button variation="secondary" size="medium" onClick={() => alert("Check out")}>Check out</Button>
//             </div>
//           </Row>
//           <Row type="vertical">
//             <Heading as='h3'>form</Heading>
//             <form>
//               <Input placeholder='Number of guests...' type='number' />
//               <Input placeholder='Number of guests...' type='number' />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   )
// }