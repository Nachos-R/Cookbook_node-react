import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';

import { startRemoveRecipe } from './../actions/recipeActions';
import { openDialog } from './../actions/dialogActions';

import logo from './../img/salo_samogon.jpg';

const styles = theme => ({
  card: {
    width: '49%',
    display: 'inline-block',
    marginBottom: '20px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
});

class Recipe extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  editRecipe = () => {
    this.props.history.push({
      pathname: '/edit',
      state: { recipe: this.props.recipe }
    });
  };

  toRecipePage = () => {
    this.props.history.push({
      pathname: '/versions',
      state: { recipe: this.props.recipe }
    });
  };

  openDialog = () => {
    const id = this.props.recipe._id;
    this.props.openDialog(id);
  };

  render() {
    const { classes } = this.props;
    const { name, text, date, versions } = this.props.recipe;

    return (
      <React.Fragment>
        <Card className={classnames(classes.card, 'recipe-item')}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {name.split('')[0].toUpperCase()}
              </Avatar>
            }
            action={
              versions && (
                <Tooltip title="Delete">
                  <IconButton aria-label="Delete" onClick={this.openDialog}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            title={name}
            subheader={moment(date).format('MMMM Do YYYY, h:mm:ss a')}
          />
          <CardMedia
            className={classes.media}
            image={logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">
              {text.length > 150 ? text.slice(0, 150) + '...' : text}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {versions && (
              <React.Fragment>
                <Button
                  mini
                  variant="fab"
                  color="secondary"
                  aria-label="Edit"
                  className={classes.button}
                  onClick={this.editRecipe}
                >
                  <Icon>edit_icon</Icon>
                </Button>
                <Badge
                  color="primary"
                  badgeContent={versions.length}
                  className={classes.margin}
                >
                  <Button variant="contained" onClick={this.toRecipePage}>
                    See all versions
                  </Button>
                </Badge>
              </React.Fragment>
            )}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
              disabled={text.length > 150 ? false : true}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {text.length > 150 ? text.slice(150) : null}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </React.Fragment>
    );
  }
}

Recipe.propTypes = {
  classes: PropTypes.object.isRequired,
  startRemoveRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  dialog: state.dialog
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { openDialog, startRemoveRecipe }
  )
)(withRouter(Recipe));
