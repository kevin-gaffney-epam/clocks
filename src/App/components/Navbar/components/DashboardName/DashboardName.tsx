import { ChangeEvent, useEffect, useState, FormEvent, FC } from 'react';
import { Input, IconButton, Button } from '@material-ui/core';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';

import { useQueryParams } from '../../../../hooks/useQueryParams';
import { DASHBOARD_PARAM_KEYWORD } from '../../../../lib/constants';

import styles from './DashboardName.module.scss';

export const DashboardName: FC = () => {
  const [isBeingNamed, setIsBeingNamed] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { SetParam, GetParam, DeleteParam } = useQueryParams();

  const BeingNamedHandler = () => {
    setIsBeingNamed(prev => !prev);
  };

  const ChangeNameHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newName = e.target.value;
    setName(newName);
  };

  const DeleteDashboardName = () => {
    DeleteParam(DASHBOARD_PARAM_KEYWORD);
    setName('');
  };

  const EditDashboardName = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsBeingNamed(false);
    if (!name) {
      return DeleteDashboardName();
    }
    SetParam(DASHBOARD_PARAM_KEYWORD, name);
  };

  useEffect(() => {
    const dashboardName = GetParam<string>(DASHBOARD_PARAM_KEYWORD) || '';
    setName(dashboardName);
  }, []);

  const renderContent = () => {
    const dashboardName = GetParam<string>(DASHBOARD_PARAM_KEYWORD) || '';
    if (dashboardName && !isBeingNamed) {
      return (
        <>
          <div className={styles['name-container']}>
            <Button color="inherit" onClick={BeingNamedHandler}>
              <div className={styles.name}>{name}</div>
            </Button>
            <div className={styles['icons']}>
              <IconButton data-testid="edit-icon" onClick={BeingNamedHandler}>
                <EditOutlined sx={{ color: '#fff' }} />
              </IconButton>
              <IconButton
                data-testid="delete-icon"
                onClick={DeleteDashboardName}
              >
                <DeleteOutline sx={{ color: '#fff' }} />
              </IconButton>
            </div>
          </div>
        </>
      );
    }
    if (isBeingNamed) {
      return (
        <form onSubmit={EditDashboardName} data-testid="form">
          <Input
            autoFocus
            onBlur={() => EditDashboardName()}
            className={styles['name-input']}
            value={name}
            onChange={ChangeNameHandler}
          />
        </form>
      );
    }
    return (
      <Button
        variant="outlined"
        color="inherit"
        onClick={() => setIsBeingNamed(true)}
      >
        Dashboard Name
      </Button>
    );
  };
  return <div className={styles.body}>{renderContent()}</div>;
};