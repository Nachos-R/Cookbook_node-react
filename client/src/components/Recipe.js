import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
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

  deleteRecipe = () => {
    const id = this.props.recipe._id;
    this.props.startRemoveRecipe(id);
  };

  toRecipePage = () => {
    this.props.history.push({
      pathname: '/versions',
      state: { recipe: this.props.recipe }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Card className={classnames(classes.card, 'recipe-item')}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {this.props.recipe.name.split('')[0].toUpperCase()}
              </Avatar>
            }
            action={
              this.props.recipe.versions && (
                <Tooltip title="Delete">
                  <IconButton aria-label="Delete" onClick={this.deleteRecipe}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )
            }
            title={this.props.recipe.name}
            subheader={this.props.recipe.date}
          />
          <CardMedia
            className={classes.media}
            image={logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography component="p">{this.props.recipe.text}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {this.props.recipe.versions && (
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
                  badgeContent={this.props.recipe.versions.length}
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
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
                and set aside for 10 minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep
                skillet over medium-high heat. Add chicken, shrimp and chorizo,
                and cook, stirring occasionally until lightly browned, 6 to 8
                minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves,
                garlic, tomatoes, onion, salt and pepper, and cook, stirring
                often until thickened and fragrant, about 10 minutes. Add
                saffron broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes
                and peppers, and cook without stirring, until most of the liquid
                is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
                reserved shrimp and mussels, tucking them down into the rice,
                and cook again without stirring, until mussels have opened and
                rice is just tender, 5 to 7 minutes more. (Discard any mussels
                that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then
                serve.
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

export default compose(
  withStyles(styles),
  connect(
    null,
    { startRemoveRecipe }
  )
)(withRouter(Recipe));
