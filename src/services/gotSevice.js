export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  }

  async getAllCharacters() {
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformChracter);
  }

  async getOneCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformChracter(character);
  }
  getAllBooks() {
    return this.getResource('/books?page=5&pageSize=10');
  }

  getOneBook(id) {
    return this.getResource(`/books/${id}/`);
  }
  getAllHouses() {
    return this.getResource('/houses');
  }

  getOneHouse(id) {
    return this.getResource(`/houses/${id}/`);
  }

  _transformChracter(char) {
    return {
      name: char.name || 'undefined',
      gender: char.gender || 'undefined',
      born: char.born || 'undefined',
      died: char.died || 'undefined',
      culture: char.culture || 'undefined',
    };
  }

  _transformBook(book) {
    return {
      name: book.name,
      numberOfPage: book.numberOfPage,
      publisher: book.publisher,
      released: book.released,
    };
  }
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }
}
