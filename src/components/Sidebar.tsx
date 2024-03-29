import { AccountBalance, Dashboard } from '@mui/icons-material'
import ListIcon from '@mui/icons-material/List'
import {
  Box,
  GlobalStyles,
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

const Sidebar: FC = () => {
  const navigate = useNavigate()
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
            <ListItemButton onClick={() => navigate('/')}>
              <Dashboard />
              <ListItemContent>
                <Typography level="title-sm">Dashboard</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/assets')}>
              <AccountBalance />
              <ListItemContent>
                <Typography level="title-sm">Assets</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => navigate('/logs')}>
              <ListIcon />
              <ListItemContent>
                <Typography level="title-sm">Logs</Typography>
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
}

export default Sidebar
