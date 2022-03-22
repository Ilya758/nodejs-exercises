const container = document.querySelector('#container');
const getDataButton = document.querySelector('#pull');
getDataButton.addEventListener('click', () => {
  fetchData();
});
const sendDataButton = document.querySelector('#send');
sendDataButton.addEventListener('click', e => {
  postData(e);
});
const removeDataButton = document.querySelector('#remove');
removeDataButton.addEventListener('click', () => {
  removeAllData();
});

const removeAllData = async () => {
  await fetch('/api/delete', {
    method: 'DELETE',
  });

  await fetchData();
};

const fetchData = async () => {
  const response = await fetch('/api/users');
  console.log(response);
  const data = await response.json();
  console.log(data);
  container.innerHTML = '';
  const ul = document.createElement('ul');

  Object.values(data).forEach(obj => {
    const li = document.createElement('li');
    li.textContent = `Name - ${obj.name}, age - ${obj.age} `;
    ul.append(li);
  });
  container.append(ul);
};

const postData = async e => {
  e.preventDefault();
  const nameInput = document.querySelectorAll('input')[0];
  const ageInput = document.querySelectorAll('input')[1];

  const user = {
    name: nameInput.value,
    age: ageInput.value,
  };

  await fetch('/api/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  await fetchData();
};
