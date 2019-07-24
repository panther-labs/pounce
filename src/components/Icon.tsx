import React from 'react';
import { css } from 'styled-components';
import Box, { BoxProps } from 'components/Box';
import Add from 'icons/ic-add.svg';
import Adduser from 'icons/ic-adduser.svg';
import ArrowDropDown from 'icons/ic-arrow_drop_down.svg';
import ArrowDropUp from 'icons/ic-arrow_drop_up.svg';
import ArrowLeft from 'icons/ic-arrow_left.svg';
import ArrowRight from 'icons/ic-arrow_right.svg';
import Back from 'icons/ic-back.svg';
import Build from 'icons/ic-build.svg';
import CheckboxIntermediate from 'icons/ic-checkbox_intermediate.svg';
import CheckboxSelected from 'icons/ic-checkbox_selected.svg';
import CheckboxUnselected from 'icons/ic-checkbox_unselected.svg';
import ChevronDown from 'icons/ic-chevron_down.svg';
import ChevronLeft from 'icons/ic-chevron_left.svg';
import ChevronRight from 'icons/ic-chevron_right.svg';
import ChevronUp from 'icons/ic-chevron_up.svg';
import Close from 'icons/ic-close.svg';
import Delete from 'icons/ic-delete.svg';
import Download from 'icons/ic-download.svg';
import Edit from 'icons/ic-edit.svg';
import Filter from 'icons/ic-filter.svg';
import Forward from 'icons/ic-forward.svg';
import Insight from 'icons/ic-insight.svg';
import MenuBilling from 'icons/ic-menu-billing.svg';
import MenuDashboard from 'icons/ic-menu-dashboard.svg';
import MenuDocs from 'icons/ic-menu-docs.svg';
import MenuGeneral from 'icons/ic-menu-general.svg';
import MenuInput from 'icons/ic-menu-input.svg';
import MenuOutput from 'icons/ic-menu-output.svg';
import MenuPolicy from 'icons/ic-menu-policy.svg';
import MenuRules from 'icons/ic-menu-rules.svg';
import MenuSettings from 'icons/ic-menu-settings.svg';
import MoreHoriz from 'icons/ic-more_horiz.svg';
import NetworkCheck from 'icons/ic-network-check.svg';
import Notification from 'icons/ic-notification.svg';
import Pass from 'icons/ic-pass.svg';
import PlayAll from 'icons/ic-play-all.svg';
import Play from 'icons/ic-play.svg';
import Preference from 'icons/ic-preference.svg';
import Profile from 'icons/ic-profile.svg';
import RadioSelected from 'icons/ic-radio_selected.svg';
import RadioUnselected from 'icons/ic-radio_unselected.svg';
import Remove from 'icons/ic-remove.svg';
import Resource from 'icons/ic-resource.svg';
import Search from 'icons/ic-search.svg';
import Star from 'icons/ic-star.svg';
import SyncDisabled from 'icons/ic-sync-disabled.svg';
import Sync from 'icons/ic-sync.svg';
import Timer from 'icons/ic-timer.svg';
import Group from 'icons/ic-user.svg';
import Warning from 'icons/ic-warning.svg';
import WarningAlt from 'icons/ic-warning-1.svg';
import Upload from 'icons/ic_upload.svg';

export const svgComponentMapping = {
  add: Add,
  addUser: Adduser,
  'caret-down': ArrowDropDown,
  'caret-up': ArrowDropUp,
  'caret-left': ArrowLeft,
  'caret-right': ArrowRight,
  'arrow-back': Back,
  'arrow-forward': Forward,
  wrench: Build,
  checkbox: CheckboxUnselected,
  'checkbox-selected': CheckboxSelected,
  'checkbox-intermediate': CheckboxIntermediate,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  close: Close,
  delete: Delete,
  download: Download,
  edit: Edit,
  filter: Filter,
  insight: Insight,
  billing: MenuBilling,
  dashboard: MenuDashboard,
  docs: MenuDocs,
  company: MenuGeneral,
  input: MenuInput,
  output: MenuOutput,
  policy: MenuPolicy,
  rules: MenuRules,
  settings: MenuSettings,
  more: MoreHoriz,
  'network-performance': NetworkCheck,
  notification: Notification,
  check: Pass,
  play: Play,
  'play-all': PlayAll,
  preference: Preference,
  user: Profile,
  radio: RadioUnselected,
  'radio-selected': RadioSelected,
  remove: Remove,
  resource: Resource,
  search: Search,
  star: Star,
  sync: Sync,
  'sync-disabled': SyncDisabled,
  timer: Timer,
  group: Group,
  warning: Warning,
  'warning-alt': WarningAlt,
  upload: Upload,
};

export interface IconProps extends BoxProps {
  /** The icon that you want to show */
  type: keyof typeof svgComponentMapping;

  /** The color of the icon */
  color?: string;

  /** The size of the icon. Can be 18px or 24px */
  size?: 'small' | 'large';
}

const Icon: React.FC<IconProps> = ({ type, size, color, ...rest }) => {
  const Component = svgComponentMapping[type];
  const sizeInPx = size === 'small' ? 18 : 24;

  return (
    <Box
      css={css`
        fill: currentColor;
      `}
      color={color}
      as={Component}
      width={sizeInPx}
      height={sizeInPx}
      {...rest}
    />
  );
};

Icon.defaultProps = {
  size: 'small',
  color: 'inherit',
};

export default Icon;
