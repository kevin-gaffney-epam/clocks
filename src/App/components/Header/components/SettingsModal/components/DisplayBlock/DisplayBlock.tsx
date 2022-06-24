import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@mui/material';

import style from '../../SettingsModal.module.scss';
import { INPUT_IDS, SETTING_VALUE } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';

const DisplayBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Checkbox
          id={INPUT_IDS.showDate}
          checked={localSettings.showDate}
          onChange={handleSetSettings}
          value={SETTING_VALUE.date}
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showDate}>
          {t('Settings.ShowDate')}
        </label>
      </div>
      <div>
        <Checkbox
          id={INPUT_IDS.showCountryName}
          checked={localSettings.showCountry}
          onChange={handleSetSettings}
          value={SETTING_VALUE.country}
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showCountryName}>
          {t('Settings.ShowCountry')}
        </label>
      </div>
      <div>
        <Checkbox
          id={INPUT_IDS.showTimeZone}
          checked={localSettings.showTimezone}
          onChange={handleSetSettings}
          value={SETTING_VALUE.timezone}
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showTimeZone}>
          {t('Settings.ShowTimezone')}
        </label>
      </div>
    </>
  );
};

export default DisplayBlock;