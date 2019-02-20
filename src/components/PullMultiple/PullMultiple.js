import React, { Component } from 'react'
import DataGatherer from "../DataGatherer"


class PullMultiple extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rawOracles: 'User1, User2, User3, User4, User5, User6',
      unprocessedOracles: ["User1", "User2", "User3", "User4", "User5", "User6"],
      processedOracles: [],
      myGener: '',
      disabledInput: false
    }
  }

  componentWillMount() {
    this.initiateGenerator()
  }


  initiateGenerator = () => {
    this.setState({
      myGener: this.myGen()
    })
  }


  // Simple input handler, with a twist
  handleInputChange = event => {

    let { name, value } = event.target

    // Only special thing here, splitting and cleaning inputs, see splitOracles()
    let unprocessedOracles = this.splitOracles(value)

    this.setState({
      [name]: value,
      unprocessedOracles
    })

  }


  // 1. Split string of user inputs into array by comma's
  // 2. Map Array and parse strings into Int's
  // 3. Filter Array to remove null values
  // splitOracles = val => val.split(",").map(ind => parseInt(ind)).filter(x => x)
  splitOracles = val => val.split(",") // Demo

  startCycle = () => {

    // Catch case where go is hit when input is empty
    if (!this.state.rawOracles) { return null }

    // Trigger user input to disabled
    this.toggleInputDisabled()
    // Begin generator cycle
    this.triggerGenerator()

  }


  myGen = function* () {

    // Generator function in order to render one user ID at a time. 
    // When a user ID finishes processing it will trigger the next iteration
    for (let i in this.state.unprocessedOracles) {
      // Does not mutate state array directly
      let unpro = [...this.state.unprocessedOracles]
      let pro = [...this.state.processedOracles]
      // Adds unprocessed ID to list to be processed
      pro.push(unpro[i])
      // Update state
      this.setState({
        processedOracles: pro
      })
      // Yields before beginning next loop
      yield i
    }

  }


  triggerGenerator = () => {

    // Signalling the generator to continue cycling through array. Will be passed as prop to DataGatherer
    this.state.myGener.next()

  }

  // Self explanatory
  toggleInputDisabled = () => {
    this.setState(prevState => ({
      disabledInput: !prevState.disabledInput
    }));
  }


  // This will be used to reset the app back to norm
  clearComponentData = () => {

    this.setState({
      rawOracles: 'User1, User2, User3, User4, User5, User6',
      unprocessedOracles: ["User1", "User2", "User3", "User4", "User5", "User6"],
      processedOracles: [],
      myGener: '',
      disabledInput: false
    },
      // Using this as a callback to ensure state has been cleared
      () => this.initiateGenerator()
    )

  }


  render() {

    return (
      <div>

        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Business Readout Assistant</span>
        </nav>

        <div className="container">

          <div className='card'>

            <div className="card-body">

              <h5 className="card-title">Start Here</h5>

              <div className="row">
                <div className="col-md-6">

                  <textarea
                    className="form-control"
                    rows="3"
                    name="rawOracles"
                    disabled={true} // Demo
                    value={this.state.rawOracles}
                    onChange={this.handleInputChange}
                  />

                  <br />

                  <p className="card-text">

                    <button
                      className="btn btn-primary"
                      disabled={this.state.disabledInput}
                      onClick={this.startCycle}
                    >
                      Go!
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={this.clearComponentData}
                    >
                      Reset
                    </button>
                  </p>

                </div>

                <div className="col-md-6">

                  <h5 className="card-title">Demo Mode</h5>

                  <p>This demo will demonstrate synchronous handling of multiple asynchronos API calls.</p>

                </div>

              </div>

            </div>

          </div>

          <div className="row">

            {this.state.processedOracles.map((oracle, i) => (
              <DataGatherer
                key={i}
                index={i}
                title={oracle}
                oracle={oracle}
                trigger={this.triggerGenerator}
              />
            ))}

          </div>

        </div>

      </div>

    )
  }
}

export default PullMultiple
