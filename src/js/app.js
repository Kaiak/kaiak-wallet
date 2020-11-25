import config from './config'
import TemplateLoader from './template-loader'
import AppDOM from "./AppDOM";
import Navigation from "./navigation";
import AppHistory from "./history";
import {observer} from "./store/observer";
import {store} from "./store/store";
import {HISTORY_BACK_ACTION_TYPE, SELECT_VIEW_ACTION_TYPE} from "./constants/actions";
import {BALANCE_VIEW, MENU_VIEW, RECEIVE_VIEW, SEND_ADDRESS_VIEW, SEND_VIEW, SETUP_VIEW} from "./constants/views";
import receiveView from "./views/receive";
import menuView from "./views/menu";
import balanceView from "./views/balance";
import setupView from "./views/setup";
import sendView from "./views/send/send";
import sendAddressView from "./views/send/address";

function NanoWallet(config){
    const templateLoader = new TemplateLoader();
    const dom = new AppDOM();
    const navigation = new Navigation();
    const history = new AppHistory(dom, navigation, config);

    const self = {
        init,
        render,
        templateLoader: templateLoader,
        setHeader: dom.setHeader,
        setBody: dom.setBody,
        setLeftKey: dom.setLeftKey,
        setMiddleKey: dom.setMiddleKey,
        setOptions: dom.setOptions,
        getBody: dom.getBody,
        getHeader: dom.getHeader,
        getLeftKey: dom.getLeftKey,
        getMiddleKey: dom.getMiddleKey,
        getOptions: dom.getOptions,
        navigation,
    };

    function render(state) {
        switch(state){
            case RECEIVE_VIEW:
                receiveView(self, config).then(html => {
                    app.navigation.init();
                    dom.setBody(html);
                });
                break;
            case MENU_VIEW:
                menuView(self, config).then(html => {
                    app.navigation.init();
                    dom.setBody(html)
                });
                break;
            case BALANCE_VIEW:
                balanceView(self, config).then(array => {
                    app.navigation.init();
                    dom.setBody(array[0]);
                });
                break;
            case SETUP_VIEW:
                setupView(self, config).then(html => {
                    app.navigation.init();
                    dom.setBody(html);
                });
                break;
            case SEND_VIEW:
                sendView(self, config).then(html => {
                    app.navigation.init();
                    dom.setBody(html);
                });
                break;
            case SEND_ADDRESS_VIEW:
                sendAddressView(self, config).then(html => {
                    app.navigation.init();
                    dom.setBody(html);
                });
                break;
        }
    }

    function handleKeydown(e) {
        switch (e.key) {
            case 'ArrowUp':
                if(!navigation.up()){
                    e.preventDefault();
                }
                break;
            case 'ArrowDown':
                if(!navigation.down()){
                    e.preventDefault();
                }
                break;
            case 'ArrowRight':
                if(!!navigation.targetElement){
                    store.dispatch({type: HISTORY_BACK_ACTION_TYPE});
                }else{
                    e.preventDefault();
                }
                break;
            case 'ArrowLeft':
                if(history.data().length === 0){
                    e.preventDefault();
                }else{
                    history.back();
                }
                break;
            case 'Backspace':
                store.dispatch({type: HISTORY_BACK_ACTION_TYPE});
                break;
            case 'Enter':
                let selection = store.getState().navSelection
                console.log(store.getState().navSelection);
                if(!!selection){
                    store.dispatch({ type: SELECT_VIEW_ACTION_TYPE, selection });
                }else{
                    e.preventDefault();
                }
                break;
            case 'SoftLeft':
                console.log("Soft left");
                break;
            case 'SoftRight':
                menuView(self, config).then(dom.setBody);
                break;
            case 'Shift':
                console.log("shift");
                break;
        }
    }

    function init(){
        document.activeElement.addEventListener('keydown', handleKeydown);
        const status = localStorage.getItem('wallet_status');
        observer.observe("view", render);
        store.dispatch({type: SELECT_VIEW_ACTION_TYPE, viewName: RECEIVE_VIEW});
    }

    return self;
}

let app = new NanoWallet(config);
app.init();
