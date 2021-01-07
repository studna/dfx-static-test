import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import getOverlaysConfig from './getOverlaysConfigList';
import useStyles from '../styles';

export default (overlayType) => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const allOverlaysConfig = getOverlaysConfig({ history, classes });
  const overlayConfig = allOverlaysConfig[overlayType];
  const {
    transKeys,
    link,
    ImageComponent,
    onClickButton,
    overrideClasses,
  } = overlayConfig;

  return {
    i18n: {
      title: t(transKeys.title),
      subtitle: t(transKeys.subtitle),
      description: t(transKeys.description),
      buttonText: t(transKeys.buttonText),
      linkText: t(transKeys.goToDocs),
      chipsText: t(transKeys.chipsText),
    },
    ImageComponent,
    link,
    onClickButton,
    overrideClasses,
  };
};
