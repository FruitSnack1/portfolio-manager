import { AccountBalance, Dashboard, Logout } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import {
  Box,
  Button,
  GlobalStyles,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import { FC } from 'react'
import ColorSchemeToggle from './ColorSchemeToggle'
import { useNavigate } from 'react-router-dom'
import loginStore from '../store/loginStore'
import { observer } from 'mobx-react'
import { getAuth } from 'firebase/auth'
import useIsLoggedIn from '../hooks/isLoggedIn'

const Sidebar: FC = observer(() => {
  const navigate = useNavigate()
  const auth = getAuth()

  const loggedIn = useIsLoggedIn()

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">Portfolio Manager</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Stack
        direction={'column'}
        justifyContent={'space-between'}
        sx={{ height: '100%' }}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate('/app/dashboard')}>
              <Dashboard />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/app/assets')}>
              <AccountBalance />
              <ListItemContent>
                <Typography level="title-sm">Assets</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/app/records')}>
              <ListIcon />
              <ListItemContent>
                <Typography level="title-sm">Records</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <List
          sx={{
            mt: 'auto',
            flexGrow: 0,
          }}
        >
          <ListItem>
            <ListItemButton
              onClick={() => {
                if (loggedIn) {
                  auth.signOut()
                  loginStore.logout()
                } else {
                  loginStore.login()
                  navigate('/login')
                }
              }}
            >
              <ListItemContent>
                <Button color="neutral" fullWidth startDecorator={<Logout />}>
                  {loggedIn ? 'Log out' : 'Log in'}
                </Button>
                {/* <Typography level="title-sm">Log out</Typography> */}
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <Typography level="body-sm" textAlign={'center'} sx={{ mb: 2 }}>
          made by{' '}
          <Link href="https://github.com/fruitsnack1">@FruitSnack1</Link>
        </Typography>
      </Stack>
    </Sheet>
  )
})

export default Sidebar
