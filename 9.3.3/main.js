function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };
  
  
  const resultNode = document.querySelector('.results');
  const btnNode = document.querySelector('.btn');
  const inputNode = document.querySelector('.input');
  
  function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
      const cardBlock = 
      `<img src="${item.download_url}"/> <p>${item.author}</p>`;
      cards = cards + cardBlock;
    });  

    resultNode.innerHTML = cards;
  }



  
  btnNode.addEventListener('click', () => {
     let value = document.querySelector('input').value;
      if (value < 1 || value > 10) {

          resultNode.innerHTML = "<p>Введён не корректный запрос.</p>";
      } else {
        useRequest(`https://picsum.photos/v2/list?limit=${value}`, displayResult);
      }
  })