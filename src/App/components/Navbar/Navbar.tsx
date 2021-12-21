import { FC, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { SettingsOutlined, Add } from '@mui/icons-material';

import logo from '../../images/logo.svg';
import { DashboardName } from './components/DashboardName';
import { LocationsContext } from '../../context/locations';
import { SettingsContext } from '../../context/settings';
import CopyURLButton from './components/CopyURLButton';
import { ScreenSizesContext } from '../../context/screenSizes';

import styles from './Navbar.module.scss';

const Navbar: FC = () => {
  const {
    actions: { CreateFormHandler, ResetUrl }
  } = useContext(LocationsContext);
  const {
    actions: { SettingsModalHandler }
  } = useContext(SettingsContext);
  const {
    state: { width }
  } = useContext(ScreenSizesContext);

  const createFormHandler = () => {
    if (CreateFormHandler) {
      CreateFormHandler(true);
    }
  };

  const settingsModalHandler = () => {
    if (SettingsModalHandler) {
      SettingsModalHandler();
    }
  };

  return (
    <AppBar
      position="static"
      classes={{ root: styles['app-bar'] }}
      color="transparent"
    >
      <Toolbar className={styles.toolbar}>
        <div className={styles['flex-center']}>
          <Button onClick={ResetUrl}>
            <img className={styles.title} src={logo} alt="logo" />
          </Button>
          {width && width <= 600 ? '' : <DashboardName />}
        </div>
        <div className={styles.buttons}>
          <IconButton
            className={styles['settings-btn']}
            data-testid="settings-icon"
            onClick={settingsModalHandler}
          >
            <SettingsOutlined sx={{ color: '#fff' }} />
          </IconButton>
          <CopyURLButton />
          <Tooltip
            title="Toggle, + or = to toggle drawer"
            enterDelay={1000}
            leaveDelay={200}
          >
            {width && width <= 600 ? (
              <IconButton
                data-testid="settings-icon"
                onClick={createFormHandler}
              >
                <Add sx={{ color: '#fff' }} />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={createFormHandler}
                className={styles['add-city-button']}
                endIcon={<Add />}
              >
                Add City
              </Button>
            )}
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;