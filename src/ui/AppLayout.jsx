import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { styled } from 'styled-components'

const Main = styled.main`
    background-color: var(--color-gray-5);
    padding: 4rem 4.8rem 6rem;
`

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
`

const AppLayout = () => {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout