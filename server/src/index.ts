import app from './app';
import {startConnection} from './database'

async function main(){
    startConnection();
    await app.listen(app.get('port'));
    console.log('Server running on port', app.get('port'))
}

main();