export default class GotService {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource('/characters?page=5&pageSize=10');
    return res.map(this._transformChracter);
  };

  getOneCharacter = async (id) => {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformChracter(character);
  };
  getAllBooks = async () => {
    const res = await this.getResource('/books/');
    return res.map(this._transformBook);
  };

  getOneBook = async (id) => {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
  };
  getAllHouses = async () => {
    const res = await this.getResource('/houses');
    return res.map(this._transformHouse);
  };

  getOneHouse = async (id) => {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(house);
  };

  _transformChracter(char) {
    // const l = 'https://www.anapioficeandfire.com/api/characters/';
    // const k = l.length;
    // console.log(k);
    return {
      name: char.name || 'undefined',
      gender: char.gender || 'undefined',
      born: char.born || 'undefined',
      died: char.died || 'undefined',
      culture: char.culture || 'undefined',
      id: +char.url.slice(49) || 'undefined',
    };
  }

  _transformBook(book) {
    return {
      name: book.name || 'undefined',
      authors: book.authors || 'undefined',
      numberOfPages: book.numberOfPages || 'undefined',
      publisher: book.publisher || 'undefined',
      released: book.released || 'undefined',
      id: book.url.slice(44),
    };
  }
  _transformHouse(house) {
    return {
      name: house.name || 'undefined',
      region: house.region || 'undefined',
      words: house.words || 'undefined',
      titles: house.titles || 'undefined',
      overlord: house.overlord || 'undefined',
      ancestralWeapons: house.ancestralWeapons || 'undefined',
      id: house.url.slice(45),
    };
  }
}

// let h = 'https://www.anapioficeandfire.com/api/houses/';
// console.log(h.length);
// let b = 'https://www.anapioficeandfire.com/api/books/';
// console.log(b.length);
// let c = 'https://www.anapioficeandfire.com/api/characters/';
// console.log(c.length);
