const net = require("net");
const { mul, inc, dec } = require("./math.js");

const params = {
  host: 'localhost',
  port: 9999
}

var server = net.createServer(function(connection) {
  console.log("New connection established.");
  connection.setEncoding("utf8");
  connection.write('welcome to TCP Server!');
  
  //Ao receber dados, avalia o comando e executa a função correspondente
  connection.on('data', function(data){
    const cmd = new String(data);
    console.log(`Command: ${cmd}`);

    let result;
    
    switch(true){

      case cmd.includes('inc'):
        inc(cmd.split(' ')[1]).then((result) => {
          connection.write( result.toString() );
        });
        break;
          
      case cmd.includes('dec'):
        dec(cmd.split(' ')[1]).then((result) => {
          connection.write( result.toString() );
        });
        break;
          
      case cmd.includes('mul'):
        mul(cmd.split(' ')[1], cmd.split(' ')[2]).then((result) => {
          connection.write( result.toString() );
        });
        break;

      case true:
        connection.write("Sorry, I cann't understand you...\n");
      break;
    }
  });
  
  //Exibe mensagem de encerramento de conexão
  connection.on("end", function() {
    console.log("A connection have been closed.");
  });

  //Exibe o erro encontrado e encerra a conexão
  connection.on("error", function(error) {
    if(error.code === 'ECONNRESET'){
      connection.end();
      console.log("A connection have been closed.");
    }else{
      console.log(error);
    }
  });

  //inicializa o server
}).listen(params, () => {
  console.log('\n =====================================');
  console.log(` TCP Server running on ${params.host}:${params.port}!`);
  console.log(' =====================================\n');
});

server.on("close", function() {
  console.log("All connections have been closed.")
});

server.on('error', (error) => {
  console.log(error);
});
