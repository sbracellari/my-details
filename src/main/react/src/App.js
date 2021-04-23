import React, { Component } from 'react'

import AcademicInfo from './components/AcademicInfo'
import Adviser from './components/Adviser'
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from './components/ErrorPage'
import PersonalInfo from './components/PersonalInfo'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { get_details } from './api/api.js'

const styles = theme => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.5em',
    marginTop: '4em' 
  },
  second: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0px 10px',
    padding: '0px 10px',
    height: 50,
    alignItems: 'center'
  }
})

class App extends Component {
  state={
    adviser: [],
    adviserOpen: false,
    curriculums: [],
    error: false,
    expanded: false,
    loading: true,
    person: [],
    width: window.innerWidth
  }
 
  componentDidMount() {
    // change to 'true' on demo
    get_details(false).then(details => {

      if (details.person === null 
          || details.person.length === 0
          || details.person === undefined) {
        this.setState({ error: true })
      }

      window.addEventListener('resize', this.handleResize)

      this.setState({
        adviser: details.student.adviser,
        curriculums: details.student.curriculums,
        inputPrefName: details.person.prefName,
        loading: false,
        person: details.person,
        prefName: details.person.prefName
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleAdviser = () => {
    this.setState(state => ({ adviserOpen: !state.adviserOpen }))
  }

  handleExpand = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  handleResize = e => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { classes } = this.props
    const {
      adviser,
      adviserOpen,
      curriculums,
      error,
      expanded,
      loading,
      person,
      prefName,
      width
    } = this.state

    if (error) {
      return <ErrorPage />
    } else if (loading === true) {
      return (
        <div className={classes.loading}>
          <CircularProgress 
            color="secondary" 
            size={50} 
          />
        </div>
      )
    }

    return (
      <div>
        <div className={classes.second}>
          <Typography>{`Welcome, ${prefName}!`}</Typography>
          <Adviser
            adviser={adviser}
            adviserOpen={adviserOpen}
            handleAdviser={this.handleAdviser}
          />
        </div>
        {curriculums.length !== 0 &&
          <AcademicInfo
            curriculums={curriculums}
            width={width}
          />
        }
        <PersonalInfo
          expanded={expanded}
          handleChange={this.handleChange}
          handleExpand={this.handleExpand}
          person={person} 
          prefName={prefName}
        />
      </div>
    )
  }
}

export default withStyles(styles)(App)
