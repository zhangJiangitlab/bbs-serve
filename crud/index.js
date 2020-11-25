const mysql = require('mysql');
let query;
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blogSystem'
})
query = (sql, values, callback) => {
    //连接池建立链接
    pool.getConnection((err, connection) => {
        if (err) throw new Error(`连接失败：${err}`);
        connection.query(sql, values, (err, data) => {
            if (err) throw new Error(`sql语句失败：${err}`);
            //释放连接
            pool.releaseConnection(connection);

            //回调函数
            callback && callback(data);
        })
    })
}
module.exports = query
