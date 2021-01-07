import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

import { MEMBER_STATUSES } from '../../constants';

const MemberStatus = ({
  role,
  status,
}) => {
  const { t } = useTranslation();
  const classes = useStyles({ status });

  return (
    <div className={classes.memberStatus}>
      <p>
        {
          status === MEMBER_STATUSES.pending ? t('members.invited') : t(`members.roles.${role}`)
        }
      </p>
      <p>{t('members.allSites')}</p>
    </div>
  );
};

MemberStatus.propTypes = {
  role: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default MemberStatus;
