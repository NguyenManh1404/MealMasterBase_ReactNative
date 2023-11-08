import {useDispatch, useSelector} from 'react-redux';
import {setAppMode} from '../redux/AppRedux';
import {APP_COLORS} from '../themes/colors';

export const useAppMode = () => {
  const dispatch = useDispatch();
  const isLightMode = useSelector(state => state.app.isLightMode);

  const onSelectAppMode = () => {
    dispatch(setAppMode(!isLightMode));
  };

  const appModeColor = {
    mainBackgroundColor: isLightMode ? APP_COLORS.white : APP_COLORS.black,
    mainColor: isLightMode ? APP_COLORS.black : APP_COLORS.white,
  };
  return {onSelectAppMode, appModeColor, isLightMode};
};
