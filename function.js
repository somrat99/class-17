/**
 * data send to Ls function
 * @param {*} key 
 * @param {*} arr 
 * @returns 
 */

function dataSend(key, arr) {
    let data = JSON.stringify(arr);
    localStorage.setItem(key, data);
    return true;
}
/**
 * get data 
 * @param {*} key 
 * @returns 
 */

function getData(key) {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : false;
}
