import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { startRemoveRecipe } from './../actions/recipeActions';
import { closeDialog } from './../actions/dialogActions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialog extends React.Component {
  deleteRecipe = () => {
    const id = this.props.dialog.id;
    this.props.startRemoveRecipe(id);
    this.props.closeDialog();
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.dialog.isOpen}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Are you absolutely sure?'}
          </DialogTitle>
          <DialogContent />
          <DialogActions>
            <Button onClick={this.props.closeDialog} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.deleteRecipe} color="primary">
              DELETE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dialog: state.dialog
});

export default connect(
  mapStateToProps,
  { closeDialog, startRemoveRecipe }
)(AlertDialog);
