import {connect} from 'mongoose'

 export async function startConnection(){
    await connect('mongodb://localhost/vinculacion-db', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('Database is connected')
}
