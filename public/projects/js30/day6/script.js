const ENDPOINT =
  'https://gist.githubusercontent.com/alt-xafiro/1d16b5dea9334c93567d878272a31941/raw/84e33951a26335b1a8509525ddfa99b4f8a83576/cities.json';

class CitySearch {
  constructor() {
    this._cities = [];
    this._filteredCities = [];

    this._suggestionsNode = document.querySelector('.suggestions');
    this._searchInputNode = document.querySelector('.search');
    this._searchInputNode.disabled = true;

    this._searchValue = '';
  }

  _setCities(cities) {
    this._cities = [...cities];
    this._filteredCities = [...cities];
  }

  _setSearchValue(searchValue = '') {
    let clearedSearchValue = searchValue.trim().toLowerCase();

    if (this._searchValue === clearedSearchValue) return;

    this._searchValue = clearedSearchValue;
    this._filterCities();
  }

  _filterCities() {
    this._filteredCities = this._searchValue
      ? this._cities.filter(({ city, state }) =>
          `${city} ${state}`.toLowerCase().includes(this._searchValue)
        )
      : [...this._cities];

    this._render();
  }

  _getCityTemplate({ city, state, population }) {
    let name = `${city}, ${state}`;

    if (this._searchValue !== '') {
      name = name.replace(
        new RegExp(this._searchValue, 'ig'),
        `<span class="hl">$&</span>`
      );
    }

    const formattedPopulation = population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `<li>
        <span class="name">${name}</span>
        <span class="population">${formattedPopulation}</span>
      </li>`;
  }

  _render() {
    let resultHTML = '';

    this._filteredCities.forEach(
      (city) => (resultHTML += this._getCityTemplate(city))
    );

    this._suggestionsNode.innerHTML = resultHTML;
  }

  _handleSearchInput = (evt) => {
    evt.preventDefault();

    this._setSearchValue(evt.target.value);
  };

  _addEventListener() {
    this._searchInputNode.addEventListener('input', this._handleSearchInput);
  }

  async _fetchData() {
    await fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data) => this._setCities(data));
  }

  async start() {
    this._addEventListener();
    await this._fetchData();
    this._searchInputNode.disabled = false;
  }
}

const citySearch = new CitySearch();

citySearch.start();
