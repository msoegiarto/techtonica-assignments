const I_LOVE = require('../config.js');
console.log(I_LOVE);

const getData = () => {
  const apiPath = `https://api.jikan.moe/v3/anime/138/characters_staff`;
  $.ajax({
    url: `${apiPath}`,
    method: "GET",
    dataType: "json"
  }).done(function (response) {

    const charactersArray = [];
    charactersArray.push(response.characters[0]); // Gon
    charactersArray.push(response.characters[2]); // Killua
    charactersArray.push(response.characters[12]); // Kurapika
    charactersArray.push(response.characters[20]); // Leorio
    charactersArray.push(response.characters[1]); // Biscuit
    charactersArray.push(response.characters[14]); // Chrollo
    charactersArray.push(response.characters[16]); // Hisoka
    createCard(charactersArray);
  });
}

const createCard = (charactersArray) => {

  let cardDeck = getNewCardDeck();

  charactersArray.forEach((character, index, charactersArray) => {
    const cardBody = getCardBody(character);
    cardDeck.append(cardBody);

    if ((index + 1) % 4 === 0) {
      $('.container').append(cardDeck);
      cardDeck = getNewCardDeck();
    } else if (index === charactersArray.length - 1){
      $('.container').append(cardDeck);
    }
  });

}

const getNewCardDeck = () => {
  return $('<div></div>').addClass('card-deck mb-3 text-center');
}

const getCardBody = character => {
  const nameArray = character.name.split(/,\s?/);
  const html = `
  <div class="card mb-4 shadow-sm">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">${nameArray.length > 1 ? nameArray[1] : nameArray[0]}</h4>
    </div>
    <div class="card-body">
      <img src="${character.image_url}" />
    </div>
  </div>`
  return html;
}
