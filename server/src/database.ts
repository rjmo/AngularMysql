import mysql from 'promise-mysql';
import keys  from './keys';
import { createPool } from "promise-mysql";


    const pool = createPool(keys.database);
    pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is  connected');

    })

export default pool;