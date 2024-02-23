import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import Spinner from './Spinner'
import useUser from '../features/authentication/useUser'
import { useNavigate } from 'react-router-dom'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProtctedRoute = ({ children }) => {
  const navigate = useNavigate()

  //1. load authenticated user
  const { user, isLoading, isAuthenticated } = useUser()



  //2. if there is no authenticated user redirect ro login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading)
      navigate("/login")
  }, [isAuthenticated, isLoading, navigate])

  //3. while loading show a spinner
  if (isLoading)
    return <FullPage> <Spinner /> </FullPage>

  //4. if there is a user render app
  if (isAuthenticated)
    return (
      children
    )
}

export default ProtctedRoute