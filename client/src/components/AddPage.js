import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { startAddRecipe } from './../actions/recipeActions';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  button: {
    width: '100%',
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class AddPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState(() => ({ errors: nextProps.errors }));
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, text } = this.state;

    this.props.startAddRecipe({ name, text }, this.props.history);
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div className="container">
        <form
          className={`${classes.container} addpage-form`}
          noValidate
          autoComplete="off"
          onSubmit={this.onSubmit}
        >
          <TextField
            id="full-width"
            label="recipe name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors.name ? errors.name : null}
            fullWidth
            margin="normal"
          />
          <TextField
            id="full-width"
            label="recipe"
            value={this.state.text}
            onChange={this.handleChange('text')}
            InputLabelProps={{
              shrink: true
            }}
            helperText={errors.text ? errors.text : null}
            fullWidth
            multiline={true}
            rows="10"
            margin="normal"
          />
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              className={classes.button}
            >
              Upload
            </Button>
          </label>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Add recipe
          </Button>
        </form>
      </div>
    );
  }
}

AddPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  recipes: state.recipes
});

export default compose(
  withStyles(styles, { name: AddPage }),
  connect(
    mapStateToProps,
    { startAddRecipe }
  )
)(AddPage);
