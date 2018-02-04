const http = require('http')
const socketIO = require('socket.io')

let port = 51357
startServer()

module.exports = {
  setErrorMsg
}

function startServer () {
  const httpServer = http.createServer(serverHandler)
  httpServer.on('error', function () {
    if (port < 51357 + 10) {
      port++
      startServer()
    }
  })

  httpServer.listen(port, function (error) {
    console.info('[Info] MyErrorPlugin is on at port ' + port + '.')

    const io = socketIO(httpServer)
    let errorMsg = ''

    io.on('connection', socket => {
      setInterval(() => {
        const errorHTML = `
          <div>
            <h3 style="color: #caf1ff">出错了！</h3>
            <hr>
            <p style="color: #ff7c67">${errorMsg}</p>
          </div>
        `

        errorMsg
          ? socket.emit('onError', errorHTML)
          : socket.emit('noError', '')
      }, 2000)
    })
  })
}

function setErrorMsg (msg, from) {
  errorMsg = msg
}

function serverHandler (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.url === '/script') {
    res.writeHead(200, {
      'Content-Type': 'application/javascript; charset=utf-8'
    })

    res.write(`
      var errorHTMLNode = document.createElement('div')
      errorHTMLNode.style.display = 'none'
      errorHTMLNode.style.width = '100%'
      errorHTMLNode.style.height = '100%'
      errorHTMLNode.style.position = 'fixed'
      errorHTMLNode.style.top = 0
      errorHTMLNode.style.left = 0
      errorHTMLNode.style.padding = '20px'
      errorHTMLNode.style.backgroundColor = 'rgba(0, 0, 0, .7)'
      errorHTMLNode.style.boxSizing = 'border-box'
      errorHTMLNode.style.lineHeight = '20px'
      errorHTMLNode.style.zIndex = 50000
      document.body.appendChild(errorHTMLNode)

      var socket = io('http://localhost:${port}')
      socket.on('onError', function (errorHTML) {
        errorHTMLNode.innerHTML = errorHTML
        errorHTMLNode.style.display = 'block'
      })

      socket.on('noError', function () {
        errorHTMLNode.style.display = 'none'
      })
    `)

    res.end()
  }
}
