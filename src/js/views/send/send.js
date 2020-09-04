function sendView(app, config){
    const templateLoader = app.templateLoader;

    app.setHeader('Select the way to send');

    const elements = [
        {
            primaryText: "Send by QR code",
            type: "primary",
            data: { key: "send_qr" }
        },
        {
            primaryText: "Send by address",
            type: "primary",
            data: { key: "send_address" }
        }
    ];
    return list(app.templateLoader, {elements});
}