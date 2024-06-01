import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorsList = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    currentList: [],
    website: '',
    username: '',
    password: '',
    checkedStatus: false,
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onAddingNewPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const randomColor =
        colorsList[Math.floor(Math.random() * colorsList.length)]
      const newItem = {
        id: uuidv4(),
        websiteInput: website,
        userNameInput: username,
        passwordInput: password,
        randomColorInput: randomColor,
      }
      this.setState(prevState => ({
        currentList: [...prevState.currentList, newItem],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  getListAfterDeletingAnItem = id => {
    const {currentList} = this.state
    const listAfterDeletingAnItem = currentList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({currentList: listAfterDeletingAnItem})
  }

  onChangingCheckBoxInput = event => {
    const checkBoxStatus = event.target.checked
    if (checkBoxStatus) {
      this.setState({checkedStatus: true})
    } else {
      this.setState({checkedStatus: false})
    }
  }

  onChangeSearchInput = event => {
    const lowerCaseSearchInput = event.target.value.toLowerCase()
    this.setState({searchInput: lowerCaseSearchInput})
  }

  render() {
    const {
      currentList,
      checkedStatus,
      searchInput,
      website,
      username,
      password,
    } = this.state
    const currentListCount = currentList.length
    const searchResults = currentList.filter(eachInput =>
      eachInput.websiteInput.toLowerCase().includes(searchInput),
    )
    const searchResultsLength = searchResults.length
    let passwordsContainerContent
    if (currentListCount === 0 || searchResultsLength === 0) {
      passwordsContainerContent = (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            className="no-passwords-img"
            alt="no passwords"
          />
          <p className="no-passwords-txt">No Passwords</p>
        </div>
      )
    } else {
      passwordsContainerContent = (
        <ul className="ul-container">
          {searchResults.map(eachItem => (
            <PasswordItem
              eachItem={eachItem}
              checkedStatus={checkedStatus}
              getListAfterDeletingAnItem={this.getListAfterDeletingAnItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      )
    }
    return (
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        <div className="password-input-img-container">
          <div className="password-input-container">
            <h1 className="add-password-heading">Add New Password</h1>
            <form
              className="form-container"
              onSubmit={this.onAddingNewPassword}
            >
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="wup-img"
                    alt="website"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                  value={website}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    className="wup-img"
                    alt="username"
                  />
                </div>
                <input
                  type="text"
                  className="input-element"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                  value={username}
                />
              </div>
              <div className="input-container">
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="wup-img"
                    alt="password"
                  />
                </div>
                <input
                  type="password"
                  className="input-element"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                  value={password}
                />
              </div>
              <div className="add-button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager-img"
            alt="password manager"
          />
        </div>
        <div className="your-passwords-container">
          <div className="heading-search-input-container">
            <div className="password-heading-count-container">
              <h1 className="your-passwords-heading">Your Passwords</h1>
              <p className="passwords-count">{searchResultsLength}</p>
            </div>
            <div className="input-container">
              <div className="search-img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  className="search-icon"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="search-input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-text-container">
            <input
              id="checkbox"
              type="checkbox"
              className="checkbox-input"
              onChange={this.onChangingCheckBoxInput}
              value={checkedStatus}
            />
            <label htmlFor="checkbox" className="show-passwords-txt">
              Show Passwords
            </label>
          </div>
          {passwordsContainerContent}
        </div>
      </div>
    )
  }
}

export default PasswordManager
