import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createAppContainer(
    createSwitchNavigator({ //troca de telas sem efeitos visuais
        SignIn,
        SignUp
    })
);