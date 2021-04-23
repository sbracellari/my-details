import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

const styles = theme => ({
  btn: {
    margin: 10
  },
  content: {
    display: 'flex',
    justifyContent: 'center'
  },
  desc: {
    color: '#767676'
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: 16
  },
  icon: {
    padding: 5,
    margin: '-8px 0px 2px 0px'
  },
  item: {
    paddingTop: 0
  },
  list: {
    paddingLeft: 30
  },
  note: {
    paddingTop: 10
  },
  root: {
    display: 'flex'
  },
  text: {
    margin: 10,
    width: 425
  },
  title: {
    color: 'white',
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 'bolder'
  },
  tooltip: {
    fontSize: theme.typography.pxToRem(11)
  }
})

class PrefName extends Component {
  render() {
    const {
      classes,
      closeSnackbar,
      handleCancel,
      handleChange,
      handleOK,
      handleOpen,
      nameError,
      open,
      prefName,
      responseOK,
      snackbar
    } = this.props

    return (
      <div className={classes.root}>
        <Tooltip
          classes={{
            tooltip: classes.tooltip
          }}
          placement='right'
          title='Change preferred first name'
        >
          <IconButton
            href='https://bfinssb.oakland.edu:8443/BannerGeneralSsb/ssb/personalInformation#/personalInformationMain'
            target='_blank'
            className={classes.icon}
            color='secondary'
          >
            <EditIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <div>
          <Dialog
            aria-label='Change Preferred First Name'
            id='change-pref-name-dialog'
            onClose={handleCancel}
            open={open}
            role='dialog'
            tabIndex='0'
          >
            <DialogTitle className={classes.header} tabIndex='0'>
              <Typography className={classes.title}>
                Change Preferred First Name?
              </Typography>
            </DialogTitle>
            <DialogContent>
              <div className={classes.content}>
                <TextField
                  className={classes.text}
                  color='secondary'
                  defaultValue={
                    prefName == null ? 'N/A' : prefName
                  }
                  error={nameError}
                  helperText={
                    nameError
                      ? 'Your preferred name is either too long, too short, or has invalid characters. Please try again.'
                      : ' '
                  }
                  label='Preferred first name'
                  onChange={handleChange}
                  variant='outlined'
                />
              </div>
              <div className={classes.desc}>
                <Typography>
                  Your preferred first name is the name that you commonly use
                  that is different from your legal first name. Some examples of
                  this are:
                </Typography>
                <List className={classes.list}>
                  <ListItem>
                    <ListItemText primary='Mike instead of Michael' />
                  </ListItem>
                  <ListItem className={classes.item}>
                    <ListItemText primary='J.T. instead of Justin Tyler' />
                  </ListItem>
                </List>
                <Typography>
                  Once you change your preferred first name, please allow a few
                  business days for your name to fully propagate across Oakland
                  University's systems.
                </Typography>
                <Typography className={classes.note}>
                  <strong>Note: </strong> Systems that require the use of your
                  legal first name will not be updated.
                </Typography>
              </div>
            </DialogContent>
            <DialogActions className={classes.item}>
              <Button
                aria-label={
                  nameError
                    ? 'OK. You cannot submit your preferred first name if it has errors'
                    : 'OK'
                }
                className={classes.btn}
                color='secondary'
                onClick={handleOK}
              >
                OK
              </Button>
              <Button
                className={classes.btn}
                color='secondary'
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            autoHideDuration={6000}
            message={
              responseOK 
                ? "Your preferred first name is being processed."
                : "Your preferred first name could not be processed at this time."
            }
            onClose={closeSnackbar}
            open={snackbar}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PrefName)
