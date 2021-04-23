import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import classnames from 'classnames'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import PrefName from './PrefName'
import { update_pref_name } from '../api/api'

const styles = theme => ({
  avatar: {
    minWidth: 30
  },
  display: {
    display: 'flex'
  },
  divider: {
    margin: '0px 30px'
  },
  expand: {
    color: 'black',
    margin: '8px 5px 0px 0px',
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    padding: '0px 0px 0px 10px'
  },
  icon: {
    color: '#31708f',
    fontSize: 34, // looks large in demo but not in uPortal
    marginTop: -2,
    paddingRight: 10
  },
  info: {
    color: 'rgba(0, 0, 0, 0.64)',
    display: 'flex',
    justifyContent: 'center',
    padding: 5
  },
  item: {
    paddingRight: 16
  },
  link: {
    paddingLeft: 3,
    color: theme.palette.secondary.main
  },
  list: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 0
  },
  listItemText: {
    textAlign: 'center'
  },
  prefName: {
    padding: 0,
    textAlign: 'center'
  },
  primary: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  root: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    margin: '0px 10px'
  },
  secondaryHeading: {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: theme.typography.pxToRem(13)
  },
  title: {
    color: 'black',
    fontSize: theme.typography.pxToRem(17),
    paddingLeft: 5
  },
  typography: {
    padding: '10px 20px 10px 0px'
  }
})

class PersonalInfo extends Component {
  state = {
    inputPrefName: '',
    nameError: false,
    open: false,
    prefName: '',
    responseOK: false,
    snackbar: false
  }

  closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ snackbar: false })
  }

  handleCancel = () => {
    this.setState({
      inputPrefName: this.state.prefName,
      nameError: false,
      open: false
    })
  }

  handleChange = event => {
    // This regex is designed to only allow letters, periods, spaces, apostrophes, and dashes. 
    // [A-Za-z]+ forces the string to begin with a letter, also forcing the string to be at least one character in length.
    // The string can end in any amount of the allowed characters mentioned above.
    const regex = /^[A-Za-z]+((\s|'|-|.)[A-Za-z]*)*$/

    if (
        regex.test(event.target.value) === false ||
        event.target.value.length > 60 ||
        event.target.value.length === 0
    ) {
      this.setState({ nameError: true })
    } else {
      this.setState({
        inputPrefName: event.target.value,
        nameError: false
      })
    }
  }

  handleOK = () => {
    if (!this.state.nameError) {
      // add param 'true' on demo
      update_pref_name(this.state.inputPrefName).then(data => {

        this.setState({
          open: false,
          prefName: this.state.inputPrefName,
          responseOK: !data.response,
          snackbar: true
        })
      })
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  render() {
    const { classes, expanded, handleExpand, person, prefName } = this.props

    const { nameError, open, responseOK, snackbar } = this.state

    return (
      <div>
        <Card className={classes.root}>
          <CardHeader
            action={
              <CardActions disableSpacing>
                <IconButton
                  aria-label={
                    !expanded
                      ? 'Click to expand personal information'
                      : 'Click to close personal information'
                  }
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  onClick={handleExpand}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            }
            className={classes.header}
            classes={{
              title: classes.title
            }}
            title='Display or edit your personal information'
          />
          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <List className={classes.list}>
              <div>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    classes={{
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      person.legalName === "" ? 'N/A' : person.legalName
                    }
                    secondary='LEGAL NAME'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    classes={{
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      person.address === "" ? 'N/A' : person.address
                    }
                    secondary='ADDRESS'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    classes={{
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      person.gid === "" ? 'N/A' : person.gid
                    }
                    secondary='GRIZZLY ID'
                  />
                </ListItem>
              </div>
              <div>
                <ListItem className={classes.item}>
                  <ListItemText
                    className={classes.prefName}
                    classes={{
                      primary: classes.primary,
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      <div className={classes.display}>
                        {prefName}
                        <PrefName
                          closeSnackbar={this.closeSnackbar}
                          handleCancel={this.handleCancel}
                          handleChange={this.handleChange}
                          handleOK={this.handleOK}
                          handleOpen={this.handleOpen}
                          nameError={nameError}
                          open={open}
                          prefName={prefName}
                          responseOK={responseOK}
                          snackbar={snackbar}
                        />
                      </div>
                    }
                    secondary='PREFERRED FIRST NAME'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    classes={{
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      person.email === "" ? 'N/A' : person.email
                    }
                    secondary='EMAIL'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    className={classes.listItemText}
                    classes={{
                      secondary: classes.secondaryHeading
                    }}
                    primary={
                      person.phone === "" ? 'N/A' : person.phone
                    }
                    secondary='PHONE NUMBER'
                  />
                </ListItem>
              </div>
            </List>
            <Divider className={classes.divider} />
            <div className={classes.info}>
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar className={classes.avatar}>
                    <InfoIcon className={classes.icon} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <>
                        Don't miss out on important communications,
                        <a
                          aria-label='new-window-2'
                          className={classes.link}
                          href='https://bfinssb.oakland.edu:8443/BannerGeneralSsb/ssb/personalInformation#/personalInformationMain'
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          update your information
                        </a>
                      </>
                    }
                    secondary={
                      <Typography>
                        <strong>Note: </strong> Changes will be reflected the following day
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Collapse>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(PersonalInfo)
