const zero_div = document.querySelector('#zero');
const one_div = document.querySelector('#one');
const two_div = document.querySelector('#two');
const three_div = document.querySelector('#three');
const maxresdefault_div = document.querySelector('#maxresdefault');
const sddefault_div = document.querySelector('#sddefault');
const hqdefault_div = document.querySelector('#hqdefault');
const mqdefault_div = document.querySelector('#mqdefault');
const default_div = document.querySelector('#default');

function onClick(e) {
  const value = e.previousElementSibling.value;
  if (value !== '') {
    setImageUrl(value);
  } else {
    alert("동영상 주소를 입력하세요");
  }
}

function setImageUrl(url) {
  const urlSplit = url.split('?v=');

  appendZero(urlSplit[1], zero_div);
  appendOne(urlSplit[1], one_div);
  appendTwo(urlSplit[1], two_div);
  appendThree(urlSplit[1], three_div);
  appendMaxresdefault(urlSplit[1], maxresdefault_div);
  appendSddefault(urlSplit[1], sddefault_div);
  appendHqdefault(urlSplit[1], hqdefault_div);
  appendMqdefault(urlSplit[1], mqdefault_div);
  appendDefault(urlSplit[1], default_div);
}

function removeChild(el) {
  while (el.firstChild) {
    el.removeChild(el.firstElementChild);
  }
}

function appendItem(element, url, title) {
  const divElement = document.createElement('div');
  divElement.textContent = title;

  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', url);
  
  element.append(divElement);
  element.append(imgElement);
}

function appendZero(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/0.jpg`;
  const title = '동영상 배경 썸네일(480x360) : 0.jpg';
  
  appendItem(element, url, title);
}

function appendOne(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/1.jpg`;
  const title = '동영상 시작지점 썸네일(120x90) : 1.jpg';
  
  appendItem(element, url, title);
}

function appendTwo(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/2.jpg`;
  const title = '동영상 중간지점 썸네일(120x90) : 2.jpg';
  
  appendItem(element, url, title);
}

function appendThree(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/3.jpg`;
  const title = '동영상 끝지점 썸네일(120x90) : 3.jpg';
  
  appendItem(element, url, title);
}

function appendMaxresdefault(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/maxresdefault.jpg`;
  const title = '고해상도 썸네일(1280x720, 1920x1080) : maxresdefault.jpg';
  
  appendItem(element, url, title);
}

function appendSddefault(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/sddefault.jpg`;
  const title = '중간해상도 썸네일(640x480) : sddefault.jpg';
  
  appendItem(element, url, title);
}

function appendHqdefault(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/hqdefault.jpg`;
  const title = '고품질 썸네일(480x360) : hqdefault.jpg';
  
  appendItem(element, url, title);
}

function appendMqdefault(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/mqdefault.jpg`;
  const title = '중간품질 썸네일(320x180) : mqdefault.jpg';
  
  appendItem(element, url, title);
}

function appendDefault(vId, element) {
  removeChild(element);

  const url = `http://img.youtube.com/vi/${vId}/default.jpg`;
  const title = '보통품질 썸네일(120x90) : default.jpg';
  
  appendItem(element, url, title);
}