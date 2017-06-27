let setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

let getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';')
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      // Clean up messy cookie values
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      // if the name in argument matches cookie name
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
  }
  return "";
}

let deleteCookie = (cname) => {
  let d = new Date();
  d.setTime(d.getTime() - (10*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = 'access_token=;path=/;' + expires
}

export {
  setCookie,
  getCookie,
  deleteCookie
}
