import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1
  }
};

class Header extends Component {
  toAddPage = () => {
    this.props.history.push('/add');
  };

  toHome = () => {
    this.props.history.push('/');
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar className="header-toolbar">
            <Typography variant="title" color="inherit" onClick={this.toHome}>
              CookBook
            </Typography>
            <Button
              onClick={this.toAddPage}
              variant="contained"
              color="primary"
            >
              Add new recipe
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Header));
