import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { billing } from '@Shared';
import useStyles from '../../sharedStyles';

const MoreSeats = ({
  totalNewMembers,
  extraSeats,
  monthlyCost,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const monthlyCostInDollars = billing.getDollarsFromCents(t, monthlyCost);

  return (
    <>
      <Typography className={classes.sectionTitle}>
        {t('members.addMember.extraSeats.title')}
      </Typography>
      <Typography className={classes.subtitle}>
        <Trans
          i18nKey="members.addMember.extraSeats.description"
          values={{
            totalNewMembers,
            extraSeats,
            monthlyCost: monthlyCostInDollars,
          }}
          components={[
            null,
            <span className={classes.boldText}>LAST_4_DIGITS</span>,
          ]}
        />
      </Typography>
    </>
  );
};

MoreSeats.propTypes = {
  totalNewMembers: PropTypes.number.isRequired,
  extraSeats: PropTypes.number.isRequired,
  monthlyCost: PropTypes.number.isRequired,
};

export default MoreSeats;
