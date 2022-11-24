import About from '../pages/about'
import {render, screen} from '@testing-library/react'

test('title an description are there', async()=>{
  render(<About/>)

  const title = screen.getByRole('heading')
  expect(title).toBeInTheDocument()
  
})