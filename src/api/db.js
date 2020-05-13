import * as tcb from 'tcb-js-sdk';

const app = tcb.init({
    env: 'qrbtf-1d845d'
});
const auth = app.auth();

async function login() {
    // await auth.signInAnonymously();
    // const loginState = await auth.getLoginState();
}

login();

const db = app.database();
const _ = db.command

export function increaseDownloadData(value) {
    db.collection('QRCounter').where({
        value: _.eq(value)
    }).get().then(res => {
        if (res.data.length > 0) {
            db.collection('QRCounter').where({
                value: _.eq(value)
            }).update({
                count: _.inc(1),
                date: new Date().toString()
            }).then(res => {
            })
        }
        else {
            db.collection('QRCounter').add({
                value: value,
                count: 1,
                date: new Date().toString()
            }).then(res => {
            })
        }
    })
}

export function recordDownloadDetail({text, value, type, params, history}) {
    db.collection('QRDownloadData').add({
        date: new Date().toString(),
        text: text,
        value: value,
        type: type,
        params: params,
        history: history
    }).then(res => {
    })
}
