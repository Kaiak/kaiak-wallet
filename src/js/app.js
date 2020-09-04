function NanoWallet(config){
    const templateLoader = new TemplateLoader();
    const dom = new AppDOM();
    const navigation = new Navigation();
    const history = new AppHistory(dom, navigation, config);

    const self = {
        init,
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

    function renderPage(html){
        return new Promise((resolve, reject) => {
            const observer = new MutationObserver(function(mutations) {
                if (!!body.children.length) {
                    resolve();
                    observer.disconnect();
                }else{
                    reject()
                }
            });
            observer.observe(body, {attributes: false, childList: true, characterData: false, subtree:false});
            body.innerHTML = html;
        });
    }

    function render() {
        switch(store.getState().view){
            case RECEIVE_VIEW:
                receiveView(self, config).then(dom.setBody);
                break;
            case MENU_VIEW:
                menuView(self, config).then(dom.setBody);
                break;
            case BALANCE_VIEW:
                balanceView(self, config).then(array => {dom.setBody(array[0]);});
                break;
            case SETUP_VIEW:
                setupView(self, config).then(dom.setBody);
                break;
            case SEND_VIEW:
                sendView(self, config).then(dom.setBody);
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
                    loadView(navigation.targetElement.dataset.key);
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
                console.log("Backspace");
                if(history.data().length === 0){
                    e.preventDefault();
                }else{
                    history.back();
                }
                break;
            case 'Enter':
                let selection = store.getState().navSelection
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
                loadView(MENU);
                break;
            case 'Shift':
                console.log("shift");
                break;
        }
    }

    function init(){
        document.activeElement.addEventListener('keydown', handleKeydown);
        const status = localStorage.getItem('wallet_status');
        store.subscribe(render);
        store.dispatch({type: SELECT_VIEW_ACTION_TYPE, viewName: RECEIVE_VIEW});
    }

    return self;
}

let app = new NanoWallet(config);
app.init();