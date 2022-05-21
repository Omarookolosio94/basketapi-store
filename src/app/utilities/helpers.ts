export function displayNotification(
  msg: string = 'Request processed successfully',
  type: string = 'success'
) {
  var alert: any = document.getElementById('alert-box');
  var alertMsg: any = document.getElementById('alert-msg');

  alertMsg.innerHTML = msg;

  alert.classList.remove('danger');
  alert.classList.add('success');

  alert.classList.add(`${type}`);
  alert.classList.add('show');

  setTimeout(() => {
    alert.classList.remove(`show`);

    return;
  }, 4000);

  return;
}

export function isEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
}
