// Per this: https://stackoverflow.com/questions/69871987/react-router-v6-navigate-outside-of-components
// don't judge me I know these are war crimes.
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({ window });
