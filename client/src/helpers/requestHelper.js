class RequestHelper {
  constructor(){}

  makeGetRequest(url, callback){
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.addEventListener('load', () => {
      if (request.status !== 200) return
      const jsonString = request.responseText
      const resultsObject = JSON.parse(jsonString)
      callback(resultsObject)
    })
    request.send()
  }

// https://github.com/mdn/js-examples/blob/master/promises-test/index.html
  makePromiseGetRequest(url){
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest()
      request.open('GET', url)
      request.addEventListener('load', () => {
        if (request.status !== 200) {
          reject(Error('Error, code: ' + request.statusText))
        } else {
          const jsonString = request.responseText
          const resultsObject = JSON.parse(jsonString)
          resolve(resultsObject)
        }
      })
      request.onerror = () => {
        reject(Error('There was a network error.'))
      }
      request.send()
    }) 
  }

}

export default RequestHelper