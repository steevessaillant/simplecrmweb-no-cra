import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {CustomerForm} from './components/CustomerForm'

const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<h1>My  React Components</h1>)
root.render(<h2>Customer Component</h2>)
root.render(<CustomerForm />)
