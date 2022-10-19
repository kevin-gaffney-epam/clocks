import React, { useState, useEffect, useMemo, ChangeEvent, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton, Dialog, Button, Divider, Tooltip } from '@mui/material';
import { Close, SettingsOutlined } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useAutoTheme from '../../../../hooks/useAutoTheme';
import { IInitialState, IActionSettingsPayload } from '../../../../redux/types';
import { THEME, TIME_FORMAT, TIMEZONE, COUNTRYFLAG } from '../../../../redux/constants';
import { setSettings } from '../../../../redux/actions';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';

import style from './SettingsModal.module.scss';
import { SETTING_VALUE } from './SettingsModal.constants';
import DisplayBlock from './components/DisplayBlock/DisplayBlock';
import TimezoneBlock from './components/TimezoneBlock/TimezoneBlock';
import HoursSortingBlock from './components/HoursSortingBlock/HoursSortingBlock';
import ThemeBlock from './components/ThemeBlock/ThemeBlock';
import CountryFlagBlock from './components/CountryFlagBlock/CountryFlagBlock';

const SettingsModal: React.FC = () => {
  const anchorRef = useRef(null);
  const buttonTheme = useTheme(style.lightIcon, style.darkIcon);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const { t } = useTranslation();

  const { setAutoTheme } = useAutoTheme();

  const [isModalOpen, setModal] = useState(false);

  const {
    autoTheme,
    theme,
    showDate,
    showFooter,
    displayFlagInSearch,
    showFlagAndCountry,
    showTimezone,
    timeFormat
  } = useSelector((state: IInitialState) => state.settings);

  const { deleteMode, counter, onboarding, planningMode } = useSelector(
    (state: IInitialState) => state
  );

  const dispatch = useDispatch();

  const [localSettings, setLocalSettings] = useState<IActionSettingsPayload>({
    autoTheme: undefined,
    theme: THEME.light,
    showDate: true,
    showFooter: true,
    displayFlagInSearch: true,
    showFlagAndCountry: COUNTRYFLAG.hide,
    showTimezone: TIMEZONE.disabled,
    timeFormat: TIME_FORMAT.H24
  });

  useEffect(() => {
    setLocalSettings({
      autoTheme,
      theme,
      showDate,
      showFooter,
      displayFlagInSearch,
      showFlagAndCountry,
      showTimezone,
      timeFormat
    });
  }, [
    autoTheme,
    theme,
    showDate,
    showFooter,
    displayFlagInSearch,
    showFlagAndCountry,
    showTimezone,
    isModalOpen,
    timeFormat
  ]);

  useEffect(() => {
    const localStorageSettings = localStorage.getItem('settings');

    if (localStorageSettings) {
      const parsedSettings = JSON.parse(localStorageSettings);
      dispatch(setSettings({ ...parsedSettings }));
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (autoTheme) {
      setAutoTheme();
    }
    // don't need as a dependency setAutoTheme
    // eslint-disable-next-line
  }, [autoTheme, counter]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleSetSettings = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      switch (value) {
        case SETTING_VALUE.date:
          setLocalSettings({ ...localSettings, showDate: !localSettings.showDate });
          break;
        case SETTING_VALUE.footer:
          setLocalSettings({ ...localSettings, showFooter: !localSettings.showFooter });
          break;
        case COUNTRYFLAG.hide:
          setLocalSettings({ ...localSettings, showFlagAndCountry: value });
          break;
        case COUNTRYFLAG.flag:
          setLocalSettings({ ...localSettings, showFlagAndCountry: value });
          break;
        case COUNTRYFLAG.country:
          setLocalSettings({ ...localSettings, showFlagAndCountry: value });
          break;
        case COUNTRYFLAG.flagAndCountry:
          setLocalSettings({ ...localSettings, showFlagAndCountry: value });
          break;
        case TIMEZONE.disabled:
          setLocalSettings({ ...localSettings, showTimezone: value });
          break;
        case TIMEZONE.abbrv:
          setLocalSettings({ ...localSettings, showTimezone: value });
          break;
        case TIMEZONE.country:
          setLocalSettings({ ...localSettings, showTimezone: value });
          break;
        case TIMEZONE.abbrvCountry:
          setLocalSettings({ ...localSettings, showTimezone: value });
          break;
        case SETTING_VALUE.auto:
          setLocalSettings({ ...localSettings, autoTheme: !localSettings.autoTheme });
          break;
        case TIME_FORMAT.H24:
          setLocalSettings({ ...localSettings, timeFormat: value });
          break;
        case TIME_FORMAT.H12:
          setLocalSettings({ ...localSettings, timeFormat: value });
          break;
        case SETTING_VALUE.searchFlag:
          setLocalSettings({
            ...localSettings,
            displayFlagInSearch: !localSettings.displayFlagInSearch
          });
          break;
        default:
          setLocalSettings({ ...localSettings, theme: value });
          break;
      }
    },
    [localSettings]
  );

  const handleClose = () => {
    setModal(false);
  };

  const handleSave = () => {
    dispatch(setSettings({ ...localSettings }));
    localStorage.setItem('settings', JSON.stringify(localSettings));
    setModal(false);
  };

  const tooltipText = useMemo((): string => t('Settings.ButtonTooltip'), [t]);
  const disabled = useMemo(() => deleteMode.isOn || planningMode.isOn, [deleteMode, planningMode]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton ref={anchorRef} onClick={handleOpenModal} disabled={disabled}>
          <SettingsOutlined
            className={clsx({ [buttonTheme]: true, [style.disabledIcon]: disabled })}
          />
        </IconButton>
      </Tooltip>

      <Dialog open={isModalOpen} onClose={handleClose}>
        <div className={bodyTheme}>
          <div className={style.header}>
            <div className={style.modalTitle}>{t('Settings.ModalTitle')}</div>
            <IconButton onClick={handleClose}>
              <Close className={buttonTheme} />
            </IconButton>
          </div>
          <DisplayBlock localSettings={localSettings} handleSetSettings={handleSetSettings} />
          <Divider
            className={clsx({ [style.divider]: true, [style.darkDivider]: theme === THEME.dark })}
          />
          <CountryFlagBlock localSettings={localSettings} handleSetSettings={handleSetSettings} />
          <Divider
            className={clsx({ [style.divider]: true, [style.darkDivider]: theme === THEME.dark })}
          />
          <TimezoneBlock localSettings={localSettings} handleSetSettings={handleSetSettings} />
          <Divider
            className={clsx({ [style.divider]: true, [style.darkDivider]: theme === THEME.dark })}
          />
          <HoursSortingBlock localSettings={localSettings} handleSetSettings={handleSetSettings} />
          <Divider
            className={clsx({ [style.divider]: true, [style.darkDivider]: theme === THEME.dark })}
          />
          <ThemeBlock localSettings={localSettings} handleSetSettings={handleSetSettings} />
          <div className={style.buttonContainer}>
            <Button className={style.button} onClick={handleSave}>
              {t('Settings.SaveButton')}
            </Button>
          </div>
        </div>
      </Dialog>
      {onboarding?.settingsModal && anchorRef.current && (
        <Onboarding
          open={onboarding.settingsModal}
          anchorElement={anchorRef.current}
          nextElement="deleteButton"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          title={t('Onboarding.SettingsModalTitle')}
          text={t('Onboarding.SettingsModalContent')}
        />
      )}
    </>
  );
};

export default SettingsModal;
