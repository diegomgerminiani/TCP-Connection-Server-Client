const net = require('net');
 
const params = {
    host: 'localhost',
    port: 9999
}

async function run() {
      
    var connection = net.connect(params);
    
    connection.on('connect', (() => {
        console.log('\n ==============================================');
        console.log(` Conexão com server ${params.host}:${params.port} estabelecida.`);
        console.log(' ==============================================\n');

    }))

    connection.on('data', function(data) {
        console.log(' = ' + data);
        process.stdin.once('data', function (chunk) {
            connection.write(chunk.toString());
        });
    });
    
    connection.on('error', function() {
        console.log('Connection error');
    });

    connection.on('end', function() {
        console.log('Disconnected');
    });    
}
 
run();