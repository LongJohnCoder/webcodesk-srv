/*
 *     Webcodesk
 *     Copyright (C) 2019  Oleksandr (Alex) Pustovalov
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ToolbarButton from '../commons/ToolbarButton';
import LoadingPopover from '../commons/LoadingPopover';
import {
  MarketBoardToolbarPanel,
  MarketBoardToolbar,
} from './Market.parts';
import MarketErrorPopover from './MarketErrorPopover';
import { CommonToolbarDivider } from '../commons/Commons.parts';
import MarkdownView from '../commons/MarkdownView';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  centralTopPane: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '39px',
    right: 0,
    minWidth: '1100px'
  },
  centralContentPane: {
    position: 'absolute',
    top: '40px',
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'auto',
  },
  centralContent: {
    position: 'relative',
    padding: '16px 15%',
    backgroundColor: '#ffffff'
  },
  titleLabel: {
    marginRight: '16px',
    marginLeft: '16px',
    whiteSpace: 'nowrap'
  }
});

class MarketProjectView extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    selectedProject: PropTypes.object,
    onClose: PropTypes.func,
    onBack: PropTypes.func,
    onSelectProjectItem: PropTypes.func,
    onInstall: PropTypes.func,
    onOpenUrl: PropTypes.func,
  };

  static defaultProps = {
    isLoading: false,
    error: '',
    selectedProject: {},
    onClose: () => {
      console.info('MarketProjectView.onClose is not set');
    },
    onBack: () => {
      console.info('MarketProjectView.onBack is not set');
    },
    onSelectProjectItem: () => {
      console.info('MarketProjectView.onSelectProjectItem is not set');
    },
    onInstall: () => {
      console.info('MarketProjectView.onInstall is not set');
    },
    onOpenUrl: () => {
      console.info('MarketProjectView.onOpenUrl is not set');
    },
  };

  handleClose = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.props.onClose();
  };

  handleBack = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.props.onBack();
  };

  handleInstall = e => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const { onInstall, selectedProject: { projectModel } } = this.props;
    onInstall(projectModel);
  };

  handleOpenSourceCode = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const { onOpenUrl, selectedProject: { projectSourceCodeURL } } = this.props;
    onOpenUrl(projectSourceCodeURL);
  };

  handleOpenLiveDemo = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const { onOpenUrl, selectedProject: { projectModel: { projectDemoUrl } } } = this.props;
    onOpenUrl(projectDemoUrl);
  };

  render () {
    const {classes, selectedProject, isLoading, error} = this.props;
    const {
      projectModel: {
        projectName,
        projectDemoURL
      },
      projectReadmeContent,
      projectSourceCodeURL,
    } = selectedProject;
    return (
        <div className={classes.root}>
          <div className={classes.centralTopPane}>
            <MarketBoardToolbarPanel>
              <MarketBoardToolbar disableGutters={true} dense="true">
                <ToolbarButton
                  iconType="ArrowBack"
                  onClick={this.handleBack}
                  title="Back to search"
                  tooltip="Back to the previous search results"
                />
                <CommonToolbarDivider/>
                <div className={classes.titleLabel}>
                  <Typography
                    variant="body1"
                  >
                    {projectName}
                  </Typography>
                </div>
                <CommonToolbarDivider/>
                  <ToolbarButton
                    iconType="CloudDownload"
                    onClick={this.handleInstall}
                    title="Select"
                  />
                  {projectSourceCodeURL && (
                    <ToolbarButton
                      iconType="OpenInNew"
                      onClick={this.handleOpenSourceCode}
                      title="Source Code"
                    />
                  )}
                  {projectDemoURL && (
                    <ToolbarButton
                      iconType="DesktopMac"
                      onClick={this.handleOpenLiveDemo}
                      title="Live Demo"
                    />
                  )}
              </MarketBoardToolbar>
            </MarketBoardToolbarPanel>
          </div>
          <div className={classes.centralContentPane}>
            <div className={classes.centralContent}>
              {isLoading && <LoadingPopover />}
              {error && <MarketErrorPopover error={error} />}
              <MarkdownView markdownContent={projectReadmeContent} />
            </div>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(MarketProjectView);
