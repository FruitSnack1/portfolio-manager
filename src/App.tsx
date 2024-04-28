import { Box, CssBaseline, CssVarsProvider } from '@mui/joy'
import './App.css'
import '@fontsource/inter'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Records from './pages/Logs'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Assets from './pages/Assets'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

const newTheme = createTheme({ palette: { mode: 'dark' } })

function App() {
  return (
    <ThemeProvider theme={newTheme}>
      <CssVarsProvider defaultMode="dark">
        <Router>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/app" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />}></Route>
              <Route path="assets" element={<Assets />}></Route>
              <Route path="records" element={<Records />}></Route>
              <Route path="*" element={<Records />}></Route>
            </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
          {/* <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Header />
            <Sidebar />
            <Box
              component="main"
              className="MainContent"
              sx={{
                px: { xs: 2, md: 6 },
                pt: {
                  xs: 'calc(12px + var(--Header-height))',
                  sm: 'calc(12px + var(--Header-height))',
                  md: 3,
                },
                pb: { xs: 2, sm: 2, md: 3 },
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0,
                height: '100dvh',
                gap: 1,
                overflow: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  mb: 1,
                  gap: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'start', sm: 'center' },
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}
              >
                
              </Box>
            </Box>
          </Box> */}
        </Router>
      </CssVarsProvider>
    </ThemeProvider>
  )
}

export default App
