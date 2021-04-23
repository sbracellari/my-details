import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Error from '@material-ui/icons/Error'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  card: {
    borderLeft: '10px solid #D32F2F',
    margin: 10
  },
  header: {
    borderBottom: '1px solid #d3d3d3',
    borderRadius: 0
  },
  icon: {
    color: '#D32F2F',
    fontSize: 50
  },
  iconButton: {
    alignSelf: 'center',
    paddingTop: 5
  },
  link: {
    marginLeft: 5
  },
  root: {
    color: 'black',
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: 20
  }
})

class ErrorPage extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={<Error className={classes.icon} />}
            className={classes.header}
            classes={{
              action: classes.iconButton,
              title: classes.title
            }}
            subheader={
              <div>
                If you believe this is an error, please contact
                <a
                  aria-label='Oakland University Technology Services. Opens an email application.'
                  className={classes.link}
                  href='mailto:uts@oakland.edu'
                  rel='noopener noreferrer'
                >
                  Oakland University Technology Services
                </a>
                .
              </div>
            }
           
            title='Could not display details at this time.'
          />
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ErrorPage)
