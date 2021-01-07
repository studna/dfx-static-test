import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useTranslation, Trans } from 'react-i18next';
import classnames from 'classnames';
import StepBase from '@Shared/StepBase';
import Typography from '@material-ui/core/Typography';
import GenericButton from '@terminal-packages/ui/core/Buttons/GenericButton';
import { billing } from '@Shared/utils';
import { PLANS_CUSTOM_LIMIT } from '~/constants';
import useStyles from './styles';
import getI18n from './i18n';

const isFreePlan = (plan) => plan.priceMonthly === 0;

const PickPlan = ({
  onClickPlan,
  currentPlan,
  plans,
  supportEmail,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const i18n = getI18n(t);
  const showContent = currentPlan.id && plans.length > 0;

  const handleOnClickPlan = (plan) => {
    onClickPlan({ plan });
  };

  const getButtonText = (isCurrentPlan, isNeededSalesContact) => {
    if (isCurrentPlan) return i18n.plans.currentPlan;
    return isNeededSalesContact ? i18n.plans.contactSales : i18n.plans.pickPlan;
  };

  const getPrice = (plan) => {
    const montlyPriceCents = get(plan, 'priceMonthly', 0);
    const filteredValue = billing.getUnlimitedOrValue(t, montlyPriceCents);

    if (filteredValue.wasConverted) {
      return filteredValue.value;
    }
    const priceInDollars = billing.getDollarsFromCents(t, filteredValue.value);

    return i18n.plans.perMonth(priceInDollars);
  };

  const getContactUs = () => {
    if (isFreePlan(currentPlan)) {
      return null;
    }

    const freePlan = plans.find(isFreePlan);

    return (
      <Typography className={classes.contactUs}>
        <Trans
          i18nKey="billing.changePlan.pickPlan.plans.contactUs"
          values={{
            supportEmail,
            startPlan: freePlan.name,
          }}
          components={[
            null,
            <a
              href={`mailto:${supportEmail}`}
              className={classes.emailLink}
            >
              EMAIL
            </a>,
          ]}
        />
      </Typography>
    );
  };

  const getChoosePlanButton = (buttonText, isCurrentPlan, onClick) => (
    <GenericButton
      disabled={isCurrentPlan}
      onClick={onClick}
      overrideClass={{
        button: classnames(classes.defaultButton, {
          [classes.disabledButton]: isCurrentPlan,
          [classes.pickPlanButton]: !isCurrentPlan && onClick,
        }),
      }}
      buttonVariant="secondary"
    >
      {buttonText}
    </GenericButton>
  );

  return (
    <StepBase
      title={i18n.title}
      subtitle={i18n.subtitle}
    >
      <div className={classes.wrapper}>
        {
          showContent && plans.map((plan) => {
            const isCurrentPlan = currentPlan.id === plan.id;
            const isNeededSalesContact = plan.priceMonthly === PLANS_CUSTOM_LIMIT;
            const buttonText = getButtonText(isCurrentPlan, isNeededSalesContact);

            if (isFreePlan(plan)) {
              return null;
            }

            return (
              <div className={classes.container} key={plan.id}>
                <div className={classes.textContainer}>
                  <Typography variant="body2" className={classes.title}>
                    {i18n.plans.title({
                      name: plan.name,
                      price: getPrice(plan),
                    })}
                  </Typography>
                  <Typography variant="body2" className={classes.subtitle}>
                    {plan.description}
                  </Typography>
                </div>
                {isNeededSalesContact ? (
                  <a
                    href="https://fleek.co/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.resetAnchorStyles}
                  >
                    {getChoosePlanButton(buttonText, isCurrentPlan)}
                  </a>
                ) : getChoosePlanButton(
                  buttonText,
                  isCurrentPlan,
                  () => handleOnClickPlan(plan),
                )}
              </div>
            );
          })
        }
        {showContent && getContactUs()}
      </div>
    </StepBase>
  );
};

PickPlan.defaultProps = {
  onClickPlan: () => {},
};

PickPlan.propTypes = {
  onClickPlan: PropTypes.func,
  plans: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    priceMonthly: PropTypes.number.isRequired,
  })).isRequired,
  currentPlan: PropTypes.shape({
    id: PropTypes.string.isRequired,
    priceMonthly: PropTypes.number.isRequired,
  }).isRequired,
  supportEmail: PropTypes.string.isRequired,
};

export default PickPlan;
