import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import MailOutlinedIcon from '@material-ui/icons/MailOutlined'
import PersonIcon from '@material-ui/icons/Person'
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'

const styles = theme => ({
  action: {
    paddingTop: 0
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    padding: 16
  },
  icon: {
    marginBottom: 4,
    paddingLeft: 3
  },
  title: {
    color: 'white',
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 'bolder'
  },
  text: {
    color: 'white'
  }
})

class Adviser extends Component {
  render() {
    const {
      adviser,
      adviserOpen,
      classes,
      handleAdviser
    } = this.props

    return (
      <div>
        {!(adviser.name === 'N/A' && adviser.email === 'N/A') && (
          <Button
            aria-label='Adviser Information (opens in dialog)'
            classes={{
              root: classes.text
            }}
            onClick={handleAdviser}
          >
            Adviser
            <PersonIcon className={classes.icon} />
          </Button>
        )}
        <Dialog
          role='Dialog'
          tabIndex='0'
          aria-labelledby='modal-title'
          keepMounted
          onClose={handleAdviser}
          open={adviserOpen}
        >
          <DialogTitle className={classes.header} tabIndex='0'>
            <Typography className={classes.title} id='modal-title'>
              Adviser Information
            </Typography>
          </DialogTitle>
          <DialogContent>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <PersonOutlinedIcon />
                </ListItemAvatar>
                <ListItemText primary={adviser.name} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <MailOutlinedIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <a
                      aria-describedby='email-application'
                      href={'mailto:' + adviser.email}
                      rel='noopener noreferrer'
                      target='_blank'
                    >
                      {adviser.email}
                    </a>
                  }
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions className={classes.action}>
            <Button
              className={classes.btn}
              color='secondary'
              onClick={handleAdviser}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Adviser)