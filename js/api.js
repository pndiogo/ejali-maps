// ==========================================================================
// DATABASE URL
// ==========================================================================

const DB_STORAGE_URL = "https://curva.net/pndiogo/serverdb/serverdb.php";


// ==========================================================================
// POST FUNCTION
// ==========================================================================

function post(url, params, parseJSON = false) {

  let string = '';

  for(key in params) {
    if (string.length > 0) {
        string += '&';
    }
    string += key + '=' + params[key];
  }

  console.log(string)

  return fetch(url, {
    method:'POST',
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: string
  }).then(res => {
    if (parseJSON) {
      return res.json();
    } else {
      return res.text();
    }
  });
}  


// ==========================================================================
// DATABASE INIT
// ==========================================================================

let dbName = '';

function dbStorageInit (db) {
  dbName = db;
}


// ==========================================================================
// FUNCTIONS
// ==========================================================================

/*
get count records starting in offset. Params offset and count are optional and all records are returned if you pass '' on each.
failFunc is optional.
*/

function dbStorageGet(offset, count){
    return post(DB_STORAGE_URL, { 'db': dbName, 'op': 'get', 'offset': offset, 'count': count }, true);
}

/*
add or set a record. Pass id=-1 to add. Returns id of created record.
failFunc is optional.
*/
function dbStorageSet(id, text){
    return post(DB_STORAGE_URL, { 'db': dbName, 'op': 'set', 'id': id, 'text': text });
}

/*
del a record by its id
failFunc is optional.
*/
function dbStorageDel(id){
    return post(DB_STORAGE_URL, { 'db': dbName, 'op': 'del', 'id': id });
}

/*
get total record count
failFunc is optional.
*/
function dbStorageCount(){
    return post(DB_STORAGE_URL, { 'db': dbName, 'op': 'cnt'});
}