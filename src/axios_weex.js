var stream = weex.requireModule('stream');
import isJson from './is_json';


function weexFetch(method, url, body, type, headers = {}){
  let params = Object.assign({
    method: 'GET',
    type: 'json',
    headers:{}
  },{
    methods,url,type,body,headers
  });
  return new Promise(function(resolve,reject){
    stream.fetch(params, response => {
      if(response.ok){
        resolve(response);
      }else{
        reject(response);
      }
    });
  });
}

export default {
  /**
   * get method
   * @param {String} url required
   * @param {Object} headers default {}
   */
  get(url, headers = {}){
    return weexFetch('GET', url, null, 'json',headers);
  },
  /**
   * post data by form
   * @param {String} url required
   * @param {Object} data 
   * @param {String} type default 'json'
   * @param {Object} headers default {}
   */
  post(url, data = {}, headers = {}){
    let body = '';
    if(typeof data === 'string'){
      body = data;
    }else{
      body = isJson(data) ? null: JSON.stringify(data);
    }
    return weexFetch('POST', url, body, 'json', headers);
  },
  /**
   * 
   * @param {String} url 
   * @param {Object} data 
   * @param {Object} headers 
   */
  postJSON(url, data = {}, headers = {}){
    let body = isJson(data) ? null: JSON.stringify(data);
    return weexFetch('POST', url, body, type, Object.assign(headers, {'Content-Type': 'application/json'}));
  }
};