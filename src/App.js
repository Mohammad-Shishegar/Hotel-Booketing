import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Button from './ui/Button'
import Input from './ui/Input'
import Heading from './ui/Heading'
import Row from './ui/Row'

const StyledApp = styled.div`
  /* background-color: orange; */
  padding: 20px;
`


const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">

          <Row type="horizontal">
            {/* we can add any name of props */}
            <Heading typeof='h1'>App1</Heading>
            <div>
              <Heading typeof='h2'>App2</Heading>
              {/* this one must be (as) because we want to render a h3 element in our code not a h1 element with h3 style */}
              <Button variation="primary" size="medium" onClick={() => alert("Check in")}>Check in</Button>
              <Button variation="secondary" size="medium" onClick={() => alert("Check out")}>Check out</Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as='h3'>form</Heading>
            <form>
              <Input placeholder='Number of guests...' type='number' />
              <Input placeholder='Number of guests...' type='number' />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  )
}

export default App