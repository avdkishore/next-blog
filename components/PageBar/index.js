import PropTypes from 'prop-types';

import { setPagebarRef } from '../../redux/actions/pagebar';
import classes from './pagebar.module.css';

export default class PageBar extends React.Component {
    static propTypes = {
      isEditMode: PropTypes.bool.isRequired,
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      isSaved: PropTypes.bool,

      // functions to be called for actions
      onSaveDraft: PropTypes.func,
      onDeleteDraft: PropTypes.func,
      onPublishDraft: PropTypes.func,
    }

    constructor(props) {
      super(props);
    }

    renderLeft = () => {
      const { title } = this.props;

      return (
        <div className={classes['left-container']}>
          <div className={classes['logo']}>
            <img src="https://picsum.photos/40" />
          </div>
          <div className={classes['left-info-container']}>
            <span className={classes['mode-title']}>
              {title}
            </span>
          </div>
        </div>
      );
    }    
    
    renderRight = () => {
      const { isEditMode } = this.props;
  
      if (!isEditMode) return null;

      return (
        <div className={classes['save-button-container']}>
          <span className={classes['status-text']}>
                    Saved
          </span>
          <button className={classes['save-button']}>
            <span className={classes['save-text']}>Save</span>
          </button>
        </div>
      );
    }

    render() {
      return (
        <div className={classes['pagebar-container']}>
          {this.renderLeft()}
          {this.renderRight()}
        </div>
      );
    }
}