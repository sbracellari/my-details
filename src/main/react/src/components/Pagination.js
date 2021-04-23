import React, { Component } from 'react'

import IconButton from '@material-ui/core/IconButton'
import KeyBoardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyBoardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing()
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0
  },
  text: {
    color: theme.palette.secondary.main,
    marginTop: '1.3em'
  }
})

class Pagination extends Component {
  render() {
    const {
      classes,
      disabledBackward,
      disabledForward,
      length,
      mydetails_paginator,
      paginateBackward,
      paginateForward
    } = this.props

    let { index } = this.props

    return (
      <div className={classes.pagination}>
        <IconButton
          aria-label='Paginate backward'
          className={classes.button}
          color='secondary'
          disabled={disabledBackward}
          onClick={paginateBackward}
        >
          <KeyBoardArrowLeft />
        </IconButton>
        <Typography
          aria-label={++index + ' of ' + length}
          className={classes.text}
          ref={mydetails_paginator}
          tabIndex='0'
          type='headline'
        >
          {index + ' of ' + length}
        </Typography>
        <IconButton
          aria-label='Paginate forward'
          className={classes.button}
          color='secondary'
          disabled={disabledForward}
          onClick={paginateForward}
        >
          <KeyBoardArrowRight />
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(Pagination)
