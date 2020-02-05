import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if(__DEV__) {
    const tron = Reactotron
                .configure({ host: '192.168.30.238' })
                .useReactNative()
                .use(reactotronRedux())
                .use(reactotronSaga())
                .connect();

    console.tron = tron;

    tron.clear(); //limpa a timeline sempre que é dado um refresh na aplicação
}