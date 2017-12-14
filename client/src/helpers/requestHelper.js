class RequestHelper {
  constructor(){}

  makeGetRequest(url, callback){
    const request = new XMLHttpRequest()
    request.open('GET', url)
    request.addEventListener('load', function () {
      if (request.status !== 200) return
      const jsonString = request.responseText
      const resultsObject = JSON.parse(jsonString)
      callback(resultsObject)
    })
    request.send()
  }
}

export default RequestHelper