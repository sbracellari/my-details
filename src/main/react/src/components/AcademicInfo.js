import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles, Typography } from '@material-ui/core'

import Pagination from './Pagination'

const styles = theme => ({
  body: {
    display: 'flex',
    padding: '0px !important'
  },
  bodyMobile: {
    padding: '0px !important'
  },
  card: {
    borderRadius: 0,
    boxShadow: 'none',
    margin: '0px 10px',
    marginBottom: 0
  },
  college: {
    paddingBottom: 10,
    paddingTop: 15
  },
  large: {
    backgroundColor: '#fafafa',
    display: 'flex',
    padding: '5px 10px',
    width: '66.67%'
  },
  largeMobile: {
    backgroundColor: '#fafafa',
    display: 'flex',
    padding: 10,
    width: '100%'
  },
  level: {
    paddingBottom: 10
  },
  listItem: {
    padding: '0px 0px 0px 5px',
  },
  listItemText: {
    margin: 0,
    textAlign: 'center'
  },
  secondaryHeading: {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: theme.typography.pxToRem(13),
    paddingTop: 3
  },
  small: {
    backgroundColor: '#fafafa',
    borderRight: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 10px 0px 10px',
    textAlign: 'center',
    width: '33.33%'
  },
  smallMobile: {
    backgroundColor: '#fafafa',
    borderBottom: '1px solid lightgray',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 10px 0px 10px',
    textAlign: 'center',
    width: '100%'
  }
})

 
const AcademicSection = (props) => {
  const {primary, secondary, classes} = props
  return (
  <ListItem className={classes.listItem} key={primary}>
    <ListItemText
      className={classes.listItemText}
      classes={{
        secondary: classes.secondaryHeading
      }}
      primary={primary}
      secondary={secondary}
    />
  </ListItem>
 ) 
}

class AcademicInfo extends Component {
  state = {
    disabledBackward: true,
    disabledForward: false,
    index: 0
  }

  mydetails_paginator = React.createRef()

  paginateForward = () => {
    const { index } = this.state
    const { curriculums } = this.props

    const disabledForward = index + 2 >= curriculums.length
    const disabledBackward = false

    const newIndex = index + 1 >= curriculums.length ? index : index + 1

    this.setState({ index: newIndex, disabledForward, disabledBackward })

    this.mydetails_paginator.current.focus()
  }

  paginateBackward = () => {
    const { index } = this.state

    const disabledForward = false
    const disabledBackward = index === 1

    const newIndex = index === 0 ? index : index - 1

    this.setState({ index: newIndex, disabledBackward, disabledForward })

    this.mydetails_paginator.current.focus()
  }

  render() {
    const { classes, curriculums, width } = this.props
    const { disabledBackward, disabledForward, index } = this.state

    const mobile = width < 720 ? true : false

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={mobile ? classes.bodyMobile : classes.body}>
            <div className={mobile ? classes.smallMobile : classes.small}>
              <Typography>{curriculums[index].degree}</Typography>
              <Typography className={classes.college}>
                {curriculums[index].college}
              </Typography>
              <Typography className={classes.level}>
                {`${curriculums[index].level} - 
                ${curriculums[index].degreeStatus === null ? curriculums[index].standing : curriculums[index].degreeStatus}`}
              </Typography>

              {curriculums.length > 1 && (
                <Pagination
                  curriculums={curriculums}
                  disabledBackward={disabledBackward}
                  disabledForward={disabledForward}
                  index={index}
                  length={curriculums.length}
                  mydetails_paginator={this.mydetails_paginator}
                  paginateBackward={this.paginateBackward}
                  paginateForward={this.paginateForward}
                />
              )}
            </div>
            <div className={mobile ? classes.largeMobile : classes.large}>
              <Grid
                container
                alignContent='center'
                alignItems='center'
                justify='space-evenly'
              >
                {curriculums[index].majors.length !== 0 && (
                  <Grid item xs={4}>
                    {curriculums[index].majors.map((major, i) => {
                      let subtitle = (i === curriculums[index].majors.length - 1) ? ((i === 0) ? 
                      'MAJOR' : 'MAJORS') : ''
                      return (
                        <AcademicSection primary={major} secondary={subtitle} key={major} classes={classes}/>
                      )
                    })}
                  </Grid>
                )}
                {curriculums[index].minors.length !== 0 && 
                curriculums[index].minors !== undefined ? 
                (
                  <Grid item xs={4}>
                    {curriculums[index].minors.map((minor, i) => {
                      let subtitle = (i === curriculums[index].minors.length - 1) ? ((i === 0) ? 
                      'MINOR' : 'MINORS') : ''
                      return (
                        <AcademicSection primary={minor} secondary={subtitle} key={minor} classes={classes}/> 
                      )
                    })}
                  </Grid>
                ) : (
                  <Grid item xs={4}>
                    <AcademicSection primary="N/A" secondary="MINOR" classes={classes}/>
                  </Grid>
                )}
                {curriculums[index].concentrations.length !== 0 && 
                curriculums[index].concentrations !== undefined && 
                (
                  <Grid item xs={4}>
                    {curriculums[index].concentrations.map(
                      (concentration, i) => {
                        let subtitle = (i === curriculums[index].concentrations.length - 1) ? ((i === 0) ? 
                        'CONCENTRATION' : 'CONCENTRATIONS') : ''
                        return (
                          <AcademicSection primary={concentration} secondary={subtitle} key={concentration} classes={classes}/>
                        )
                      }
                    )}
                  </Grid>
                )}
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(AcademicInfo)
