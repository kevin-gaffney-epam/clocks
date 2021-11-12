import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Tooltip } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { ThemeContext } from '../../context/theme';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { DarkModeIcon, LightModeIcon } from '../../assets/icons/icons';
import { DashboardName } from '../../components/DashboardName';

const useStyles = makeStyles(theme => ({
    appbar: {
        boxShadow: 'none',
        background: EpamColors.darkGray,
        borderBottom: '2px solid rgba(0,0,0,.06)',
        color: 'white'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        height: 28,
        objectFit: 'cover',
        cursor: 'pointer',
        marginRight: 12
    },
    buttons: {
        display: 'flex',
        alignItems: 'center'
    },
    modeIcon: {
        color: theme.palette.background.paper
    },
    addCityButton: {
        marginLeft: '1rem'
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const {
        actions: { CreateFormHandler, ResetUrl }
    } = useContext(LocationsContext);

    const {
        actions: { ThemeHandler },
        state: { type }
    } = useContext(ThemeContext);

    const createFormHandler = () => {
        if (CreateFormHandler) {
            CreateFormHandler(true);
        }
    };

    return (
        <AppBar position="static" className={classes.appbar} color="transparent">
            <Toolbar className={classes.toolbar}>
                <div className="content-center">
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                    <img className={classes.title} onClick={ResetUrl} src={logo} alt="logo" />
                    <DashboardName />
                </div>
                <div className={classes.buttons}>
                    <IconButton color="inherit" onClick={ThemeHandler} className={classes.modeIcon}>
                        {type === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <Tooltip title="Toggle, + or = to toggle drawer" enterDelay={1000} leaveDelay={200}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={createFormHandler}
                            className={classes.addCityButton}
                        >
                            Add City
                        </Button>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
